"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/service-area", label: "Service Area" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="A Plus Insulation — home">
            <img
              src="/aplus-logo.jpg"
              alt="A Plus Insulation"
              className="h-12 w-auto md:h-14 rounded-md object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:8502092636"
              className="flex items-center gap-2 text-foreground font-heading text-lg tracking-wide hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              850-209-2636
            </a>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 text-sm font-semibold uppercase tracking-wide"
            >
              <Link href="/contact">Free Estimate</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="tel:8502092636"
                  className="flex items-center gap-2 text-foreground font-heading text-lg tracking-wide"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  850-209-2636
                </a>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground rounded-md font-semibold uppercase tracking-wide"
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Free Estimate
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
