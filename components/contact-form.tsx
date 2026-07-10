"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary flex items-center justify-center mb-5">
          <Check className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="font-heading uppercase text-2xl text-foreground mb-2">Message sent</h3>
        <p className="text-muted-foreground">
          Thanks for reaching out! A member of the A Plus Insulation team will get back to you shortly to schedule your
          free estimate.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="(850) 000-0000"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">
            Service needed
          </label>
          <select
            id="service"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-foreground mb-1.5">
          How can we help?
        </label>
        <textarea
          id="details"
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Tell us about your home and project..."
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-6 font-semibold uppercase tracking-wide"
      >
        Send Message
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        No cost, no obligation. We&apos;ll never share your information.
      </p>
    </form>
  )
}
