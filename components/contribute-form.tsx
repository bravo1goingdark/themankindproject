"use client"

import { useState, useCallback } from "react"
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
import { CATEGORIES, ERAS, type Category } from "@/lib/content-types"
import { GITHUB_REPO } from "@/lib/constants"
import { CheckCircle2, Copy, ExternalLink } from "lucide-react"

interface FormData {
  title: string
  category: Category | ""
  era: string
  year: string
  date: string
  region: string
  location: string
  key_figures: string
  summary: string
  context: string
  the_deed: string
  why_it_matters: string
  brutal_truth: string
  numbers: string
  impact: string
  impact_score: string
  difficulty_score: string
  tags: string
  image: string
  sources: string
  submitter_name: string
  submitter_email: string
}

const initialFormData: FormData = {
  title: "",
  category: "",
  era: "",
  year: "",
  date: "",
  region: "",
  location: "",
  key_figures: "",
  summary: "",
  context: "",
  the_deed: "",
  why_it_matters: "",
  brutal_truth: "",
  numbers: "",
  impact: "",
  impact_score: "",
  difficulty_score: "",
  tags: "",
  image: "",
  sources: "",
  submitter_name: "",
  submitter_email: "",
}

export function ContributeForm() {
  const [step, setStep] = useState<"form" | "review">("form")
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [copied, setCopied] = useState(false)

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const generateJSON = useCallback(() => {
    return {
      title: formData.title,
      date: formData.date,
      year: parseInt(formData.year, 10),
      era: formData.era,
      category: formData.category,
      region: formData.region,
      location: formData.location,
      key_figures: formData.key_figures.split(",").map((s) => s.trim()).filter(Boolean),
      impact: formData.impact,
      impact_score: parseInt(formData.impact_score, 10) || 50,
      difficulty_score: parseInt(formData.difficulty_score, 10) || 50,
      tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
      image: formData.image || undefined,
      summary: formData.summary,
      context: formData.context,
      the_deed: formData.the_deed,
      why_it_matters: formData.why_it_matters,
      brutal_truth: formData.brutal_truth,
      numbers: formData.numbers.split("\n").map((s) => s.trim()).filter(Boolean),
      submitted_at: new Date().toISOString(),
      submitter_name: formData.submitter_name || undefined,
      submitter_email: formData.submitter_email || undefined,
      sources: formData.sources.split("\n").map((s) => s.trim()).filter(Boolean),
    }
  }, [formData])

  const handleReview = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setStep("review")
  }, [])

  const handleCopyJSON = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(generateJSON(), null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generateJSON])

  const handleCreateIssue = useCallback(() => {
    const json = generateJSON()
    const title = encodeURIComponent(`[Contribution]: ${json.title}`)
    const labels = encodeURIComponent("contribution")
    const url = `https://github.com/${GITHUB_REPO}/issues/new?labels=${labels}&title=${title}`
    window.open(url, "_blank")
  }, [generateJSON])

  if (step === "review") {
    const json = generateJSON()
    const jsonString = JSON.stringify(json, null, 2)

    return (
      <div className="mt-10 space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Review Your Submission</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy the JSON below and create a GitHub issue to submit.
          </p>

          <div className="mt-4 relative">
            <pre className="p-4 rounded-md bg-secondary text-xs overflow-auto max-h-96 text-foreground">
              {jsonString}
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={handleCopyJSON}
            >
              {copied ? <CheckCircle2 className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button onClick={handleCreateIssue} className="flex items-center gap-2">
              <ExternalLink className="size-4" />
              Create GitHub Issue
            </Button>
            <Button variant="outline" onClick={() => setStep("form")}>
              Edit Submission
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleReview} className="mt-10 space-y-8">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-foreground">Achievement title *</Label>
          <Input
            id="title"
            placeholder="e.g. The Moon Landing"
            required
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Category *</Label>
            <Select value={formData.category} onValueChange={(v) => updateField("category", v as Category)} required>
              <SelectTrigger className="w-full bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Era *</Label>
            <Select value={formData.era} onValueChange={(v) => updateField("era", v)} required>
              <SelectTrigger className="w-full bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select an era" />
              </SelectTrigger>
              <SelectContent>
                {ERAS.map((era) => (
                  <SelectItem key={era} value={era}>{era}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="year" className="text-foreground">Year *</Label>
            <Input
              id="year"
              type="number"
              placeholder="e.g. 1969"
              required
              value={formData.year}
              onChange={(e) => updateField("year", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="date" className="text-foreground">Specific Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="region" className="text-foreground">Region *</Label>
            <Input
              id="region"
              placeholder="e.g. Global, Europe, Asia"
              required
              value={formData.region}
              onChange={(e) => updateField("region", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location" className="text-foreground">Location *</Label>
            <Input
              id="location"
              placeholder="e.g. Sea of Tranquility, Moon"
              required
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="key_figures" className="text-foreground">Key figures</Label>
          <Input
            id="key_figures"
            placeholder="Comma-separated names"
            value={formData.key_figures}
            onChange={(e) => updateField("key_figures", e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Content</h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="summary" className="text-foreground">Summary *</Label>
          <Textarea
            id="summary"
            placeholder="A brief one-sentence summary..."
            required
            value={formData.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="context" className="text-foreground">Context *</Label>
          <Textarea
            id="context"
            placeholder="Historical context and background..."
            required
            value={formData.context}
            onChange={(e) => updateField("context", e.target.value)}
            className="min-h-24 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="the_deed" className="text-foreground">The Deed *</Label>
          <Textarea
            id="the_deed"
            placeholder="A detailed account of what actually happened..."
            required
            value={formData.the_deed}
            onChange={(e) => updateField("the_deed", e.target.value)}
            className="min-h-24 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="why_it_matters" className="text-foreground">Why It Matters *</Label>
          <Textarea
            id="why_it_matters"
            placeholder="The lasting impact and significance..."
            required
            value={formData.why_it_matters}
            onChange={(e) => updateField("why_it_matters", e.target.value)}
            className="min-h-24 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="brutal_truth" className="text-foreground">Brutal Truth *</Label>
          <Textarea
            id="brutal_truth"
            placeholder="The unvarnished reality, costs, and controversies..."
            required
            value={formData.brutal_truth}
            onChange={(e) => updateField("brutal_truth", e.target.value)}
            className="min-h-24 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="numbers" className="text-foreground">Numbers</Label>
          <Textarea
            id="numbers"
            placeholder="Key statistics (one per line)&#10;e.g. 400,000 people worked on the program&#10;238,855 miles from Earth to Moon"
            value={formData.numbers}
            onChange={(e) => updateField("numbers", e.target.value)}
            className="min-h-24 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Scoring & Tags</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="impact_score" className="text-foreground">Impact Score (1-100)</Label>
            <Input
              id="impact_score"
              type="number"
              min={1}
              max={100}
              placeholder="e.g. 98"
              value={formData.impact_score}
              onChange={(e) => updateField("impact_score", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="difficulty_score" className="text-foreground">Difficulty Score (1-100)</Label>
            <Input
              id="difficulty_score"
              type="number"
              min={1}
              max={100}
              placeholder="e.g. 99"
              value={formData.difficulty_score}
              onChange={(e) => updateField("difficulty_score", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="impact" className="text-foreground">Impact Statement *</Label>
          <Textarea
            id="impact"
            placeholder="A concise statement of the achievement's impact..."
            required
            value={formData.impact}
            onChange={(e) => updateField("impact", e.target.value)}
            className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tags" className="text-foreground">Tags</Label>
          <Input
            id="tags"
            placeholder="Comma-separated tags, e.g. space, NASA, exploration"
            value={formData.tags}
            onChange={(e) => updateField("tags", e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="text-foreground">Image URL</Label>
          <Input
            id="image"
            type="url"
            placeholder="https://..."
            value={formData.image}
            onChange={(e) => updateField("image", e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sources" className="text-foreground">Sources</Label>
          <Textarea
            id="sources"
            placeholder="List your sources (one per line)"
            value={formData.sources}
            onChange={(e) => updateField("sources", e.target.value)}
            className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Your Information (Optional)</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="submitter_name" className="text-foreground">Your Name</Label>
            <Input
              id="submitter_name"
              placeholder="Will be credited in the entry"
              value={formData.submitter_name}
              onChange={(e) => updateField("submitter_name", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="submitter_email" className="text-foreground">Your Email</Label>
            <Input
              id="submitter_email"
              type="email"
              placeholder="For follow-up questions"
              value={formData.submitter_email}
              onChange={(e) => updateField("submitter_email", e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto sm:self-end">
        Review Submission
      </Button>
    </form>
  )
}
