"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CATEGORIES, type Category } from "@/lib/content-types"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  science: "bg-blue-500",
  engineering: "bg-amber-500",
  courage: "bg-rose-500",
  medicine: "bg-emerald-500",
  exploration: "bg-cyan-500",
}

interface SearchFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  activeCategory: Category | null
  onCategoryChange: (value: Category | null) => void
  resultCount: number
}

export function SearchFilters({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  resultCount,
}: SearchFiltersProps) {
  const hasFilters = search.length > 0 || activeCategory !== null

  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search achievements..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">
            {resultCount} {resultCount === 1 ? "entry" : "entries"}
          </span>
          {hasFilters && (
            <button
              onClick={() => {
                onSearchChange("")
                onCategoryChange(null)
              }}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3" />
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() =>
                onCategoryChange(isActive ? null : cat.value)
              }
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  categoryColors[cat.value]
                )}
              />
              {cat.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
