import Link from "next/link"
import type { EntryMetadata } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { CATEGORY_COLORS, formatYear } from "@/lib/constants"

export function AchievementCard({
  entry,
}: {
  entry: EntryMetadata
}) {
  return (
    <Link href={`/entry/${entry.slug}`} className="group block">
      <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-muted-foreground/25">
        <div className="flex items-center justify-between gap-3">
          <Badge
            variant="outline"
            className={`text-[10px] font-medium uppercase tracking-wider ${CATEGORY_COLORS[entry.category]?.badge || ""}`}
          >
            {entry.category}
          </Badge>
          <span className="shrink-0 text-xs font-mono text-muted-foreground">
            {formatYear(entry.year)}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-snug text-foreground group-hover:text-accent transition-colors">
          {entry.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {entry.summary}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {entry.region}
          </span>
          <span className="text-xs text-muted-foreground">
            {entry.era}
          </span>
        </div>
      </article>
    </Link>
  )
}
