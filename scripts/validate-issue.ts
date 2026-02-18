import { validateSubmission, type ContributionSubmission } from "../lib/contribution-schema"

const issueNumber = process.argv[2]
const issueBody = process.argv[3]

function parseIssueBody(body: string): Partial<ContributionSubmission> {
  const lines = body.split("\n")
  const data: Record<string, string | string[]> = {}
  let currentKey = ""
  let currentValue = ""
  let inMultiline = false

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentKey && currentValue) {
        data[currentKey] = currentValue.trim()
      }
      currentKey = line.replace("### ", "").toLowerCase().replace(/ /g, "_")
      currentValue = ""
      inMultiline = false
    } else if (line.trim() === "") {
      if (currentValue && !inMultiline) {
        data[currentKey] = currentValue.trim()
      }
    } else {
      currentValue += (currentValue ? "\n" : "") + line
      inMultiline = true
    }
  }

  if (currentKey && currentValue) {
    data[currentKey] = currentValue.trim()
  }

  return {
    title: data.title as string,
    category: data.category as ContributionSubmission["category"],
    era: data.era as string,
    year: parseInt(data.year as string, 10),
    date: data.date as string,
    region: data.region as string,
    location: data.location as string,
    key_figures: (data.key_figures as string)?.split(",").map((s) => s.trim()) || [],
    summary: data.summary as string,
    context: data.context as string,
    the_deed: data.the_deed as string,
    why_it_matters: data.why_it_matters as string,
    brutal_truth: data.brutal_truth as string,
    numbers: (data.numbers as string)?.split("\n").filter(Boolean) || [],
    impact: data.impact as string,
    impact_score: parseInt(data.impact_score as string, 10) || 50,
    difficulty_score: parseInt(data.difficulty_score as string, 10) || 50,
    tags: (data.tags as string)?.split(",").map((s) => s.trim()) || [],
    image: data.image as string,
    sources: (data.sources as string)?.split("\n").filter(Boolean) || [],
    submitter_name: data.submitter_name as string,
    submitter_email: data.submitter_email as string,
    submitted_at: new Date().toISOString(),
  }
}

async function main() {
  const parsed = parseIssueBody(issueBody)
  const { valid, errors } = validateSubmission(parsed)

  if (!valid) {
    console.log("Validation failed:")
    errors.forEach((e) => console.log(`  - ${e}`))
    process.exit(1)
  }

  console.log(`Issue #${issueNumber} is valid`)
  console.log(JSON.stringify(parsed, null, 2))
}

main()
