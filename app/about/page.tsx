import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, faqPageSchema } from "@/lib/site-config"
import { aboutFaqs } from "@/lib/faqs"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Users, ThumbsUp, Clock, Award, Leaf } from "lucide-react"

export const metadata: Metadata = {
  title: "About Our Gulf Coast Insulation Team",
  description:
    "A Plus Insulation is a locally owned, licensed and insured insulation contractor serving Panama City and the Florida Panhandle for 20+ years. Meet our team and values.",
  alternates: { canonical: "/about" },
}

const stats = [
  { value: "20+", label: "Years in business" },
  { value: "2,500+", label: "Homes insulated" },
  { value: "100%", label: "Licensed & insured" },
  { value: "5★", label: "Average review" },
]

const values = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    body: "Every job is completed by trained, insured professionals who treat your home with respect.",
  },
  {
    icon: ThumbsUp,
    title: "Honest Estimates",
    body: "Free, transparent quotes with no pressure and no hidden fees — ever.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    body: "We show up when we say we will and finish the job on schedule.",
  },
  {
    icon: Award,
    title: "Quality Materials",
    body: "We only install trusted, high-performance insulation products built to last.",
  },
  {
    icon: Leaf,
    title: "Energy Savings",
    body: "Our whole goal: a more comfortable home and a lower power bill for your family.",
  },
  {
    icon: Users,
    title: "Local & Family Owned",
    body: "We live and work here on the Gulf Coast, and we stand behind every install.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          faqPageSchema(aboutFaqs),
        ]}
      />
      <Header />
      <main>
      <PageHero
        eyebrow="about"
        title={
          <>
            Your local <span className="text-primary">insulation</span> experts
          </>
        }
        description="A Plus Insulation was built on a simple promise: quality work, fair prices, and lower power bills for every customer we serve."
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src="/aplus-hero-trucks.jpg"
                alt="A Plus Insulation branded service trucks parked in front of a coastal home"
                className="w-full h-80 md:h-[28rem] object-cover"
              />
            </div>
            <div>
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">Our Story</span>
              <h2 className="font-heading uppercase text-3xl md:text-4xl text-foreground mt-4 mb-5 text-balance leading-tight">
                For all your insulation needs
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground text-pretty">
                <p>
                  We started A Plus Insulation to give Gulf Coast homeowners a contractor they could actually count on —
                  one that answers the phone, shows up on time, and does the job right the first time.
                </p>
                <p>
                  From spray foam and blown-in fiberglass to cellulose, roll & batt, and mobile home insulation, our
                  fully equipped crews handle projects of every size. We take pride in clean job sites, quality
                  materials, and real energy savings you can feel.
                </p>
                <p>
                  Today our trucks are a familiar sight across the region, and our reputation is built one satisfied
                  neighbor at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl text-primary mb-1">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Why Homeowners Trust Us</span>
            <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mt-4 text-balance leading-tight">
              Built on doing right by our neighbors
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-md bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <value.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading uppercase tracking-wide text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-6 font-semibold uppercase tracking-wide"
            >
              <Link href="/contact">Work With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQ faqs={aboutFaqs} heading="About A Plus Insulation" />

      <CTA />
      </main>
      <Footer />
    </div>
  )
}
