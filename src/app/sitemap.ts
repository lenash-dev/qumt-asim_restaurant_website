import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...nav.map((item) => item.href), "/reservas"].map((href) => ({
    url: new URL(href, site.url).toString(),
    changeFrequency: "weekly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
