import type React from "react"
import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { JsonLd } from "@/components/json-ld"
import { SITE_URL, business, localBusinessSchema } from "@/lib/site-config"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "A Plus Insulation | Spray Foam & Insulation, Panama City FL",
    template: "%s | A Plus Insulation",
  },
  description:
    "A Plus Insulation installs spray foam, blown-in fiberglass, cellulose & batt insulation across Panama City and the Florida Gulf Coast. Free estimates — call 850-209-2636.",
  applicationName: business.name,
  keywords: [
    "insulation contractor Panama City",
    "spray foam insulation Panama City FL",
    "blown-in insulation Gulf Coast",
    "attic insulation Florida Panhandle",
    "closed cell spray foam",
    "mobile home insulation",
    "insulation companies near me",
    "insulation contractor near me",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: business.name,
    title: "A Plus Insulation | Spray Foam & Insulation, Panama City FL",
    description:
      "Spray foam, blown-in, and batt insulation done right the first time. Serving Panama City and the Florida Gulf Coast. Free estimates.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "A Plus Insulation service trucks on the Gulf Coast" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Plus Insulation | Spray Foam & Insulation, Panama City FL",
    description: "Spray foam, blown-in, and batt insulation across Panama City and the Florida Gulf Coast. Free estimates.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Panama City",
    "geo.position": `${business.geo.lat};${business.geo.lng}`,
    ICBM: `${business.geo.lat}, ${business.geo.lng}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased`}>
        <JsonLd data={localBusinessSchema()} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
