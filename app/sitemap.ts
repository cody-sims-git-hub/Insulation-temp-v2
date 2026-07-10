import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const changeFrequency = "monthly" as const

  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/service-area", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.6 },
  ]

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency,
    priority: route.priority,
  }))
}
