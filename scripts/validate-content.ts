import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface ContentValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  file: string
}

interface ContentStats {
  totalFiles: number
  totalSize: number
  avgFileSize: number
  largestFile: { file: string; size: number }
  smallestFile: { file: string; size: number }
  byCategory: Record<string, number>
  byEra: Record<string, number>
  missingRequiredFields: string[]
  duplicateSlugs: string[]
}

const REQUIRED_FRONTMATTER = [
  "title",
  "year",
  "era",
  "category",
  "region",
  "location",
  "key_figures",
  "impact_score",
  "difficulty_score",
  "tags",
]

const REQUIRED_SECTIONS = [
  "Context",
  "The Deed",
  "Why It Matters",
  "Brutal Truth",
  "Numbers",
]

function validateFile(filePath: string): ContentValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const file = path.basename(filePath)

  const content = fs.readFileSync(filePath, "utf8")

  try {
    const { data, content: body } = matter(content)

    for (const field of REQUIRED_FRONTMATTER) {
      if (!(field in data)) {
        errors.push(`Missing required frontmatter field: ${field}`)
      }
    }

    if (data.impact_score !== undefined) {
      if (typeof data.impact_score !== "number") {
        errors.push("impact_score must be a number")
      } else if (data.impact_score < 0 || data.impact_score > 100) {
        warnings.push("impact_score should be between 0 and 100")
      }
    }

    if (data.difficulty_score !== undefined) {
      if (typeof data.difficulty_score !== "number") {
        errors.push("difficulty_score must be a number")
      } else if (data.difficulty_score < 0 || data.difficulty_score > 100) {
        warnings.push("difficulty_score should be between 0 and 100")
      }
    }

    if (data.year !== undefined && typeof data.year !== "number") {
      errors.push("year must be a number")
    }

    if (data.tags !== undefined && !Array.isArray(data.tags)) {
      errors.push("tags must be an array")
    }

    if (data.key_figures !== undefined && !Array.isArray(data.key_figures)) {
      errors.push("key_figures must be an array")
    }

    const summaryMatch = body.match(/^>\s*(.+)/m)
    if (!summaryMatch) {
      warnings.push("Missing summary (should start with > )")
    }

    for (const section of REQUIRED_SECTIONS) {
      const regex = new RegExp(`## ${section}`, "i")
      if (!regex.test(body)) {
        errors.push(`Missing required section: ${section}`)
      }
    }

    const brokenLinks = body.match(/\[([^\]]+)\]\(\s*\)/g)
    if (brokenLinks) {
      warnings.push(`Broken markdown links found: ${brokenLinks.length}`)
    }
  } catch (err) {
    errors.push(`Failed to parse file: ${err instanceof Error ? err.message : "Unknown error"}`)
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    file,
  }
}

function analyzeContentDirectory(contentDir: string): ContentStats {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))
  
  let totalSize = 0
  let largestFile = { file: "", size: 0 }
  let smallestFile = { file: "", size: Infinity }
  const byCategory: Record<string, number> = {}
  const byEra: Record<string, number> = {}
  const missingRequiredFields: string[] = []
  const slugSet = new Set<string>()
  const duplicateSlugs: string[] = []

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const stats = fs.statSync(filePath)
    const slug = file.replace(/\.md$/, "")

    totalSize += stats.size

    if (stats.size > largestFile.size) {
      largestFile = { file, size: stats.size }
    }
    if (stats.size < smallestFile.size) {
      smallestFile = { file, size: stats.size }
    }

    if (slugSet.has(slug)) {
      duplicateSlugs.push(slug)
    }
    slugSet.add(slug)

    try {
      const content = fs.readFileSync(filePath, "utf8")
      const { data } = matter(content)

      if (data.category) {
        byCategory[data.category] = (byCategory[data.category] || 0) + 1
      }
      if (data.era) {
        byEra[data.era] = (byEra[data.era] || 0) + 1
      }

      for (const field of REQUIRED_FRONTMATTER) {
        if (!(field in data)) {
          missingRequiredFields.push(`${file}: ${field}`)
        }
      }
    } catch {
      missingRequiredFields.push(`${file}: parse error`)
    }
  }

  return {
    totalFiles: files.length,
    totalSize,
    avgFileSize: files.length > 0 ? Math.round(totalSize / files.length) : 0,
    largestFile,
    smallestFile: smallestFile.size === Infinity ? { file: "", size: 0 } : smallestFile,
    byCategory,
    byEra,
    missingRequiredFields,
    duplicateSlugs,
  }
}

async function main() {
  const contentDir = path.join(process.cwd(), "content")
  
  if (!fs.existsSync(contentDir)) {
    console.error("Content directory not found")
    process.exit(1)
  }

  console.log("=== Content Analysis ===\n")

  const stats = analyzeContentDirectory(contentDir)
  
  console.log(`Total files: ${stats.totalFiles}`)
  console.log(`Total size: ${(stats.totalSize / 1024).toFixed(2)} KB`)
  console.log(`Average file size: ${stats.avgFileSize} bytes`)
  console.log(`Largest file: ${stats.largestFile.file} (${stats.largestFile.size} bytes)`)
  console.log(`Smallest file: ${stats.smallestFile.file} (${stats.smallestFile.size} bytes)`)
  
  console.log("\nBy Category:")
  Object.entries(stats.byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`))

  console.log("\nBy Era:")
  Object.entries(stats.byEra)
    .sort((a, b) => b[1] - a[1])
    .forEach(([era, count]) => console.log(`  ${era}: ${count}`))

  console.log("\n=== Validation ===\n")

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))
  let validCount = 0
  let errorCount = 0
  let warningCount = 0

  for (const file of files) {
    const result = validateFile(path.join(contentDir, file))
    
    if (result.valid) {
      validCount++
    } else {
      errorCount++
      console.log(`❌ ${result.file}`)
      result.errors.forEach((e) => console.log(`   ERROR: ${e}`))
    }
    
    if (result.warnings.length > 0) {
      warningCount++
      if (result.valid) {
        console.log(`⚠️  ${result.file}`)
      }
      result.warnings.forEach((w) => console.log(`   WARN: ${w}`))
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Valid: ${validCount}/${files.length}`)
  console.log(`Files with errors: ${errorCount}`)
  console.log(`Files with warnings: ${warningCount}`)

  if (stats.duplicateSlugs.length > 0) {
    console.log(`\n⚠️  Duplicate slugs found: ${stats.duplicateSlugs.join(", ")}`)
  }

  if (errorCount > 0) {
    process.exit(1)
  }
}

main()
