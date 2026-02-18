import type { Category } from "./content-types"

export interface ContributionSubmission {
  title: string
  date: string
  year: number
  era: string
  category: Category
  region: string
  location: string
  key_figures: string[]
  impact: string
  impact_score: number
  difficulty_score: number
  tags: string[]
  image?: string
  summary: string
  context: string
  the_deed: string
  why_it_matters: string
  brutal_truth: string
  numbers: string[]
  submitter_name?: string
  submitter_email?: string
  submitted_at: string
  sources?: string[]
}

export function validateSubmission(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid submission data"] }
  }
  
  const submission = data as Partial<ContributionSubmission>
  
  if (!submission.title?.trim()) errors.push("Title is required")
  if (!submission.date?.trim()) errors.push("Date is required")
  if (!submission.year || submission.year < -10000 || submission.year > 2100) {
    errors.push("Year must be between -10000 and 2100")
  }
  if (!submission.era?.trim()) errors.push("Era is required")
  if (!submission.category) errors.push("Category is required")
  if (!submission.region?.trim()) errors.push("Region is required")
  if (!submission.location?.trim()) errors.push("Location is required")
  if (!submission.impact?.trim()) errors.push("Impact is required")
  if (!submission.summary?.trim()) errors.push("Summary is required")
  if (!submission.context?.trim()) errors.push("Context is required")
  if (!submission.the_deed?.trim()) errors.push("The Deed is required")
  if (!submission.why_it_matters?.trim()) errors.push("Why It Matters is required")
  if (!submission.brutal_truth?.trim()) errors.push("Brutal Truth is required")
  
  return { valid: errors.length === 0, errors }
}
