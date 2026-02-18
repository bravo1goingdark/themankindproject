import { notFound } from "next/navigation"
import { getEntryBySlug, getEntrySlugs, getRelatedEntries } from "@/lib/content"
import { EntryContent } from "@/components/entry-content-new"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getEntrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getEntryBySlug(slug)
  if (!entry) return { title: "Not Found" }
  return {
    title: `${entry.title} - The Mankind Project`,
    description: entry.summary,
  }
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await getEntryBySlug(slug)
  if (!entry) notFound()

  const related = getRelatedEntries(entry)

  return <EntryContent entry={entry} related={related} />
}
