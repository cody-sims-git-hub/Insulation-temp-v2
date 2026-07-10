import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, faqPageSchema } from "@/lib/site-config"
import { serviceAreaFaqs } from "@/lib/faqs"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Area — Gulf Coast & FL Panhandle",
  description:
    "A Plus Insulation serves Panama City, Destin, Fort Walton Beach, Pensacola and communities across the Florida Panhandle & Gulf Coast — plus nearby Alabama & Georgia towns like Dothan and Bainbridge. See if we cover you.",
  alternates: { canonical: "/service-area" },
}

const regions = [
  {
    name: "Pensacola Area",
    cities: ["Pensacola", "Pensacola Beach", "Gulf Breeze", "Milton", "Pace", "Cantonment"],
  },
  {
    name: "Emerald Coast",
    cities: ["Destin", "Fort Walton Beach", "Navarre", "Miramar Beach", "Niceville", "Crestview"],
  },
  {
    name: "Panama City Area",
    cities: ["Panama City", "Panama City Beach", "Lynn Haven", "Callaway", "Santa Rosa Beach", "Freeport"],
  },
  {
    name: "Alabama & Georgia",
    cities: ["Dothan, AL", "Enterprise, AL", "Ozark, AL", "Geneva, AL", "Bainbridge, GA", "Donalsonville, GA", "Colquitt, GA"],
  },
]

const highlights = [
  "Free on-site estimates throughout the coverage area",
  "Residential, mobile home & commercial projects",
  "New construction and retrofit insulation",
  "Fully equipped crews and branded service trucks",
]

export default function ServiceAreaPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service Area", path: "/service-area" },
          ]),
          faqPageSchema(serviceAreaFaqs),
        ]}
      />
      <Header />
      <main>
      <PageHero
        eyebrow="service-area"
        title={
          <>
            Serving the <span className="text-primary">Gulf Coast</span> &amp; Panhandle
          </>
        }
        description="Based on the Gulf Coast, A Plus Insulation travels throughout Northwest Florida to keep homes comfortable and power bills low. If you're nearby, give us a call."
      />

      {/* Map + coverage */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="A Plus Insulation service area map covering the Florida Panhandle"
                src="https://www.google.com/maps?q=Florida%20Panhandle%20Gulf%20Coast&output=embed"
                className="w-full h-80 md:h-[28rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm uppercase tracking-widest text-primary font-semibold">Coverage Area</span>
              </div>
              <h2 className="font-heading uppercase text-3xl md:text-4xl text-foreground mb-5 text-balance leading-tight">
                Local crews, quick response
              </h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                We cover communities across Northwest Florida&apos;s 850 region, plus nearby towns across the
                Alabama and Georgia state lines. Not sure if you&apos;re in our zone? Reach out — if we can help, we will.
              </p>
              <ul className="space-y-3 mb-8">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="tel:8502092636"
                className="inline-flex items-center gap-3 rounded-xl bg-secondary text-secondary-foreground px-6 py-4"
              >
                <Phone className="w-6 h-6" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide">Check availability</span>
                  <span className="font-heading text-2xl leading-none">850-209-2636</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="border-t border-border bg-card py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Communities We Serve</span>
            <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mt-4 text-balance leading-tight">
              Towns across the coast &amp; state line
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {regions.map((region) => (
              <div key={region.name} className="p-6 rounded-xl bg-background border border-border">
                <h3 className="font-heading uppercase tracking-wide text-xl text-primary mb-5">{region.name}</h3>
                <ul className="space-y-3">
                  {region.cities.map((city) => (
                    <li key={city} className="flex items-center gap-3 text-foreground">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6 text-pretty">
              Don&apos;t see your town? We regularly travel beyond these areas — just ask.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-6 font-semibold uppercase tracking-wide"
            >
              <Link href="/contact">Request Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQ faqs={serviceAreaFaqs} heading="Service area FAQs" />

      <CTA />
      </main>
      <Footer />
    </div>
  )
}
