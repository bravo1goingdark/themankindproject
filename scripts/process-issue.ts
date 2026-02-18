import { contributionToMarkdown } from "./contribution-to-markdown"
import type { ContributionSubmission } from "../lib/contribution-schema"
import * as fs from "fs"
import * as path from "path"

const issueNumber = process.argv[2]
const issueBody = process.argv[3]

function parseIssueBody(body: string): Partial<ContributionSubmission> | null {
  // Try to extract JSON from code block (format used by contribute form)
  const jsonMatch = body.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonMatch) {
    try {
      const json = JSON.parse(jsonMatch[1])
      return json
    } catch {
      // Fall through
    }
  }
  
  // Try raw JSON
  try {
    const json = JSON.parse(body)
    return json
  } catch {
    return null
  }
}

function generateMarkdown(submission: ContributionSubmission): string {
  const { slug, markdown } = contributionToMarkdown(submission)
  return markdown
}

async function main() {
  const parsed = parseIssueBody(issueBody)
  
  if (!parsed) {
    console.error("Could not parse issue body")
    process.exit(1)
  }

  const markdown = generateMarkdown(parsed as ContributionSubmission)
  console.log(markdown)
}

main()
