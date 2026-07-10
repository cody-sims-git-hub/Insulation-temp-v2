import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Features } from "@/components/features"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, faqPageSchema } from "@/lib/site-config"
import { servicesFaqs } from "@/lib/faqs"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Insulation Services in Panama City, FL",
  description:
    "Spray foam, blown fiberglass, cellulose, roll & batt, mobile home and garage door insulation for homes and businesses across the Florida Panhandle. Free estimates — call 850-209-2636.",
  alternates: { canonical: "/services" },
}

const detailed = [
  {
    title: "Spray Foam Insulation",
    image: "/services-spray-foam.jpg",
    alt: "Building interior fully insulated with closed-cell spray foam by A Plus Insulation",
    body: "Open and closed-cell spray foam expands to seal every crack, gap, and cavity. It delivers the highest R-value per inch, blocks air infiltration, and helps control moisture in our humid Gulf Coast climate.",
    points: ["Highest energy efficiency", "Air & moisture barrier", "Ideal for attics, walls & crawl spaces"],
  },
  {
    title: "Blown-In Fiberglass & Cellulose",
    image: "/services-blown-cellulose.jpg",
    alt: "A Plus Insulation technician blowing loose-fill cellulose insulation into an attic",
    body: "Fast, cost-effective coverage for attics and existing walls. Blown fiberglass and dense-pack cellulose fill irregular spaces completely for consistent thermal performance and better sound control.",
    points: ["Great for retrofits", "Even, gap-free coverage", "Eco-friendly cellulose options"],
  },
  {
    title: "New Construction & Whole-Home",
    image: "/services-new-construction.jpg",
    alt: "A Plus Insulation trucks on site at a new coastal home under construction",
    body: "From framing to finish, we insulate new builds, additions, and full remodels. Roll & batt, wall spray cellulose, garage doors, and drywall removal & disposal round out our complete service lineup.",
    points: ["Builder & GC partnerships", "Mobile home specialists", "Drywall removal & disposal"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          faqPageSchema(servicesFaqs),
        ]}
      />
      <Header />
      <main>
      <PageHero
        eyebrow="services"
        title={
          <>
            Complete <span className="text-primary">insulation services</span>
          </>
        }
        description="For all your insulation needs. A Plus Insulation installs and upgrades insulation for homes, mobile homes, and commercial buildings across the Gulf Coast — all backed by free estimates."
      />

      {/* Detailed breakdown */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {detailed.map((item, i) => (
            <div
              key={item.title}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <h2 className="font-heading uppercase text-3xl md:text-4xl text-foreground mb-5 text-balance leading-tight">
                  {item.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">{item.body}</p>
                <ul className="space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-72 md:h-96 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Features />

      {/* Mid-page prompt */}
      <section className="border-y border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-heading uppercase text-2xl md:text-4xl text-foreground mb-4 text-balance">
            Not sure which service you need?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty">
            Our team will assess your home and recommend the right insulation to cut your power bills. Free, no
            obligation.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-6 font-semibold uppercase tracking-wide"
          >
            <Link href="/contact">Get a Free Estimate</Link>
          </Button>
        </div>
      </section>

      <FAQ faqs={servicesFaqs} heading="Insulation service FAQs" />

      <CTA />
      </main>
      <Footer />
    </div>
  )
}
