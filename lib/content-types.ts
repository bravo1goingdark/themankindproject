export type Category =
    | "science"
    | "engineering"
    | "courage"
    | "medicine"
    | "exploration"
    | "war"

export interface EntryFrontmatter {
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
}

export interface Entry extends EntryFrontmatter {
    slug: string
    summary: string
    contextHtml: string
    theDeedHtml: string
    whyItMattersHtml: string
    brutalTruthHtml: string
    numbersHtml: string
}

export interface EntryMetadata extends EntryFrontmatter {
    slug: string
    summary: string
}

export const CATEGORIES: { value: Category; label: string }[] = [
    {value: "science", label: "Science"},
    {value: "engineering", label: "Engineering"},
    {value: "courage", label: "Courage"},
    {value: "medicine", label: "Medicine"},
    {value: "exploration", label: "Exploration"},
    {value: "war", label: "War"},
]

export const ERAS = [
    "Ancient",
    "Medieval",
    "15th Century",
    "17th Century",
    "18th Century",
    "19th Century",
    "20th Century",
    "21st Century",
]
