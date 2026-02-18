import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface SearchIndexEntry {
  slug: string
  title: string
  summary: string
  category: string
  era: string
  year: number
  region: string
  tags: string[]
  keyFigures: string[]
  impactScore: number
  difficultyScore: number
  searchableText: string
}

interface SearchIndex {
  entries: SearchIndexEntry[]
  categories: string[]
  eras: string[]
  regions: string[]
  tags: string[]
  generated: string
}

function extractSummary(content: string): string {
  const summaryMatch = content.match(/^>\s*(.+?)(?:\n|$)/)
  return summaryMatch ? summaryMatch[1] : ""
}

function extractSearchableText(content: string, frontmatter: Record<string, unknown>): string {
  const sections = ["Context", "The Deed", "Why It Matters", "Brutal Truth", "Numbers"]
  const sectionTexts = sections.map((section) => {
    const regex = new RegExp(`## ${section}\\n([\\s\\S]*?)(?=\\n## |$)`, "i")
    const match = content.match(regex)
    return match ? match[1].trim() : ""
  })

  const allText = [
    frontmatter.title,
    extractSummary(content),
    ...sectionTexts,
    ...(frontmatter.tags as string[]),
    ...(frontmatter.key_figures as string[]),
    frontmatter.location,
    frontmatter.region,
  ].join(" ")

  return allText.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim()
}

async function buildSearchIndex(): Promise<SearchIndex> {
  const contentDir = path.join(__dirname, "..", "content")
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))

  const entries: SearchIndexEntry[] = []
  const categoriesSet = new Set<string>()
  const erasSet = new Set<string>()
  const regionsSet = new Set<string>()
  const tagsSet = new Set<string>()

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    const fm = data as Record<string, unknown>
    const slug = file.replace(/\.md$/, "")

    const entry: SearchIndexEntry = {
      slug,
      title: fm.title as string,
      summary: extractSummary(content),
      category: fm.category as string,
      era: fm.era as string,
      year: fm.year as number,
      region: fm.region as string,
      tags: fm.tags as string[],
      keyFigures: fm.key_figures as string[],
      impactScore: fm.impact_score as number,
      difficultyScore: fm.difficulty_score as number,
      searchableText: extractSearchableText(content, fm),
    }

    entries.push(entry)
    categoriesSet.add(fm.category as string)
    erasSet.add(fm.era as string)
    regionsSet.add(fm.region as string)
    ;(fm.tags as string[]).forEach((t) => tagsSet.add(t))
  }

  entries.sort((a, b) => b.year - a.year)

  return {
    entries,
    categories: Array.from(categoriesSet).sort(),
    eras: Array.from(erasSet).sort(),
    regions: Array.from(regionsSet).sort(),
    tags: Array.from(tagsSet).sort(),
    generated: new Date().toISOString(),
  }
}

async function main() {
  console.log("Building search index...")

  const index = await buildSearchIndex()

  const publicDir = path.join(__dirname, "..", "public")
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const indexPath = path.join(publicDir, "search-index.json")
  fs.writeFileSync(indexPath, JSON.stringify(index), "utf8")

  const gzippedSize = (JSON.stringify(index).length / 1024).toFixed(2)
  console.log(`Search index generated: ${index.entries.length} entries`)
  console.log(`Index size: ${gzippedSize} KB`)
  console.log(`Categories: ${index.categories.length}`)
  console.log(`Eras: ${index.eras.length}`)
  console.log(`Regions: ${index.regions.length}`)
  console.log(`Tags: ${index.tags.length}`)
}

main().catch((error) => {
  console.error("Failed to build search index:", error)
  process.exit(1)
})
