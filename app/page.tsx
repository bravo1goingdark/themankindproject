import { Hero } from "@/components/hero"
import { AchievementGrid } from "@/components/achievement-grid-new"
import { getAllEntriesMetadata } from "@/lib/content"

export default async function Page() {
  const entries = await getAllEntriesMetadata()
  
  return (
    <>
      <Hero />
      <AchievementGrid entries={entries} />
    </>
  )
}
