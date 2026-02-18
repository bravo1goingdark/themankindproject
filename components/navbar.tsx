import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
            TMP
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            / The Mankind Project
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore
          </Link>
          <Link
            href="/contribute"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contribute
          </Link>
        </div>
      </nav>
    </header>
  )
}
