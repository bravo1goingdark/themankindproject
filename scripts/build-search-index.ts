import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"
import pako from "pako"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface NormalizedEntry {
  id: string
  t: number
  d: number
  c: number
  e: number
  y: number
  r: number
  tg: number[]
  kf: number[]
  is: number
  ds: number
}

interface CompressedIndex {
  v: number
  e: NormalizedEntry[]
  dict: string[]
  contents: string
}

class StringDictionary {
  private strings: string[] = []
  private index: Map<string, number> = new Map()

  getOrCreate(s: string): number {
    if (this.index.has(s)) return this.index.get(s)!
    const idx = this.strings.length
    this.strings.push(s)
    this.index.set(s, idx)
    return idx
  }

  getStrings(): string[] {
    return this.strings
  }
}

function extractSummary(content: string): string {
  const summaryMatch = content.match(/^>\s*(.+?)(?:\n|$)/m)
  return summaryMatch ? summaryMatch[1].trim() : ""
}

function extractSearchableContent(content: string, fm: Record<string, unknown>): string {
  const sections = ["Context", "The Deed", "Why It Matters", "Brutal Truth", "Numbers"]
  const sectionTexts = sections.map((section) => {
    const regex = new RegExp(`## ${section}\\n([\\s\\S]*?)(?=\\n## |$)`, "i")
    const match = content.match(regex)
    return match ? match[1].trim() : ""
  })

  return [
    fm.title,
    extractSummary(content),
    ...sectionTexts,
    ...(fm.tags as string[] || []),
    ...(fm.key_figures as string[] || []),
    fm.location,
    fm.region,
  ].filter(Boolean).join(" ")
}

async function buildSearchIndex(): Promise<{ index: CompressedIndex; rawSize: number; compressedSize: number }> {
  const contentDir = path.join(__dirname, "..", "content")
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))

  const dict = new StringDictionary()
  const entries: NormalizedEntry[] = []
  const contentsMap: Record<string, string> = {}

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    const fm = data as Record<string, unknown>
    const slug = file.replace(/\.md$/, "")
    const searchableContent = extractSearchableContent(content, fm)

    contentsMap[slug] = searchableContent.toLowerCase()

    const entry: NormalizedEntry = {
      id: slug,
      t: dict.getOrCreate(fm.title as string),
      d: dict.getOrCreate(extractSummary(content)),
      c: dict.getOrCreate(fm.category as string),
      e: dict.getOrCreate(fm.era as string),
      y: fm.year as number,
      r: dict.getOrCreate(fm.region as string),
      tg: (fm.tags as string[] || []).map(t => dict.getOrCreate(t)),
      kf: (fm.key_figures as string[] || []).map(k => dict.getOrCreate(k)),
      is: fm.impact_score as number,
      ds: fm.difficulty_score as number,
    }

    entries.push(entry)
  }

  entries.sort((a, b) => {
    const yearA = a.y
    const yearB = b.y
    return yearB - yearA
  })

  const fullDict = dict.getStrings()
  const contentsStr = JSON.stringify(contentsMap)
  
  const index: CompressedIndex = {
    v: 2,
    e: entries,
    dict: fullDict,
    contents: contentsStr,
  }

  const rawJson = JSON.stringify(index)
  const compressed = pako.deflate(rawJson)
  const base64 = Buffer.from(compressed).toString("base64")

  return {
    index: { v: 2, e: entries, dict: fullDict, contents: base64 },
    rawSize: rawJson.length,
    compressedSize: base64.length,
  }
}

async function main() {
  console.log("Building compressed & normalized search index...")

  const { index, rawSize, compressedSize } = await buildSearchIndex()

  const publicDir = path.join(__dirname, "..", "public")
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const indexPath = path.join(publicDir, "search-index.json")
  const jsonStr = JSON.stringify(index)
  fs.writeFileSync(indexPath, jsonStr, "utf8")

  const rawKB = (rawSize / 1024).toFixed(2)
  const compressedKB = (compressedSize / 1024).toFixed(2)
  const saved = ((1 - compressedSize / rawSize) * 100).toFixed(1)

  console.log(`\n✓ Index built: ${index.e.length} entries`)
  console.log(`✓ Dictionary: ${index.dict.length} unique strings`)
  console.log(`✓ Raw size: ${rawKB} KB`)
  console.log(`✓ Compressed size: ${compressedKB} KB (saved ${saved}%)`)
}

main().catch((error) => {
  console.error("Failed to build search index:", error)
  process.exit(1)
})
