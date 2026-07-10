import { Home, Layers, Wind, Building2, PaintRoller, DoorClosed, Hammer, Trash2 } from "lucide-react"

const services = [
  {
    icon: Wind,
    title: "Spray Foam",
    description: "High-performance open and closed-cell spray foam that seals gaps and maximizes energy efficiency.",
  },
  {
    icon: Layers,
    title: "Blown Fiberglass",
    description: "Blown-in fiberglass for attics and walls that adds consistent R-value coverage fast.",
  },
  {
    icon: Home,
    title: "Mobile Home Insulation",
    description: "Specialized insulation solutions built for manufactured and mobile homes.",
  },
  {
    icon: PaintRoller,
    title: "Wall Spray Cellulose",
    description: "Dense-pack cellulose sprayed into walls for superior thermal and sound control.",
  },
  {
    icon: Building2,
    title: "Blown Cellulose",
    description: "Eco-friendly blown cellulose that fills every cavity for lower energy loss.",
  },
  {
    icon: Layers,
    title: "Roll & Batt",
    description: "Traditional roll-batt insulation for attics, walls, floors, and crawl spaces.",
  },
  {
    icon: DoorClosed,
    title: "Garage Doors",
    description: "Insulated garage door solutions to cut heat transfer in your garage.",
  },
  {
    icon: Trash2,
    title: "Drywall Removal & Disposal",
    description: "Full drywall removal and clean disposal to prep your space for new insulation.",
  },
]

export function Features() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <Hammer className="w-4 h-4 text-primary" />
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Our Services</span>
          </div>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mb-5 text-balance leading-tight">
            Complete insulation services for every job
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From new construction to retrofits, A Plus Insulation handles residential, mobile home, and commercial
            projects across the Gulf Coast.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-md bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading uppercase tracking-wide text-lg text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
