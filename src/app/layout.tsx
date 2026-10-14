import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, Manrope } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.legalName,
  },
};

export const viewport: Viewport = {
  themeColor: "#220304",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.legalName,
  url: site.url,
  servesCuisine: ["Boliviana", "Andina"],
  telephone: site.contact.phone,
  email: site.contact.email,
  address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: site.contact.city },
  menu: `${site.url}/menu`,
  acceptsReservations: true,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${anton.variable} ${instrumentSerif.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <SmoothScroll />
          <AmbientBackground />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
