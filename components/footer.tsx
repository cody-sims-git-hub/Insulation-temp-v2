import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const serviceLinks = [
  "Spray Foam",
  "Blown Fiberglass",
  "Mobile Home Insulation",
  "Wall Spray Cellulose",
  "Blown Cellulose",
  "Roll & Batt",
]

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Service Area", href: "/service-area" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4" aria-label="A Plus Insulation — home">
              <img src="/aplus-logo-cropped.jpg" alt="A Plus Insulation" className="h-12 w-auto rounded-md object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm mb-5 max-w-xs">
              For all your insulation needs. Reduce your power bills with professional insulation across the Gulf Coast.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:8502092636" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                850-209-2636
              </a>
              <a
                href="mailto:info@aplusinsulation.com"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                info@aplusinsulation.com
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Serving the Gulf Coast &amp; FL Panhandle
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading uppercase tracking-wide text-base mb-4 text-foreground">Services</h3>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading uppercase tracking-wide text-base mb-4 text-foreground">Company</h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading uppercase tracking-wide text-base mb-4 text-foreground">Hours</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Mon – Fri</span>
                <span className="text-foreground">7am – 6pm</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-foreground">8am – 2pm</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-foreground">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} A Plus Insulation. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Licensed &amp; Insured · Free Estimates</p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Powered by{" "}
          <a
            href="https://simsdigitalpartners.com"
            target="_blank"
            rel="noopener"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            Sims Digital Partners
          </a>
        </p>
      </div>
    </footer>
  )
}
