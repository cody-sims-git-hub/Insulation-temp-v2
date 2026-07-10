"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Check } from "lucide-react"

const services = [
  "Spray Foam",
  "Blown Fiberglass",
  "Mobile Home Insulation",
  "Wall Spray Cellulose",
  "Blown Cellulose",
  "Roll & Batt",
  "Garage Doors",
  "Other",
]

export function CTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="estimate" className="py-20 md:py-28 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mb-5 text-balance leading-tight">
              Get your <span className="text-primary">free estimate</span> today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Tell us about your project and we&apos;ll get back to you fast with a no-obligation quote. Prefer to talk?
              Give us a call — we&apos;re happy to help.
            </p>
            <a
              href="tel:8502092636"
              className="inline-flex items-center gap-3 rounded-xl bg-secondary text-secondary-foreground px-6 py-4"
            >
              <Phone className="w-6 h-6" />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide">Call for fastest service</span>
                <span className="font-heading text-2xl leading-none">850-209-2636</span>
              </span>
            </a>
          </div>

          {/* Form */}
          <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary flex items-center justify-center mb-5">
                  <Check className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading uppercase text-2xl text-foreground mb-2">Request received</h3>
                <p className="text-muted-foreground">
                  Thanks! A member of the A Plus Insulation team will reach out shortly to schedule your free estimate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="(850) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">
                    Service needed
                  </label>
                  <select
                    id="service"
                    className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {services.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-foreground mb-1.5">
                    Project details
                  </label>
                  <textarea
                    id="details"
                    rows={3}
                    className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell us about your home and what you're looking for..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-6 font-semibold uppercase tracking-wide"
                >
                  Request Free Estimate
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No cost, no obligation. We&apos;ll never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
