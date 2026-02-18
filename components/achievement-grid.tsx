"use client"

import { useState, useMemo } from "react"
import { achievements, type Category } from "@/lib/data"
import { SearchFilters } from "@/components/search-filters"
import { AchievementCard } from "@/components/achievement-card"

export function AchievementGrid() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filtered = useMemo(() => {
    return achievements.filter((a) => {
      const matchesSearch =
        search.length === 0 ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase()) ||
        a.keyFigures.some((f) =>
          f.toLowerCase().includes(search.toLowerCase())
        ) ||
        a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory =
        activeCategory === null || a.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

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
            {filtered.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
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
