import { BadgeCheck, PiggyBank, Clock, MapPin } from "lucide-react"

const items = [
  { icon: BadgeCheck, title: "Licensed & Insured", text: "Fully certified insulation crews" },
  { icon: PiggyBank, title: "Free Estimates", text: "No-cost, no-obligation quotes" },
  { icon: Clock, title: "Fast Turnaround", text: "Most jobs done in a day" },
  { icon: MapPin, title: "Gulf Coast Local", text: "Serving the panhandle for 15+ years" },
]

export function LogoCloud() {
  return (
    <section className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-11 h-11 shrink-0 rounded-md bg-primary/15 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading uppercase tracking-wide text-base text-foreground leading-tight">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
