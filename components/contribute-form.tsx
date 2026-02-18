"use client"

import React, {useState, useCallback} from "react"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {CATEGORIES, ERAS, type Category} from "@/lib/content-types"
import {GITHUB_REPO} from "@/lib/constants"
import {CheckCircle2, Copy, ExternalLink, ChevronLeft, ChevronRight} from "lucide-react"
import {
    HistoricalDateInput,
    type HistoricalDateValue,
    toInternalYear,
} from "@/components/historical-date-input"
import {cn} from "@/lib/utils"

interface FormData {
    title: string
    category: Category | ""
    era: string
    year: HistoricalDateValue
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
    year: {year: null, era: "AD"},
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

const STEPS = [
    {id: "basic", label: "Basic Info", shortLabel: "1"},
    {id: "content", label: "Content", shortLabel: "2"},
    {id: "scoring", label: "Scoring", shortLabel: "3"},
    {id: "review", label: "Review", shortLabel: "4"},
]

function FieldGroup({
                        children,
                        className
                    }: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("grid gap-x-3 gap-y-2.5", className)}>
            {children}
        </div>
    )
}

function FormField({
                       children,
                       className
                   }: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("flex flex-col gap-0.5", className)}>
            {children}
        </div>
    )
}

function StepIndicator({
                           currentStep,
                           onStepClick
                       }: {
    currentStep: number
    onStepClick: (step: number) => void
}) {
    return (
        <div className="flex items-center justify-center gap-0.5 mb-6">
            {STEPS.map((step, index) => (
                <button
                    key={step.id}
                    type="button"
                    onClick={() => onStepClick(index)}
                    className="flex items-center"
                >
                    <div
                        className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                            index === currentStep
                                ? "bg-foreground text-background"
                                : index < currentStep
                                    ? "bg-foreground/20 text-foreground"
                                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        )}
                    >
                        {index < currentStep ? (
                            <CheckCircle2 className="size-3.5"/>
                        ) : (
                            step.shortLabel
                        )}
                    </div>
                    {index < STEPS.length - 1 && (
                        <div
                            className={cn(
                                "w-6 h-0.5 mx-0.5",
                                index < currentStep ? "bg-foreground/20" : "bg-border"
                            )}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}

export function ContributeForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const [step, setStep] = useState<"form" | "review">("form")
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [copied, setCopied] = useState(false)

    const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }, [])

    const generateJSON = useCallback(() => {
        const internalYear = formData.year.year !== null
            ? toInternalYear(formData.year.year, formData.year.era)
            : null

        return {
            title: formData.title,
            year: internalYear,
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

    const handleCopyJSON = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(generateJSON(), null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [generateJSON])

    const handleCreateIssue = useCallback(() => {
        const json = generateJSON()
        const title = encodeURIComponent(`[Contribution]: ${json.title}`)
        const labels = encodeURIComponent("contribution")
        const body = encodeURIComponent(`## Contribution\n\n\`\`\`json\n${JSON.stringify(json, null, 2)}\n\`\`\`\n\nSubmitted by: ${json.submitter_name || 'Anonymous'}`)
        const url = `https://github.com/${GITHUB_REPO}/issues/new?labels=${labels}&title=${title}&body=${body}`
        window.open(url, "_blank")
    }, [generateJSON])

    const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <h2 className="text-base font-medium text-foreground mb-3">Basic Information</h2>
                        <FieldGroup className="grid-cols-1 md:grid-cols-2">
                            <FormField className="md:col-span-2">
                                <Label htmlFor="title" className="text-xs text-muted-foreground">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. The Moon Landing"
                                    required
                                    value={formData.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>
                        </FieldGroup>

                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            <div className="flex flex-col gap-0.5 sm:flex-[1.2] min-w-0">
                                <Label className="text-xs text-muted-foreground">Category *</Label>
                                <Select value={formData.category}
                                        onValueChange={(v) => updateField("category", v as Category)} required>
                                    <SelectTrigger className="h-10 bg-secondary border-border text-foreground text-sm">
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((c) => (
                                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-0.5 sm:flex-[1] min-w-0">
                                <Label className="text-xs text-muted-foreground">Era *</Label>
                                <Select value={formData.era} onValueChange={(v) => updateField("era", v)} required>
                                    <SelectTrigger className="h-10 bg-secondary border-border text-foreground text-sm">
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ERAS.map((era) => (
                                            <SelectItem key={era} value={era}>{era}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-0.5 sm:flex-[1.3] min-w-0">
                                <Label className="text-xs text-muted-foreground">Year *</Label>
                                <HistoricalDateInput
                                    value={formData.year}
                                    onChange={(value) => updateField("year", value)}
                                    required
                                    placeholder="e.g. 312"
                                />
                            </div>
                        </div>

                        <FieldGroup className="grid-cols-1 md:grid-cols-2 mt-3">
                            <FormField>
                                <Label htmlFor="region" className="text-xs text-muted-foreground">Region *</Label>
                                <Input
                                    id="region"
                                    placeholder="e.g. Global, Europe"
                                    required
                                    value={formData.region}
                                    onChange={(e) => updateField("region", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField>
                                <Label htmlFor="location" className="text-xs text-muted-foreground">Location *</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. Sea of Tranquility, Moon"
                                    required
                                    value={formData.location}
                                    onChange={(e) => updateField("location", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField className="md:col-span-2">
                                <Label htmlFor="key_figures" className="text-xs text-muted-foreground">Key
                                    Figures</Label>
                                <Input
                                    id="key_figures"
                                    placeholder="Comma-separated names"
                                    value={formData.key_figures}
                                    onChange={(e) => updateField("key_figures", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>
                        </FieldGroup>
                    </div>
                )

            case 1:
                return (
                    <div>
                        <h2 className="text-base font-medium text-foreground mb-3">Content</h2>
                        <div className="space-y-3">
                            <FormField>
                                <Label htmlFor="summary" className="text-xs text-muted-foreground">Summary *</Label>
                                <Textarea
                                    id="summary"
                                    placeholder="A brief one-sentence summary..."
                                    required
                                    value={formData.summary}
                                    onChange={(e) => updateField("summary", e.target.value)}
                                    className="min-h-14 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FieldGroup className="grid-cols-1 md:grid-cols-2">
                                <FormField>
                                    <Label htmlFor="context" className="text-xs text-muted-foreground">Context *</Label>
                                    <Textarea
                                        id="context"
                                        placeholder="Historical background..."
                                        required
                                        value={formData.context}
                                        onChange={(e) => updateField("context", e.target.value)}
                                        className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                    />
                                </FormField>

                                <FormField>
                                    <Label htmlFor="the_deed" className="text-xs text-muted-foreground">The Deed
                                        *</Label>
                                    <Textarea
                                        id="the_deed"
                                        placeholder="What actually happened..."
                                        required
                                        value={formData.the_deed}
                                        onChange={(e) => updateField("the_deed", e.target.value)}
                                        className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                    />
                                </FormField>

                                <FormField>
                                    <Label htmlFor="why_it_matters" className="text-xs text-muted-foreground">Why It
                                        Matters *</Label>
                                    <Textarea
                                        id="why_it_matters"
                                        placeholder="Lasting impact..."
                                        required
                                        value={formData.why_it_matters}
                                        onChange={(e) => updateField("why_it_matters", e.target.value)}
                                        className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                    />
                                </FormField>

                                <FormField>
                                    <Label htmlFor="brutal_truth" className="text-xs text-muted-foreground">Brutal Truth
                                        *</Label>
                                    <Textarea
                                        id="brutal_truth"
                                        placeholder="Unvarnished reality..."
                                        required
                                        value={formData.brutal_truth}
                                        onChange={(e) => updateField("brutal_truth", e.target.value)}
                                        className="min-h-20 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                    />
                                </FormField>
                            </FieldGroup>

                            <FormField>
                                <Label htmlFor="numbers" className="text-xs text-muted-foreground">Numbers</Label>
                                <Textarea
                                    id="numbers"
                                    placeholder="Key statistics (one per line)&#10;e.g. 400,000 people worked on the program"
                                    value={formData.numbers}
                                    onChange={(e) => updateField("numbers", e.target.value)}
                                    className="min-h-14 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div>
                        <h2 className="text-base font-medium text-foreground mb-3">Scoring & Additional Info</h2>
                        <FieldGroup className="grid-cols-1 md:grid-cols-2">
                            <FormField>
                                <Label htmlFor="impact_score" className="text-xs text-muted-foreground">Impact
                                    (1-100)</Label>
                                <Input
                                    id="impact_score"
                                    type="number"
                                    min={1}
                                    max={100}
                                    placeholder="e.g. 98"
                                    value={formData.impact_score}
                                    onChange={(e) => updateField("impact_score", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField>
                                <Label htmlFor="difficulty_score" className="text-xs text-muted-foreground">Difficulty
                                    (1-100)</Label>
                                <Input
                                    id="difficulty_score"
                                    type="number"
                                    min={1}
                                    max={100}
                                    placeholder="e.g. 99"
                                    value={formData.difficulty_score}
                                    onChange={(e) => updateField("difficulty_score", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField className="md:col-span-2">
                                <Label htmlFor="impact" className="text-xs text-muted-foreground">Impact Statement
                                    *</Label>
                                <Textarea
                                    id="impact"
                                    placeholder="Concise impact statement..."
                                    required
                                    value={formData.impact}
                                    onChange={(e) => updateField("impact", e.target.value)}
                                    className="min-h-14 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField>
                                <Label htmlFor="tags" className="text-xs text-muted-foreground">Tags</Label>
                                <Input
                                    id="tags"
                                    placeholder="e.g. space, NASA"
                                    value={formData.tags}
                                    onChange={(e) => updateField("tags", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField>
                                <Label htmlFor="image" className="text-xs text-muted-foreground">Image URL</Label>
                                <Input
                                    id="image"
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.image}
                                    onChange={(e) => updateField("image", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField className="md:col-span-2">
                                <Label htmlFor="sources" className="text-xs text-muted-foreground">Sources</Label>
                                <Textarea
                                    id="sources"
                                    placeholder="List sources (one per line)"
                                    value={formData.sources}
                                    onChange={(e) => updateField("sources", e.target.value)}
                                    className="min-h-14 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField>
                                <Label htmlFor="submitter_name" className="text-xs text-muted-foreground">Your
                                    Name</Label>
                                <Input
                                    id="submitter_name"
                                    placeholder="Credited in entry"
                                    value={formData.submitter_name}
                                    onChange={(e) => updateField("submitter_name", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>

                            <FormField>
                                <Label htmlFor="submitter_email" className="text-xs text-muted-foreground">Your
                                    Email</Label>
                                <Input
                                    id="submitter_email"
                                    type="email"
                                    placeholder="For follow-ups"
                                    value={formData.submitter_email}
                                    onChange={(e) => updateField("submitter_email", e.target.value)}
                                    className="h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
                                />
                            </FormField>
                        </FieldGroup>
                    </div>
                )

            case 3:
                const json = generateJSON()
                const jsonString = JSON.stringify(json, null, 2)

                return (
                    <div>
                        <h2 className="text-base font-medium text-foreground mb-3">Review & Submit</h2>
                        <p className="text-xs text-muted-foreground mb-3">
                            Copy the JSON and create a GitHub issue to submit your contribution.
                        </p>

                        <div className="relative">
              <pre
                  className="p-3 rounded-md bg-secondary text-xs overflow-auto max-h-64 text-foreground border border-border">
                {jsonString}
              </pre>
                            <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2 h-7 text-xs"
                                onClick={handleCopyJSON}
                            >
                                {copied ? <CheckCircle2 className="size-3 mr-1"/> : <Copy className="size-3 mr-1"/>}
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button onClick={handleCreateIssue} className="flex items-center gap-1.5 h-9 text-sm">
                                <ExternalLink className="size-3.5"/>
                                Create GitHub Issue
                            </Button>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="mt-4">
            <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep}/>

            <form onSubmit={(e) => {
                e.preventDefault();
                goNext();
            }}>
                {renderStepContent()}

                {currentStep < 3 && (
                    <div className="flex justify-between items-center pt-5 mt-5 border-t border-border">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={goBack}
                            disabled={currentStep === 0}
                            className="h-8 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
                        >
                            <ChevronLeft className="size-4 mr-1"/>
                            Back
                        </Button>

                        <Button type="submit" className="h-8 text-sm px-5">
                            {currentStep === 2 ? "Review" : "Continue"}
                            <ChevronRight className="size-4 ml-1"/>
                        </Button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="flex justify-start pt-5 mt-5 border-t border-border">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={goBack}
                            className="h-8 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="size-4 mr-1"/>
                            Edit
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}
