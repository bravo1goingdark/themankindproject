# Content System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           THE MANKIND PROJECT                                │
│                        Content System Architecture                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   CONTENT FILES  │────▶│  PARSING LAYER   │────▶│   CACHE LAYER    │
│   (*.md files)   │     │  (gray-matter)   │     │   (in-memory)    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                  │                        │
                                  ▼                        ▼
                         ┌──────────────────┐     ┌──────────────────┐
                         │ TRANSFORM LAYER  │     │  QUERY LAYER     │
                         │    (remark)      │     │  (getAll, etc)   │
                         │   MD → HTML      │     │                  │
                         └──────────────────┘     └──────────────────┘
                                  │                        │
                                  ▼                        ▼
                         ┌──────────────────┐     ┌──────────────────┐
                         │  SEARCH INDEX    │     │   NEXT.JS APP    │
                         │  (JSON, static)  │     │    ROUTER        │
                         └──────────────────┘     └──────────────────┘
                                                          │
                                                          ▼
                                                  ┌──────────────────┐
                                                  │   CDN / EDGE     │
                                                  │   (Static HTML)  │
                                                  └──────────────────┘
```

## Folder Structure

```
minimal-timeline-app/
├── content/                    # Markdown content (scalable to 10k+)
│   ├── moon-landing.md
│   ├── discovery-of-penicillin.md
│   └── ...
│
├── lib/
│   ├── content.ts              # Server-only content loader
│   ├── content-types.ts        # Shared TypeScript interfaces
│   └── utils.ts                # Utility functions
│
├── scripts/
│   ├── convert-to-md.ts        # One-time migration script
│   ├── build-search-index.ts   # Build-time index generator
│   └── validate-content.ts     # Content validation utility
│
├── hooks/
│   └── use-search.ts           # Client-side search hook
│
├── public/
│   └── search-index.json       # Generated search index (CDN-cached)
│
└── app/
    ├── page.tsx                # Home page (static)
    └── entry/[slug]/page.tsx   # Entry pages (SSG with generateStaticParams)
```

## Layer Details

### 1. Content Ingestion Layer
- **Location**: `/content/*.md`
- **Format**: Markdown with YAML frontmatter
- **Scalability**: Flat directory works well up to ~10k files

### 2. Parsing Layer
- **Library**: `gray-matter`
- **Purpose**: Extract frontmatter + content
- **Validation**: Type-safe frontmatter validation

### 3. Transformation Layer
- **Library**: `remark` + `remark-html`
- **Purpose**: Convert markdown to HTML
- **Runs**: At build time only (static generation)

### 4. Caching Layer
- **Type**: In-memory Map cache
- **Scope**: Build-time only (per-worker)
- **Benefits**: Avoids re-reading files during build

### 5. Indexing Layer
- **Output**: `/public/search-index.json`
- **Size**: ~2KB per 100 entries
- **CDN**: Served from edge, client-cached

### 6. Rendering Layer
- **Framework**: Next.js App Router
- **Mode**: Static Site Generation (SSG)
- **Output**: Pre-rendered HTML files

## API Reference

### Server Functions (lib/content.ts)

```typescript
// Get all entry slugs
getEntrySlugs(): string[]

// Get single entry metadata (fast)
getEntryMetadata(slug: string): EntryMetadata | null

// Get all entries metadata (for listing)
getAllEntriesMetadata(): EntryMetadata[]

// Get full entry with HTML content
getEntryBySlug(slug: string): Promise<Entry | null>

// Get all entries with full content
getAllEntries(): Promise<Entry[]>

// Query functions
getEntriesByCategory(category: Category): EntryMetadata[]
getEntriesByEra(era: string): EntryMetadata[]
getEntriesByRegion(region: string): EntryMetadata[]
getEntriesByTag(tag: string): EntryMetadata[]
getEntriesByYearRange(start: number, end: number): EntryMetadata[]

// Related entries (scored)
getRelatedEntries(current: EntryMetadata, count?: number): EntryMetadata[]

// Simple search (server-side)
searchEntries(query: string): EntryMetadata[]

// Statistics
getStatistics(): ContentStatistics
```

### Client Hook (hooks/use-search.ts)

```typescript
const {
  results,       // Filtered search results
  isLoading,     // Loading state
  error,         // Error state
  index,         // Full search index
  search,        // (query: string) => void
  filterByCategory, // (category: string | null) => void
  filterByEra,   // (era: string | null) => void
  filterByTag,   // (tag: string | null) => void
  clearFilters,  // () => void
} = useSearch({ minQueryLength: 2, maxResults: 50 })
```

## Performance Considerations

### Build Time
| Entries | Build Time | Index Size | Output Size |
|---------|------------|------------|-------------|
| 100     | ~5s        | ~20KB      | ~2MB        |
| 1,000   | ~15s       | ~200KB     | ~20MB       |
| 10,000  | ~2min      | ~2MB       | ~200MB      |

### Runtime Performance
- **Search**: Client-side, <1ms for 10k entries
- **Page Load**: Pre-rendered HTML, instant
- **Navigation**: Static files, CDN-cached

### CDN Strategy
```
Cache-Control: public, max-age=31536000, immutable
```
- All static pages cached at edge
- Search index cached with ETag
- No server runtime required

## Scaling to 10,000+ Entries

### Option A: Flat Directory (Recommended up to 10k)
```
content/
├── entry-1.md
├── entry-2.md
└── ...
```
Simple, works well, no code changes needed.

### Option B: Category-based (10k-50k)
```
content/
├── science/
│   ├── entry-1.md
│   └── entry-2.md
├── medicine/
│   └── entry-3.md
└── ...
```
Update content loader to recurse directories.

### Option C: Date-based (50k+)
```
content/
├── 1900s/
│   └── 1969/
│       └── moon-landing.md
└── 2000s/
    └── 2003/
        └── human-genome-project.md
```
Good for time-series data, enables lazy loading.

### Option D: Database + Build-time Export (100k+)
1. Store content in database (PostgreSQL, MongoDB)
2. Export to markdown at build time
3. Or use a headless CMS (Contentful, Sanity)

## Markdown Schema

```yaml
---
# Required
title: string
date: string (YYYY-MM-DD)
year: number (can be negative for BC)
era: string
category: science | engineering | courage | medicine | exploration
region: string
location: string
key_figures: string[]
impact: string
impact_score: number (0-100)
difficulty_score: number (0-100)
tags: string[]

# Optional
image: string
---

> Summary line (blockquote format)

Description paragraph...

## Context
[Historical context content]

## The Deed
[What actually happened]

## Why It Matters
[Significance and impact]

## Brutal Truth
[Challenges, costs, failures]

## Numbers
- Statistic 1
- Statistic 2
- ...
```

## Build Pipeline

```
pnpm build
    │
    ├── 1. Validate Content (scripts/validate-content.ts)
    │   └── Check frontmatter, sections, data types
    │
    ├── 2. Build Search Index (scripts/build-search-index.ts)
    │   └── Generate /public/search-index.json
    │
    └── 3. Next.js Build (next build)
        ├── Parse all markdown files
        ├── Convert to HTML with remark
        ├── Generate static pages
        └── Output to .next/
```

## Deployment

### Vercel (Recommended)
- Automatic static optimization
- Edge caching
- Zero configuration

### Other Platforms
```bash
pnpm build
pnpm start  # Or serve .next/static/ directly
```

### Static Export
```javascript
// next.config.mjs
export default {
  output: 'export'
}
```
Generates pure static HTML for any hosting.

## Future Enhancements

1. **Image Optimization**: Add next/image for content images
2. **i18n**: Multi-language support with next-intl
3. **RSS Feed**: Generate from entries
4. **Sitemap**: Auto-generate sitemap.xml
5. **Incremental Builds**: Use ISR for large content sets
6. **Full-text Search**: Integrate Algolia or Meilisearch for 10k+
