"use client"

import { useState, useMemo } from "react"
import type { EntryMetadata, Category } from "@/lib/content-types"
import { CATEGORIES } from "@/lib/content-types"
import { SearchFilters } from "@/components/search-filters"
import { AchievementCard } from "@/components/achievement-card-new"

interface AchievementGridProps {
  entries: EntryMetadata[]
}

export function AchievementGrid({ entries }: AchievementGridProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        search.length === 0 ||
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.summary.toLowerCase().includes(search.toLowerCase()) ||
        entry.key_figures.some((f) =>
          f.toLowerCase().includes(search.toLowerCase())
        ) ||
        entry.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory =
        activeCategory === null || entry.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory, entries])

  return (
    <>
      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        resultCount={filtered.length}
      />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <AchievementCard
                key={entry.slug}
                entry={entry}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-muted-foreground">
              No achievements match your filters.
            </p>
            <button
              onClick={() => {
                setSearch("")
                setActiveCategory(null)
              }}
              className="mt-3 text-xs text-accent hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}
