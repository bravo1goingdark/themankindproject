import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { stringify } from "yaml"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Achievement {
  id: string
  title: string
  summary: string
  description: string
  year: number
  era: string
  category: string
  region: string
  location: string
  keyFigures: string[]
  impact: string
  impactScore: number
  difficultyScore: number
  tags: string[]
  context: string
  theDeed: string
  whyItMatters: string
  brutalTruth: string
  numbers: string[]
}

function convertToMarkdown(achievement: Achievement): string {
  const frontmatterObj = {
    title: achievement.title,
    date: `${achievement.year}-01-01`,
    year: achievement.year,
    era: achievement.era,
    category: achievement.category,
    region: achievement.region,
    location: achievement.location,
    key_figures: achievement.keyFigures,
    impact: achievement.impact,
    impact_score: achievement.impactScore,
    difficulty_score: achievement.difficultyScore,
    tags: achievement.tags,
  }

  const frontmatter = stringify(frontmatterObj)

  const content = `> ${achievement.summary}

${achievement.description}

## Context

${achievement.context}

## The Deed

${achievement.theDeed}

## Why It Matters

${achievement.whyItMatters}

## Brutal Truth

${achievement.brutalTruth}

## Numbers

${achievement.numbers.map((n) => `- ${n}`).join("\n")}
`

  return `---\n${frontmatter}---\n\n${content}`
}

async function main() {
  const contentDir = path.join(__dirname, "..", "content")
  
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
  }

  const { achievements } = await import("../lib/data.js")
  
  console.log(`Converting ${achievements.length} entries to markdown...`)

  for (const achievement of achievements) {
    const markdown = convertToMarkdown(achievement)
    const filePath = path.join(contentDir, `${achievement.id}.md`)
    fs.writeFileSync(filePath, markdown, "utf8")
    console.log(`  Created: ${achievement.id}.md`)
  }

  console.log(`\nConversion complete! ${achievements.length} markdown files created in /content`)
}

main().catch((error) => {
  console.error("Conversion failed:", error)
  process.exit(1)
})
