import { ContributeForm } from "@/components/contribute-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute - The Mankind Project",
  description:
    "Suggest a new achievement to be added to The Mankind Project archive.",
}

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16 pb-24">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Contribute
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Know of an achievement that belongs here? Suggest it below. All
        submissions are reviewed before being added to the archive.
      </p>
      <ContributeForm />
    </div>
  )
}
