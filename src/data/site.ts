// Central business (NAP) + SEO config. Single source of truth for metadata and
// structured data across the site. This drives canonical + Open Graph / share
// previews, so it must match where the site is actually served. It currently
// lives on the aplus2 preview subdomain; when it goes live on its own domain,
// update this to the production URL.

export const SITE_URL = "https://aplus2.simsdigitalpartners.com"

export const business = {
  name: "A Plus Insulation",
  tagline: "For all your insulation needs",
  phone: "+18502092636",
  phoneDisplay: "850-209-2636",
  email: "info@aplusinsulation.com",
  url: SITE_URL,
  logo: `${SITE_URL}/aplus-logo.jpg`,
  image: `${SITE_URL}/aplus-hero-trucks.jpg`,
  priceRange: "$$",
  foundingYearsInBusiness: "20+",
  // Service-area business anchored in Panama City, FL (Bay County).
  baseCity: "Panama City",
  region: "FL",
  regionName: "Florida",
  geo: { lat: 30.1588, lng: -85.6602 },
  sameAs: ["https://www.facebook.com/profile.php?id=100063585459578"],
  areasServed: [
    "Panama City",
    "Panama City Beach",
    "Lynn Haven",
    "Callaway",
    "Santa Rosa Beach",
    "Freeport",
    "Destin",
    "Fort Walton Beach",
    "Navarre",
    "Miramar Beach",
    "Niceville",
    "Crestview",
    "Pensacola",
    "Pensacola Beach",
    "Gulf Breeze",
    "Milton",
    "Pace",
    "Cantonment",
    // Across the state line — Alabama & Georgia
    "Dothan",
    "Enterprise",
    "Ozark",
    "Geneva",
    "Bainbridge",
    "Donalsonville",
    "Colquitt",
  ],
  services: [
    "Spray Foam Insulation",
    "Blown Fiberglass Insulation",
    "Blown Cellulose Insulation",
    "Wall Spray Cellulose",
    "Roll & Batt Insulation",
    "Mobile Home Insulation",
    "Garage Door Insulation",
    "Drywall Removal & Disposal",
  ],
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],
} as const

export interface FaqItem {
  question: string
  answer: string
}

export interface Crumb {
  name: string
  path: string
}
