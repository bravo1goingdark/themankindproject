import { Hero } from "@/components/hero"
import { AchievementGrid } from "@/components/achievement-grid-new"
import { getAllEntriesMetadata } from "@/lib/content"

export default function Page() {
  const entries = getAllEntriesMetadata()
  
  return (
    <>
      <Hero />
      <AchievementGrid entries={entries} />
    </>
  )
}
