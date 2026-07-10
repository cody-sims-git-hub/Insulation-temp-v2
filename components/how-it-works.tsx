import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    title: "Free On-Site Inspection",
    description:
      "We inspect your attic, walls, and crawl spaces to find where your home is losing energy — then give you a straight-forward, no-obligation estimate.",
    image: "/hiw-inspection.jpg",
    alt: "Framed home interior being assessed for where it loses energy",
  },
  {
    number: "02",
    title: "Professional Installation",
    description:
      "Our certified crew installs the right insulation for the job — spray foam, blown-in, or batt — with clean, careful workmanship every time.",
    image: "/hiw-installation.jpg",
    alt: "Installer air-sealing and insulating around a window during installation",
  },
  {
    number: "03",
    title: "Comfort & Lower Bills",
    description:
      "Enjoy a home that stays comfortable in every season, blocks outside noise, and costs less to heat and cool month after month.",
    image: "/hiw-comfort.jpg",
    alt: "Bright, comfortable finished attic living room",
  },
]

export function HowItWorks() {
  return (
    <section id="process" className="py-20 md:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Our Process</span>
          </div>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mb-5 text-balance leading-tight">
            How we upgrade your insulation
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A simple, three-step process that gets it done right and keeps the heat from seeping into your living space.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}
            >
              <div className="flex-1">
                <span className="font-heading text-6xl md:text-8xl text-primary/25 leading-none">{step.number}</span>
                <h3 className="font-heading uppercase text-2xl md:text-3xl text-foreground mt-3 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{step.description}</p>
                {index === steps.length - 1 && (
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-5 font-semibold uppercase tracking-wide"
                  >
                    <a href="tel:8502092636">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 850-209-2636
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-black/30">
                  <img src={step.image || "/placeholder.svg"} alt={step.alt} className="w-full h-full object-cover aspect-[4/3]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
