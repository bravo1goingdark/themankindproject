# The Mankind Project

A timeline of humanity's greatest achievements - from the construction of the Great Wall to the Moon Landing.

## Features

- **Client-side search** with MiniSearch - fuzzy matching, prefix search, field boosting
- **Compressed search index** - normalized strings + pako compression (~50% smaller)
- **Markdown-based content** - each achievement is a `.md` file with frontmatter
- **SSR for full content** - markdown rendered server-side with sanitization
- **Dark mode** support via next-themes

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Search**: MiniSearch + pako compression
- **Content**: Markdown with gray-matter + remark

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Content Structure

Each achievement is a markdown file in `content/`:

```markdown
---
title: "Moon Landing"
date: "1969-07-20"
year: 1969
era: "20th Century"
category: "exploration"
region: "North America"
location: "Sea of Tranquility, Moon"
key_figures:
  - "Neil Armstrong"
  - "Buzz Aldrin"
impact: "First humans on the Moon"
impact_score: 10
difficulty_score: 10
tags:
  - "space"
  - "nasa"
---

> Summary text here

## Context
Historical context...

## The Deed
What happened...

## Why It Matters
Impact and significance...

## Brutal Truth
The harsh reality...

## Numbers
Key statistics...
```

## Categories

- **Science** - Theoretical breakthroughs
- **Engineering** - Structural and mechanical feats
- **Courage** - Acts of bravery and social change
- **Medicine** - Medical advancements
- **Exploration** - Voyages and discoveries

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Validate content, build search index, compile |
| `pnpm build:index` | Rebuild search index only |
| `pnpm validate` | Validate all markdown frontmatter |

## Search Index

The search index is built at build time with:

1. **Normalization** - Strings stored once in a dictionary, referenced by index
2. **Compression** - Content compressed with pako deflate + base64
3. **Single file** - All search data in `public/search-index.json`

Result: ~24KB compressed index that becomes ~8-10KB with Brotli on CDN.

## Contributing

Add a new entry by creating a markdown file in `content/` following the structure above. Run `pnpm validate` to check your frontmatter.
