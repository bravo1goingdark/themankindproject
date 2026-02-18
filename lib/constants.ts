import type { Category } from "./content-types"

export const GITHUB_REPO = "bravo1goingdark/themankindproject"

export const CATEGORY_COLORS: Record<Category, { badge: string; bar: string }> = {
  science: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    bar: "bg-blue-400",
  },
  engineering: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    bar: "bg-amber-400",
  },
  courage: {
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    bar: "bg-rose-400",
  },
  medicine: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    bar: "bg-emerald-400",
  },
  exploration: {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    bar: "bg-cyan-400",
  },
  war: {
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    bar: "bg-red-400",
  },
}

export const CATEGORY_DOT_COLORS: Record<Category, string> = {
  science: "bg-blue-500",
  engineering: "bg-amber-500",
  courage: "bg-rose-500",
  medicine: "bg-emerald-500",
  exploration: "bg-cyan-500",
  war: "bg-red-500",
}

export function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} BC` : `${year}`
}

export const ENTRIES_PER_PAGE = 50
