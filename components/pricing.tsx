import { Check } from "lucide-react"

const benefits = [
  {
    title: "Lower Energy Bills",
    description: "Properly installed insulation blocks heat transfer so your HVAC works less and you pay less.",
  },
  {
    title: "Year-Round Comfort",
    description: "No more hot upstairs or freezing rooms — consistent, even temperatures throughout your home.",
  },
  {
    title: "Quality Materials",
    description: "We use trusted spray foam, fiberglass, and cellulose products rated for Gulf Coast conditions.",
  },
  {
    title: "Experienced Crews",
    description: "Over 15 years and thousands of homes insulated across the panhandle — we know local homes.",
  },
  {
    title: "Clean, Respectful Work",
    description: "We protect your space, clean up completely, and haul away old materials when needed.",
  },
  {
    title: "Honest, Upfront Pricing",
    description: "Free detailed estimates with no pressure and no surprise charges after the job.",
  },
]

export function Pricing() {
  return (
    <section id="why-us" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-black/30">
              <img
                src="/why-us-insulation.jpg"
                alt="Bright, well-insulated finished home interior"
                className="w-full h-full object-cover aspect-[4/5] lg:aspect-square"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">Why A Plus</span>
            </div>
            <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mb-6 text-balance leading-tight">
              Insulation that pays for itself
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-3">
                  <div className="w-6 h-6 shrink-0 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
