import Link from "next/link"

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description: string
}

const crumbLabel: Record<string, string> = {
  services: "Services",
  about: "About",
  "service-area": "Service Area",
  contact: "Contact",
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-primary) 0, var(--color-primary) 2px, transparent 2px, transparent 14px)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-border">/</span>
          <span className="text-primary">{crumbLabel[eyebrow] ?? eyebrow}</span>
        </nav>
        <span className="text-sm uppercase tracking-widest text-primary font-semibold">{crumbLabel[eyebrow] ?? eyebrow}</span>
        <h1 className="font-heading uppercase text-4xl md:text-6xl text-foreground mt-4 mb-5 text-balance leading-tight">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-pretty">{description}</p>
      </div>
    </section>
  )
}
