import { ContributeForm } from "@/components/contribute-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute - The Mankind Project",
  description:
    "Suggest a new achievement to be added to The Mankind Project archive.",
}

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-20">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Contribute
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Submit an achievement for review. Required sections marked with *
      </p>
      <ContributeForm />
    </div>
  )
}
