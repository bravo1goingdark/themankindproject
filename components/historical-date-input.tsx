"use client"

import { forwardRef, useId, useMemo } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type Era = "BC" | "AD"

export interface HistoricalDateValue {
  year: number | null
  era: Era
}

interface HistoricalDateInputProps {
  value: HistoricalDateValue
  onChange: (value: HistoricalDateValue) => void
  onBlur?: () => void
  disabled?: boolean
  required?: boolean
  className?: string
  error?: string
  placeholder?: string
  minYear?: number
  maxYear?: number
}

function parseYearInput(input: string): number | null {
  const cleaned = input.replace(/[^0-9]/g, "")
  if (cleaned === "") return null
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) ? null : parsed
}

export function toInternalYear(absoluteYear: number, era: Era): number {
  if (era === "BC") {
    return -absoluteYear
  }
  return absoluteYear
}

export function fromInternalYear(internalYear: number): { year: number; era: Era } {
  if (internalYear < 0) {
    return { year: Math.abs(internalYear), era: "BC" }
  }
  return { year: internalYear, era: "AD" }
}

export function formatHistoricalDate(internalYear: number | null): string {
  if (internalYear === null) return ""
  const { year, era } = fromInternalYear(internalYear)
  return era === "BC" ? `${year} BC` : `${year}`
}

export const HistoricalDateInput = forwardRef<HTMLDivElement, HistoricalDateInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      disabled,
      required,
      className,
      error,
      placeholder = "e.g. 312",
      minYear = 1,
      maxYear = 10000,
    },
    ref
  ) => {
    const inputId = useId()
    const selectId = useId()

    const displayYear = useMemo(() => {
      if (value.year === null) return ""
      return String(value.year)
    }, [value.year])

    const handleYearChange = (inputValue: string) => {
      const parsed = parseYearInput(inputValue)
      onChange({ ...value, year: parsed })
    }

    const handleEraChange = (era: Era) => {
      onChange({ ...value, era })
    }

    const handleYearBlur = () => {
      onBlur?.()
    }

    const yearError = useMemo(() => {
      if (value.year === null) return null
      if (value.year < minYear) return `Year must be at least ${minYear}`
      if (value.year > maxYear) return `Year must be at most ${maxYear}`
      return null
    }, [value.year, minYear, maxYear])

    return (
      <div ref={ref} className={cn("", className)}>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              id={inputId}
              type="text"
              inputMode="numeric"
              placeholder={placeholder}
              value={displayYear}
              onChange={(e) => handleYearChange(e.target.value)}
              onBlur={handleYearBlur}
              disabled={disabled}
              required={required}
              aria-label="Year"
              aria-describedby={error || yearError ? `${inputId}-error` : undefined}
              aria-invalid={!!(error || yearError)}
              className={cn(
                "h-10 text-sm bg-secondary border-border text-foreground placeholder:text-muted-foreground",
                (error || yearError) && "border-destructive"
              )}
            />
          </div>
          <Select
            value={value.era}
            onValueChange={(v) => handleEraChange(v as Era)}
            disabled={disabled}
          >
            <SelectTrigger
              id={selectId}
              className="w-20 h-10 text-sm bg-secondary border-border text-foreground"
              aria-label="Era"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BC">BC</SelectItem>
              <SelectItem value="AD">AD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(error || yearError) && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-destructive mt-1"
            role="alert"
          >
            {error || yearError}
          </p>
        )}
      </div>
    )
  }
)

HistoricalDateInput.displayName = "HistoricalDateInput"
