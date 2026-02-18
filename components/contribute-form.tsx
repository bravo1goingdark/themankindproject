"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES, ERAS } from "@/lib/data"
import { CheckCircle2 } from "lucide-react"

export function ContributeForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-border bg-card py-16 text-center">
        <CheckCircle2 className="size-10 text-accent" />
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Thank you for your suggestion
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Your submission has been received. Our team will review it and, if
          approved, add it to the archive.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="mt-10 flex flex-col gap-6"
    >
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title" className="text-foreground">
          Achievement title
        </Label>
        <Input
          id="title"
          placeholder="e.g. The Moon Landing"
          required
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Category + Era */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className="text-foreground">Category</Label>
          <Select required>
            <SelectTrigger className="w-full bg-secondary border-border text-foreground">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-foreground">Era</Label>
          <Select required>
            <SelectTrigger className="w-full bg-secondary border-border text-foreground">
              <SelectValue placeholder="Select an era" />
            </SelectTrigger>
            <SelectContent>
              {ERAS.map((era) => (
                <SelectItem key={era} value={era}>
                  {era}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Year + Region */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="year" className="text-foreground">
            Year
          </Label>
          <Input
            id="year"
            type="number"
            placeholder="e.g. 1969"
            required
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="region" className="text-foreground">
            Region
          </Label>
          <Input
            id="region"
            placeholder="e.g. Global, Europe, Asia"
            required
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Key Figures */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="figures" className="text-foreground">
          Key figures
        </Label>
        <Input
          id="figures"
          placeholder="Comma-separated names"
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="summary" className="text-foreground">
          Summary
        </Label>
        <Textarea
          id="summary"
          placeholder="A brief one-sentence summary..."
          required
          className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="text-foreground">
          Full description
        </Label>
        <Textarea
          id="description"
          placeholder="A detailed account of the achievement and its significance..."
          required
          className="min-h-32 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Impact */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="impact" className="text-foreground">
          Impact
        </Label>
        <Textarea
          id="impact"
          placeholder="What lasting impact did this achievement have?"
          required
          className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="tags" className="text-foreground">
          Tags
        </Label>
        <Input
          id="tags"
          placeholder="Comma-separated tags, e.g. space, NASA, exploration"
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <Button type="submit" className="mt-2 w-full sm:w-auto sm:self-end">
        Submit suggestion
      </Button>
    </form>
  )
}
