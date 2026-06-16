import type { MetadataRoute } from "next";
import { ARTICLES } from "../components/resources";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://adicare.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/resources/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
