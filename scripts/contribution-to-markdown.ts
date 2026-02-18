import type { ContributionSubmission } from "../lib/contribution-schema"

export interface ConversionResult {
  slug: string
  markdown: string
}

export function contributionToMarkdown(submission: ContributionSubmission): ConversionResult {
  const slug = submission.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  const frontmatter = [
    "---",
    `title: ${escapeYaml(submission.title)}`,
    `date: ${submission.date}`,
    `year: ${submission.year}`,
    `era: ${submission.era}`,
    `category: ${submission.category}`,
    `region: ${submission.region}`,
    `location: ${escapeYaml(submission.location)}`,
    `key_figures:`,
    ...submission.key_figures.map((f) => `  - ${escapeYaml(f)}`),
    `impact: ${escapeYaml(submission.impact)}`,
    `impact_score: ${submission.impact_score}`,
    `difficulty_score: ${submission.difficulty_score}`,
    `tags:`,
    ...submission.tags.map((t) => `  - ${escapeYaml(t)}`),
    submission.image ? `image: ${submission.image}` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n")

  const markdown = [
    frontmatter,
    "",
    `> ${submission.summary}`,
    "",
    submission.context,
    "",
    "## Context",
    "",
    submission.context,
    "",
    "## The Deed",
    "",
    submission.the_deed,
    "",
    "## Why It Matters",
    "",
    submission.why_it_matters,
    "",
    "## Brutal Truth",
    "",
    submission.brutal_truth,
    "",
    "## Numbers",
    "",
    ...submission.numbers.map((n) => `- ${n}`),
    "",
  ].join("\n")

  return { slug, markdown }
}

function escapeYaml(str: string): string {
  if (str.includes(":") || str.includes("#") || str.includes('"') || str.includes("'")) {
    return `"${str.replace(/"/g, '\\"')}"`
  }
  return str
}

const exampleInput: ContributionSubmission = {
  title: "The First Transatlantic Flight",
  date: "1927-05-21",
  year: 1927,
  era: "20th Century",
  category: "exploration",
  region: "North America",
  location: "New York to Paris",
  key_figures: ["Charles Lindbergh"],
  impact: "Proved that long-distance air travel was viable, accelerating the development of commercial aviation.",
  impact_score: 88,
  difficulty_score: 92,
  tags: ["aviation", "exploration", "solo flight"],
  image: "https://example.com/spirit-of-st-louis.jpg",
  summary: "Charles Lindbergh's solo nonstop flight across the Atlantic Ocean, a feat that captured the world's imagination.",
  context: "In 1927, several aviators had attempted to cross the Atlantic, but most had failed or died. The $25,000 Orteig Prize awaited anyone who could fly nonstop from New York to Paris. Lindbergh, a relatively unknown mail pilot, believed a single-engine aircraft flown by one person had the best chance.",
  the_deed: "On May 20, 1927, Lindbergh took off from Roosevelt Field in his custom-built Ryan monoplane, the Spirit of St. Louis. Flying through darkness, fog, and icing conditions, he navigated by dead reckoning and the stars. After 33.5 hours and 3,600 miles, he landed at Le Bourget Field in Paris, where a crowd of 150,000 awaited him.",
  why_it_matters: "The flight proved that airplanes could reliably traverse oceans, igniting global interest in aviation. Within five years, commercial airlines were establishing transatlantic routes. Lindbergh became an international hero, and his aircraft was toured across the US to promote aviation.",
  brutal_truth: "Six pilots had died attempting the Orteig Prize before Lindbergh succeeded. He flew without a radio, parachute, or fuel gauges to save weight. The fame destroyed his personal life—his son was kidnapped and murdered in 1932. He later became controversial for his isolationist and eugenicist views.",
  numbers: [
    "33.5 hours in the air",
    "3,600 miles flown",
    "150,000 people greeted him in Paris",
    "$25,000 prize won",
    "4,525 pounds of fuel carried",
  ],
  submitted_at: "2026-02-18T10:30:00Z",
  submitter_name: "Aviation Historian",
  submitter_email: "historian@example.com",
  sources: [
    "https://en.wikipedia.org/wiki/Charles_Lindbergh",
    "The Spirit of St. Louis by Charles Lindbergh",
  ],
}

const exampleOutput = contributionToMarkdown(exampleInput)

console.log("=== EXAMPLE INPUT (JSON) ===")
console.log(JSON.stringify(exampleInput, null, 2))
console.log("\n=== EXAMPLE OUTPUT (Markdown) ===")
console.log(`Slug: ${exampleOutput.slug}`)
console.log(exampleOutput.markdown)
