import { achievements, CATEGORIES } from "@/lib/data"

export function Hero() {
  const categoryCount = CATEGORIES.length
  const eraCount = new Set(achievements.map((a) => a.era)).size

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
        The Mankind Project
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        A curated archive of humanity&apos;s most defining achievements --
        across science, engineering, medicine, courage, and exploration.
      </p>
      <div className="mt-8 flex items-center gap-6">
        <Stat value={achievements.length} label="Entries" />
        <Separator />
        <Stat value={categoryCount} label="Categories" />
        <Separator />
        <Stat value={eraCount} label="Eras" />
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold text-foreground">{value}</span>
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return <div className="h-8 w-px bg-border" />
}
