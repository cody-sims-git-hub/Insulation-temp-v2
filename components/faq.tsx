"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import type { FaqItem } from "@/lib/site-config"
import { homeFaqs } from "@/lib/faqs"

interface FAQProps {
  faqs?: FaqItem[]
  heading?: string
  intro?: ReactNode
}

export function FAQ({ faqs = homeFaqs, heading = "Frequently asked questions", intro }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">FAQ</span>
          </div>
          <h2 className="font-heading uppercase text-3xl md:text-5xl text-foreground mb-5 text-balance leading-tight">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground">
            {intro ?? (
              <>
                Have a question that isn&apos;t answered here? Call us at{" "}
                <a href="tel:8502092636" className="text-primary font-semibold">
                  850-209-2636
                </a>
                .
              </>
            )}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-xl overflow-hidden bg-card">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
