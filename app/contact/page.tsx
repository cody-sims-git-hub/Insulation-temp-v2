import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { FAQ } from "@/components/faq"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, faqPageSchema } from "@/lib/site-config"
import { contactFaqs } from "@/lib/faqs"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact & Free Insulation Estimate",
  description:
    "Get a free insulation estimate from A Plus Insulation. Call 850-209-2636 or send a message. Serving Panama City and the Florida Gulf Coast, Mon–Sat.",
  alternates: { canonical: "/contact" },
}

const hours = [
  { day: "Monday – Friday", time: "7am – 6pm" },
  { day: "Saturday", time: "8am – 2pm" },
  { day: "Sunday", time: "Closed" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqPageSchema(contactFaqs),
        ]}
      />
      <Header />
      <main>
      <PageHero
        eyebrow="contact"
        title={
          <>
            Get your <span className="text-primary">free estimate</span>
          </>
        }
        description="Ready to lower your power bills? Tell us about your project and we'll get right back to you. Prefer to talk? Give us a call — we're always happy to help."
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading uppercase text-2xl md:text-3xl text-foreground mb-6 text-balance leading-tight">
                Talk to A Plus Insulation
              </h2>

              <div className="space-y-5">
                <a
                  href="tel:8502092636"
                  className="flex items-start gap-4 group"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/15 group-hover:bg-primary transition-colors">
                    <Phone className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">Call us</span>
                    <span className="font-heading text-xl text-foreground">850-209-2636</span>
                  </span>
                </a>

                <a
                  href="mailto:info@aplusinsulation.com"
                  className="flex items-start gap-4 group"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/15 group-hover:bg-primary transition-colors">
                    <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">Email us</span>
                    <span className="text-lg text-foreground">info@aplusinsulation.com</span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/15">
                    <MapPin className="h-5 w-5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">Service area</span>
                    <span className="text-lg text-foreground">Gulf Coast &amp; Florida Panhandle</span>
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-10 p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="font-heading uppercase tracking-wide text-base text-foreground">Business Hours</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  {hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="text-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ faqs={contactFaqs} heading="Free estimate FAQs" />
      </main>
      <Footer />
    </div>
  )
}
