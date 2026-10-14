import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
