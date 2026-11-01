import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/projects";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...caseStudies.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/data-projects.html`, lastModified: now, priority: 0.7 },
  ];
}
