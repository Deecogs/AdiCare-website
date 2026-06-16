import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { LeadModal } from "../components/lead";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://adicare.example.com";
const TITLE = "Adicare — The AI-Native Healthcare Platform for Modern Practice";
const DESCRIPTION =
  "Adicare turns your paper prescriptions into clinical-grade digital records — instantly. An AI-native healthcare platform that scribes, parses, summarises, and follows up, so doctors stay focused on the patient.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Adicare",
  keywords: [
    "Adicare",
    "AI healthcare platform",
    "smart prescription pad",
    "clinical decision support",
    "EMR India",
    "ABDM compliant",
    "AI medical scribe",
    "OPD software",
    "digital prescriptions",
  ],
  authors: [{ name: "Deecogs Technology Pvt Ltd" }],
  creator: "Adicare",
  publisher: "Deecogs Technology Pvt Ltd",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Adicare",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@adicare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#0a0b14",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Adicare",
      legalName: "Deecogs Technology Pvt Ltd",
      parentOrganization: { "@type": "Organization", name: "Deecogs Technology Pvt Ltd" },
      url: SITE_URL,
      slogan: "The AI-native healthcare platform for modern practice",
      foundingLocation: "Bengaluru, India",
      areaServed: "IN",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Adicare",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      name: "Adicare",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS, Android",
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "1999",
        priceCurrency: "INR",
        description: "Adicare Rx-01 smart prescription pad — pre-order",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <LeadModal />
      </body>
    </html>
  );
}
