"use client"

import { useState, useEffect, useMemo, useCallback } from "react"

interface SearchIndexEntry {
  slug: string
  title: string
  summary: string
  category: string
  era: string
  year: number
  region: string
  tags: string[]
  keyFigures: string[]
  impactScore: number
  difficultyScore: number
  searchableText: string
}

interface SearchIndex {
  entries: SearchIndexEntry[]
  categories: string[]
  eras: string[]
  regions: string[]
  tags: string[]
  generated: string
}

interface UseSearchOptions {
  minQueryLength?: number
  maxResults?: number
}

interface UseSearchReturn {
  results: SearchIndexEntry[]
  isLoading: boolean
  error: Error | null
  index: SearchIndex | null
  search: (query: string) => void
  filterByCategory: (category: string | null) => void
  filterByEra: (era: string | null) => void
  filterByTag: (tag: string | null) => void
  clearFilters: () => void
}

let globalIndex: SearchIndex | null = null
let globalIndexPromise: Promise<SearchIndex> | null = null

async function loadIndex(): Promise<SearchIndex> {
  if (globalIndex) return globalIndex
  
  if (globalIndexPromise) return globalIndexPromise
  
  globalIndexPromise = fetch("/search-index.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load search index")
      return res.json()
    })
    .then((data: SearchIndex) => {
      globalIndex = data
      return data
    })
  
  return globalIndexPromise
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { minQueryLength = 1, maxResults = 50 } = options

  const [index, setIndex] = useState<SearchIndex | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [eraFilter, setEraFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  useEffect(() => {
    loadIndex()
      .then(setIndex)
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
    if (!index) return []
    
    let filtered = index.entries

    if (query.length >= minQueryLength) {
      const normalizedQuery = query.toLowerCase().trim()
      const queryWords = normalizedQuery.split(/\s+/)

      filtered = filtered.filter((entry) => {
        return queryWords.every((word) => 
          entry.searchableText.includes(word)
        )
      })

      filtered = filtered.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(normalizedQuery)
        const bTitleMatch = b.title.toLowerCase().includes(normalizedQuery)
        if (aTitleMatch && !bTitleMatch) return -1
        if (!aTitleMatch && bTitleMatch) return 1
        return 0
      })
    }

    if (categoryFilter) {
      filtered = filtered.filter((entry) => entry.category === categoryFilter)
    }

    if (eraFilter) {
      filtered = filtered.filter((entry) => entry.era === eraFilter)
    }

    if (tagFilter) {
      filtered = filtered.filter((entry) => 
        entry.tags.includes(tagFilter)
      )
    }

    return filtered.slice(0, maxResults)
  }, [index, query, categoryFilter, eraFilter, tagFilter, minQueryLength, maxResults])

  return {
    results,
    isLoading,
    error,
    index,
    search,
    filterByCategory,
    filterByEra,
    filterByTag,
    clearFilters,
  }
}

export type { SearchIndexEntry, SearchIndex }
