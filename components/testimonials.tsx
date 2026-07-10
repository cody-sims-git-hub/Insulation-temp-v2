"use client"

import { useState } from "react"
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react"

const testimonials = [
  {
    stars: 5,
    quote:
      "A Plus sprayed foam in our attic and the difference was immediate. Our upstairs used to be unbearable in summer — now it stays cool and our power bill dropped noticeably. Professional crew, clean work, fair price.",
    author: "Robert M.",
    location: "Panama City, FL",
    initials: "RM",
  },
  {
    stars: 5,
    quote:
      "They re-insulated our mobile home with blown-in cellulose. Punctual, friendly, and they cleaned up everything when they were done. The house is quieter and way more comfortable now.",
    author: "Denise T.",
    location: "Lynn Haven, FL",
    initials: "DT",
  },
  {
    stars: 5,
    quote:
      "Got a free estimate the same week I called and the price beat two other quotes. The batt insulation they installed in our new build looks great and passed inspection with no issues.",
    author: "Carlos R.",
    location: "Callaway, FL",
    initials: "CR",
  },
  {
    stars: 5,
    quote:
      "Honest, hard-working folks. They explained exactly what we needed instead of upselling us. Our energy bills are down and the whole house feels better balanced. Highly recommend A Plus.",
    author: "Angela W.",
    location: "Springfield, FL",
    initials: "AW",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="reviews" className="py-20 md:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Reviews</span>
          </div>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mb-5 text-balance leading-tight">
            What our customers say
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Homeowners across the Gulf Coast trust A Plus Insulation to get the job done right.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-background rounded-2xl p-8 md:p-12 border border-border">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[current].stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 text-pretty">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                <span className="font-heading text-lg text-primary">{testimonials[current].initials}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonials[current].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border bg-background hover:border-primary flex items-center justify-center transition-colors"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border bg-background hover:border-primary flex items-center justify-center transition-colors"
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
