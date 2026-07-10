import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, ShieldCheck, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-6">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Licensed &amp; Insured · Free Estimates</span>
            </div>

            <h1 className="font-heading uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              For all your <span className="text-primary">insulation</span> needs
            </h1>

            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty">
              Spray foam, blown-in, and batt insulation done right the first time. Keep your home comfortable
              year-round and <span className="text-secondary font-semibold">reduce your power bills</span> across the
              Gulf Coast.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-6 text-base font-semibold uppercase tracking-wide"
              >
                <a href="#estimate">
                  Get a Free Estimate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md px-8 py-6 text-base font-semibold uppercase tracking-wide border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                <a href="tel:8502092636">
                  <Phone className="w-5 h-5 mr-2" />
                  850-209-2636
                </a>
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">5.0</span> from local reviews
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-heading text-2xl text-primary">15+</span> years in business
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-heading text-2xl text-primary">2,000+</span> homes insulated
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/40">
              <img
                src="/aplus-hero-trucks.jpg"
                alt="A Plus Insulation service trucks parked in front of a home"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 sm:left-6 bg-secondary text-secondary-foreground rounded-xl px-5 py-4 shadow-xl max-w-[15rem]">
              <p className="font-heading uppercase text-lg leading-tight">Reduce your power bills</p>
              <p className="text-xs font-medium mt-1">Better insulation = lower monthly energy costs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
