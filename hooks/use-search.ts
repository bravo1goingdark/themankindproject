"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import MiniSearch from "minisearch"
import pako from "pako"

interface NormalizedEntry {
  id: string
  t: number
  d: number
  c: number
  e: number
  y: number
  r: number
  tg: number[]
  kf: number[]
  is: number
  ds: number
}

interface CompressedIndex {
  v: number
  e: NormalizedEntry[]
  dict: string[]
  contents: string
}

interface DecodedEntry {
  slug: string
  title: string
  description: string
  category: string
  era: string
  year: number
  region: string
  tags: string[]
  keyFigures: string[]
  impactScore: number
  difficultyScore: number
}

interface SearchResult extends DecodedEntry {
  score: number
}

interface UseSearchOptions {
  minQueryLength?: number
  maxResults?: number
}

interface UseSearchReturn {
  results: SearchResult[]
  isLoading: boolean
  error: Error | null
  categories: string[]
  eras: string[]
  tags: string[]
  search: (query: string) => void
  filterByCategory: (category: string | null) => void
  filterByEra: (era: string | null) => void
  filterByTag: (tag: string | null) => void
  clearFilters: () => void
}

function decodeEntry(e: NormalizedEntry, dict: string[]): DecodedEntry {
  return {
    slug: e.id,
    title: dict[e.t],
    description: dict[e.d],
    category: dict[e.c],
    era: dict[e.e],
    year: e.y,
    region: dict[e.r],
    tags: e.tg.map(i => dict[i]),
    keyFigures: e.kf.map(i => dict[i]),
    impactScore: e.is,
    difficultyScore: e.ds,
  }
}

let globalMiniSearch: MiniSearch<DecodedEntry> | null = null
let globalIndexData: { entries: DecodedEntry[]; meta: { c: string[]; er: string[]; tg: string[] } } | null = null
let globalIndexPromise: Promise<{ miniSearch: MiniSearch<DecodedEntry>; meta: { c: string[]; er: string[]; tg: string[] } }> | null = null

async function loadIndex(): Promise<{ miniSearch: MiniSearch<DecodedEntry>; meta: { c: string[]; er: string[]; tg: string[] } }> {
  if (globalMiniSearch && globalIndexData) {
    return { miniSearch: globalMiniSearch, meta: globalIndexData.meta }
  }

  if (globalIndexPromise) return globalIndexPromise

  globalIndexPromise = fetch("/search-index.json")
    .then((r) => r.json())
    .then((index: CompressedIndex) => {
      const dict = index.dict
      
      let contentsJson: Record<string, string>
      try {
        const compressed = Uint8Array.from(atob(index.contents), c => c.charCodeAt(0))
        const decompressed = pako.inflate(compressed, { to: "string" })
        contentsJson = JSON.parse(decompressed)
      } catch {
        contentsJson = {}
      }

      const entries = index.e.map((e) => {
        const decoded = decodeEntry(e, dict)
        return {
          ...decoded,
          searchableContent: contentsJson[e.id] || "",
        }
      })

      const miniSearch = new MiniSearch<DecodedEntry & { searchableContent: string }>({
        fields: ["title", "description", "searchableContent", "category", "era", "region"],
        storeFields: ["slug", "title", "description", "category", "era", "year", "region", "tags", "keyFigures", "impactScore", "difficultyScore"],
        searchOptions: {
          fuzzy: 0.2,
          prefix: true,
          boost: { title: 3, tags: 2, keyFigures: 2 },
        },
      })

      miniSearch.addAll(entries)

      globalMiniSearch = miniSearch as unknown as MiniSearch<DecodedEntry>
      
      const categories = new Set<string>()
      const eras = new Set<string>()
      const tags = new Set<string>()
      
      for (const e of entries) {
        categories.add(e.category)
        eras.add(e.era)
        e.tags.forEach(t => tags.add(t))
      }
      
      globalIndexData = {
        entries,
        meta: {
          c: Array.from(categories).sort(),
          er: Array.from(eras).sort(),
          tg: Array.from(tags).sort(),
        }
      }

      return { miniSearch: globalMiniSearch, meta: globalIndexData.meta }
    })

  return globalIndexPromise
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { minQueryLength = 1, maxResults = 50 } = options

  const [miniSearch, setMiniSearch] = useState<MiniSearch<DecodedEntry> | null>(null)
  const [meta, setMeta] = useState<{ c: string[]; er: string[]; tg: string[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [eraFilter, setEraFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  useEffect(() => {
    loadIndex()
      .then(({ miniSearch, meta }) => {
        setMiniSearch(miniSearch)
        setMeta(meta)
      })
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery)
  }, [])

  const filterByCategory = useCallback((category: string | null) => {
    setCategoryFilter(category)
  }, [])

  const filterByEra = useCallback((era: string | null) => {
    setEraFilter(era)
  }, [])

  const filterByTag = useCallback((tag: string | null) => {
    setTagFilter(tag)
  }, [])

  const clearFilters = useCallback(() => {
    setQuery("")
    setCategoryFilter(null)
    setEraFilter(null)
    setTagFilter(null)
  }, [])

  const results = useMemo(() => {
    if (!miniSearch || !globalIndexData) return []

    let searchResults: SearchResult[]

    if (query.length >= minQueryLength) {
      try {
        const rawResults = miniSearch.search(query, {
          fuzzy: 0.2,
          prefix: true,
          boost: { title: 3, tags: 2, keyFigures: 2 },
        })

        searchResults = rawResults.map((r) => ({
          slug: r.slug,
          title: r.title,
          description: r.description,
          category: r.category,
          era: r.era,
          year: r.year,
          region: r.region,
          tags: r.tags,
          keyFigures: r.keyFigures,
          impactScore: r.impactScore,
          difficultyScore: r.difficultyScore,
          score: r.score,
        }))
      } catch {
        searchResults = globalIndexData.entries.map((e) => ({ ...e, score: 0 }))
      }
    } else {
      searchResults = globalIndexData.entries.map((e) => ({ ...e, score: 0 }))
    }

    if (categoryFilter) {
      searchResults = searchResults.filter((r) => r.category === categoryFilter)
    }

    if (eraFilter) {
      searchResults = searchResults.filter((r) => r.era === eraFilter)
    }

    if (tagFilter) {
      searchResults = searchResults.filter((r) => r.tags.includes(tagFilter))
    }

    if (query.length < minQueryLength) {
      searchResults.sort((a, b) => b.year - a.year)
    }

    return searchResults.slice(0, maxResults)
  }, [miniSearch, query, categoryFilter, eraFilter, tagFilter, minQueryLength, maxResults])

  return {
    results,
    isLoading,
    error,
    categories: meta?.c || [],
    eras: meta?.er || [],
    tags: meta?.tg || [],
    search,
    filterByCategory,
    filterByEra,
    filterByTag,
    clearFilters,
  }
}

export type { DecodedEntry as SearchIndexEntry, SearchResult }
