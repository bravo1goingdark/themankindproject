import Link from "next/link"
import type { Achievement } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const categoryColors: Record<string, string> = {
  science: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  engineering: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  courage: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  medicine: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  exploration: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

export function AchievementCard({
  achievement,
}: {
  achievement: Achievement
}) {
  return (
    <Link href={`/entry/${achievement.id}`} className="group block">
      <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-muted-foreground/25">
        <div className="flex items-center justify-between gap-3">
          <Badge
            variant="outline"
            className={`text-[10px] font-medium uppercase tracking-wider ${categoryColors[achievement.category] || ""}`}
          >
            {achievement.category}
          </Badge>
          <span className="shrink-0 text-xs font-mono text-muted-foreground">
            {achievement.year < 0
              ? `${Math.abs(achievement.year)} BC`
              : achievement.year}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-snug text-foreground group-hover:text-accent transition-colors">
          {achievement.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {achievement.summary}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {achievement.region}
          </span>
          <span className="text-xs text-muted-foreground">
            {achievement.era}
          </span>
        </div>
      </article>
    </Link>
  )
}
