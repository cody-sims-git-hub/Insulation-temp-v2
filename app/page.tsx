import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LogoCloud } from "@/components/logo-cloud"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { faqPageSchema } from "@/lib/site-config"
import { homeFaqs } from "@/lib/faqs"

export default function APlusInsulationLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <Header />
      <main>
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      </main>
      <Footer />
    </div>
  )
}
