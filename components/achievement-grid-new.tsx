"use client"

import { useState, useMemo, useCallback } from "react"
import type { EntryMetadata, Category } from "@/lib/content-types"
import { CATEGORIES } from "@/lib/content-types"
import { SearchFilters } from "@/components/search-filters"
import { AchievementCard } from "@/components/achievement-card-new"
import { ENTRIES_PER_PAGE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface AchievementGridProps {
  entries: EntryMetadata[]
}

export function AchievementGrid({ entries }: AchievementGridProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [visibleCount, setVisibleCount] = useState(ENTRIES_PER_PAGE)

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase().trim()
    
    return entries.filter((entry) => {
      const matchesSearch =
        search.length === 0 ||
        entry.title.toLowerCase().includes(searchLower) ||
        entry.summary.toLowerCase().includes(searchLower) ||
        entry.category.toLowerCase().includes(searchLower) ||
        entry.region.toLowerCase().includes(searchLower) ||
        entry.location.toLowerCase().includes(searchLower) ||
        entry.era.toLowerCase().includes(searchLower) ||
        entry.key_figures.some((f) =>
          f.toLowerCase().includes(searchLower)
        ) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchLower))

      const matchesCategory =
        activeCategory === null || entry.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory, entries])

  const visibleEntries = useMemo(() => {
    return filtered.slice(0, visibleCount)
  }, [filtered, visibleCount])

  const hasMore = visibleCount < filtered.length

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ENTRIES_PER_PAGE)
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setVisibleCount(ENTRIES_PER_PAGE)
  }, [])

  const handleCategoryChange = useCallback((value: Category | null) => {
    setActiveCategory(value)
    setVisibleCount(ENTRIES_PER_PAGE)
  }, [])

  return (
    <>
      <SearchFilters
        search={search}
        onSearchChange={handleSearchChange}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        resultCount={filtered.length}
      />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        {filtered.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEntries.map((entry) => (
                <AchievementCard
                  key={entry.slug}
                  entry={entry}
                />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  className="gap-2"
                >
                  Load more
                  <ChevronDown className="size-4" />
                </Button>
              </div>
            )}
          </>
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
