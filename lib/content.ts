import "server-only"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Category, Entry, EntryFrontmatter, EntryMetadata } from "./content-types"
import { CATEGORIES, ERAS } from "./content-types"

const contentDirectory = path.join(process.cwd(), "content")

export type { Category, Entry, EntryFrontmatter, EntryMetadata }
export { CATEGORIES, ERAS }

let cachedMetadata: Map<string, EntryMetadata> | null = null
let cachedSlugs: string[] | null = null

function clearCache(): void {
  cachedMetadata = null
  cachedSlugs = null
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

function validateFrontmatter(data: unknown): EntryFrontmatter {
  const fm = data as Record<string, unknown>
  
  if (!fm.title || typeof fm.title !== "string") {
    throw new Error("Missing or invalid title in frontmatter")
  }
  if (typeof fm.year !== "number") {
    throw new Error("Missing or invalid year in frontmatter")
  }
  if (!fm.era || typeof fm.era !== "string") {
    throw new Error("Missing or invalid era in frontmatter")
  }
  if (!fm.category || typeof fm.category !== "string") {
    throw new Error("Missing or invalid category in frontmatter")
  }
  if (!fm.region || typeof fm.region !== "string") {
    throw new Error("Missing or invalid region in frontmatter")
  }
  if (!fm.location || typeof fm.location !== "string") {
    throw new Error("Missing or invalid location in frontmatter")
  }
  if (!Array.isArray(fm.key_figures)) {
    throw new Error("Missing or invalid key_figures in frontmatter")
  }
  if (typeof fm.impact_score !== "number") {
    throw new Error("Missing or invalid impact_score in frontmatter")
  }
  if (typeof fm.difficulty_score !== "number") {
    throw new Error("Missing or invalid difficulty_score in frontmatter")
  }
  if (!Array.isArray(fm.tags)) {
    throw new Error("Missing or invalid tags in frontmatter")
  }

  return {
    title: fm.title,
    date: fm.date as string,
    year: fm.year,
    era: fm.era,
    category: fm.category as Category,
    region: fm.region,
    location: fm.location,
    key_figures: fm.key_figures as string[],
    impact: fm.impact as string,
    impact_score: fm.impact_score,
    difficulty_score: fm.difficulty_score,
    tags: fm.tags as string[],
    image: fm.image as string | undefined,
  }
}

function extractSection(content: string, sectionName: string): string {
  const regex = new RegExp(`## ${sectionName}\\n([\\s\\S]*?)(?=\\n## |$)`, "i")
  const match = content.match(regex)
  return match ? match[1].trim() : ""
}

export function getEntrySlugs(): string[] {
  if (cachedSlugs) {
    return cachedSlugs
  }

  if (!fs.existsSync(contentDirectory)) {
    cachedSlugs = []
    return cachedSlugs
  }

  cachedSlugs = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))

  return cachedSlugs
}

export function getEntryMetadata(slug: string): EntryMetadata | null {
  if (cachedMetadata?.has(slug)) {
    return cachedMetadata.get(slug)!
  }

  const filePath = path.join(contentDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = validateFrontmatter(data)
  
  const summaryMatch = content.match(/^>\s*(.+?)(?:\n|$)/)
  const summary = summaryMatch ? summaryMatch[1] : ""

  const metadata: EntryMetadata = {
    slug,
    ...frontmatter,
    summary,
  }

  if (!cachedMetadata) {
    cachedMetadata = new Map()
  }
  cachedMetadata.set(slug, metadata)

  return metadata
}

export function getAllEntriesMetadata(): EntryMetadata[] {
  const slugs = getEntrySlugs()
  const entries = slugs
    .map((slug) => getEntryMetadata(slug))
    .filter((entry): entry is EntryMetadata => entry !== null)
    .sort((a, b) => b.year - a.year)
  
  return entries
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  const filePath = path.join(contentDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = validateFrontmatter(data)

  const summaryMatch = content.match(/^>\s*(.+?)(?:\n|$)/)
  const summary = summaryMatch ? summaryMatch[1] : ""

  const contextMd = extractSection(content, "Context")
  const theDeedMd = extractSection(content, "The Deed")
  const whyItMattersMd = extractSection(content, "Why It Matters")
  const brutalTruthMd = extractSection(content, "Brutal Truth")
  const numbersMd = extractSection(content, "Numbers")

  const [contextHtml, theDeedHtml, whyItMattersHtml, brutalTruthHtml, numbersHtml] = 
    await Promise.all([
      markdownToHtml(contextMd),
      markdownToHtml(theDeedMd),
      markdownToHtml(whyItMattersMd),
      markdownToHtml(brutalTruthMd),
      markdownToHtml(numbersMd),
    ])

  return {
    slug,
    ...frontmatter,
    summary,
    contextHtml,
    theDeedHtml,
    whyItMattersHtml,
    brutalTruthHtml,
    numbersHtml,
  }
}

export async function getAllEntries(): Promise<Entry[]> {
  const slugs = getEntrySlugs()
  const entries = await Promise.all(
    slugs.map((slug) => getEntryBySlug(slug))
  )
  return entries
    .filter((entry): entry is Entry => entry !== null)
    .sort((a, b) => b.year - a.year)
}

export function getEntriesByCategory(category: Category): EntryMetadata[] {
  const allEntries = getAllEntriesMetadata()
  return allEntries.filter((entry) => entry.category === category)
}

export function getEntriesByEra(era: string): EntryMetadata[] {
  const allEntries = getAllEntriesMetadata()
  return allEntries.filter((entry) => entry.era === era)
}

export function getEntriesByRegion(region: string): EntryMetadata[] {
  const allEntries = getAllEntriesMetadata()
  return allEntries.filter((entry) => entry.region === region)
}

export function getEntriesByTag(tag: string): EntryMetadata[] {
  const allEntries = getAllEntriesMetadata()
  return allEntries.filter((entry) => 
    entry.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getEntriesByYearRange(startYear: number, endYear: number): EntryMetadata[] {
  const allEntries = getAllEntriesMetadata()
  return allEntries.filter((entry) => 
    entry.year >= startYear && entry.year <= endYear
  )
}

export function getRelatedEntries(current: EntryMetadata, count = 3): EntryMetadata[] {
  const allEntries = getAllEntriesMetadata()
  
  const scored = allEntries
    .filter((entry) => entry.slug !== current.slug)
    .map((entry) => {
      let score = 0
      
      if (entry.category === current.category) score += 3
      
      const sharedTags = entry.tags.filter((tag) => 
        current.tags.includes(tag)
      ).length
      score += sharedTags * 2
      
      if (entry.era === current.era) score += 1
      
      if (entry.region === current.region) score += 1
      
      return { entry, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.entry)

  return scored
}

export function searchEntries(query: string): EntryMetadata[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return []

  const allEntries = getAllEntriesMetadata()
  
  return allEntries.filter((entry) => {
    const searchableText = [
      entry.title,
      entry.summary,
      entry.location,
      entry.region,
      ...entry.tags,
      ...entry.key_figures,
    ].join(" ").toLowerCase()

    return searchableText.includes(normalizedQuery)
  })
}

export function getStatistics() {
  const allEntries = getAllEntriesMetadata()
  
  const categoryCount: Record<string, number> = {}
  const eraCount: Record<string, number> = {}
  const regionCount: Record<string, number> = {}
  const tagCount: Record<string, number> = {}

  for (const entry of allEntries) {
    categoryCount[entry.category] = (categoryCount[entry.category] || 0) + 1
    eraCount[entry.era] = (eraCount[entry.era] || 0) + 1
    regionCount[entry.region] = (regionCount[entry.region] || 0) + 1
    
    for (const tag of entry.tags) {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    }
  }

  return {
    total: allEntries.length,
    byCategory: categoryCount,
    byEra: eraCount,
    byRegion: regionCount,
    byTag: tagCount,
    avgImpactScore: allEntries.reduce((sum, e) => sum + e.impact_score, 0) / allEntries.length,
    avgDifficultyScore: allEntries.reduce((sum, e) => sum + e.difficulty_score, 0) / allEntries.length,
  }
}

export { clearCache }
