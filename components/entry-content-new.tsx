"use client"

import Link from "next/link"
import Image from "next/image"
import type { Entry, EntryMetadata } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AchievementCard } from "@/components/achievement-card-new"
import { CATEGORY_COLORS, formatYear } from "@/lib/constants"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Flame,
  BarChart3,
} from "lucide-react"

export function EntryContent({
  entry,
  related,
}: {
  entry: Entry
  related: EntryMetadata[]
}) {
  return (
    <article>
      <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80">
        <Image
          src="/images/entry-hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute bottom-0 left-0 w-full px-6 pb-8 lg:px-0">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-xs text-foreground/60 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              Back to archive
            </Link>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`text-[10px] font-medium uppercase tracking-wider ${CATEGORY_COLORS[entry.category]?.badge || ""}`}
              >
                {entry.category}
              </Badge>
              <span className="text-xs font-mono text-foreground/50">
                {entry.era}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {entry.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-0">
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground italic">
          {entry.summary}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-6 lg:px-0">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-border py-5">
          <MetaItem
            icon={Clock}
            label="Year"
            value={formatYear(entry.year)}
          />
          <MetaItem
            icon={MapPin}
            label="Location"
            value={entry.location}
          />
          <MetaItem
            icon={Users}
            label="Key figures"
            value={entry.key_figures.join(", ")}
          />
          <div className="flex items-center gap-6 ml-auto">
            <ScoreChip
              icon={BarChart3}
              label="Impact"
              score={entry.impact_score}
              color={CATEGORY_COLORS[entry.category]?.bar || "bg-accent"}
            />
            <ScoreChip
              icon={Flame}
              label="Difficulty"
              score={entry.difficulty_score}
              color="bg-foreground/70"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-6 lg:px-0">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1 min-w-0">
            <ContentSection title="Context">
              <div dangerouslySetInnerHTML={{ __html: entry.contextHtml }} />
            </ContentSection>

            <ContentSection title="The Deed">
              <div dangerouslySetInnerHTML={{ __html: entry.theDeedHtml }} />
            </ContentSection>

            <ContentSection title="Why It Matters">
              <div dangerouslySetInnerHTML={{ __html: entry.whyItMattersHtml }} />
            </ContentSection>

            <ContentSection title="Brutal Truth">
              <div className="rounded-lg border border-rose-500/15 bg-rose-500/5 px-5 py-4">
                <div dangerouslySetInnerHTML={{ __html: entry.brutalTruthHtml }} className="text-foreground/80" />
              </div>
            </ContentSection>

            <ContentSection title="By the Numbers">
              <div dangerouslySetInnerHTML={{ __html: entry.numbersHtml }} className="prose-content" />
            </ContentSection>

            <div className="mt-10 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-8 flex flex-col gap-6">
              <SidebarCard title="People Involved">
                <ul className="flex flex-col gap-2">
                  {entry.key_figures.map((person) => (
                    <li
                      key={person}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground uppercase">
                        {person.charAt(0)}
                      </span>
                      {person}
                    </li>
                  ))}
                </ul>
              </SidebarCard>

              <SidebarCard title="Details">
                <dl className="flex flex-col gap-3 text-sm">
                  <SidebarRow label="Location" value={entry.location} />
                  <SidebarRow label="Region" value={entry.region} />
                  <SidebarRow label="Category">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium uppercase tracking-wider ${CATEGORY_COLORS[entry.category]?.badge || ""}`}
                    >
                      {entry.category}
                    </Badge>
                  </SidebarRow>
                  <SidebarRow label="Era" value={entry.era} />
                </dl>
              </SidebarCard>

              <SidebarCard title="Scores">
                <div className="flex flex-col gap-4">
                  <ScoreBar
                    label="Impact"
                    score={entry.impact_score}
                    color={
                      CATEGORY_COLORS[entry.category]?.bar || "bg-accent"
                    }
                  />
                  <ScoreBar
                    label="Difficulty"
                    score={entry.difficulty_score}
                    color="bg-foreground/60"
                  />
                </div>
              </SidebarCard>

              {related.length > 0 && (
                <SidebarCard title="Related Entries">
                  <ul className="flex flex-col gap-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/entry/${r.slug}`}
                          className="group flex items-center gap-2 rounded-md px-2 py-1.5 -mx-2 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <ChevronRight className="size-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          <span className="truncate">{r.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SidebarCard>
              )}
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl px-6 pb-24 lg:px-0">
          <Separator className="mb-12" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Continue exploring
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <AchievementCard key={r.slug} entry={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

function ContentSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      <Separator className="my-3" />
      <div className="text-[15px] leading-[1.85] text-foreground/80 prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-1">
        {children}
      </div>
    </section>
  )
}

function SidebarCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  )
}

function SidebarRow({
  label,
  value,
  children,
}: {
  label: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground shrink-0">{label}</dt>
      <dd className="text-right text-foreground/80">
        {children ?? value}
      </dd>
    </div>
  )
}

function ScoreBar({
  label,
  score,
  color,
}: {
  label: string
  score: number
  color: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground/80">{score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function ScoreChip({
  icon: Icon,
  label,
  score,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  score: number
  color: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-3.5 text-muted-foreground" />
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-mono text-foreground/70">{score}</span>
    </div>
  )
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-sm text-foreground">{value}</span>
      </div>
    </div>
  )
}
