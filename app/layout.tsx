// To enable cookie consent for Clarity tracking, call Clarity.consent(true) or Clarity.consent(false) after initialization if required by your privacy policy.
// To prioritize session recording, use Clarity.upgrade('reason') when a special event occurs.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PersonStructuredData, OrganizationStructuredData, WebSiteStructuredData } from "@/components/StructuredData";
import ModernNavbarWrapper from "@/components/ModernNavbarWrapper";
import { ClarityInit, ChatBot } from "@/components/DynamicComponents";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://luisfboff.com'),
  title: {
    default: "Luis Fernando Boff | Desenvolvedor Full Stack & Data Scientist",
    template: "%s | Luis Fernando"
  },
  description: "Luis Fernando Boff - Especialista em Energia Solar e Desenvolvedor Full Stack. Projetos de sistemas fotovoltaicos, aplicativos web com Next.js e análise de dados com Python. São Paulo, Brasil.",
  keywords: [
    "energia solar Brasil",
    "energia fotovoltaica",
    "desenvolvedor full stack São Paulo",
    "desenvolvedor Next.js",
    "cientista de dados Python",
    "machine learning",
    "portfolio desenvolvedor",
    "projetos energia solar",
    "sistemas fotovoltaicos",
    "desenvolvimento web Brasil",
    "React",
    "TypeScript",
    "data science"
  ],
  authors: [{ name: "Luis Fernando" }],
  creator: "Luis Fernando",
  publisher: "Luis Fernando",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://luisfboff.com",
    title: "Luis Fernando | Desenvolvedor Full Stack & Data Scientist",
    description: "Desenvolvedor especializado em energia solar, aplicativos, ERP, landing pages e data science.",
    siteName: "Luis Fernando Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luis Fernando - Desenvolvedor Full Stack"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Fernando | Desenvolvedor Full Stack & Data Scientist",
    description: "Desenvolvedor especializado em energia solar, aplicativos, ERP, landing pages e data science.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://luisfboff.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
      </head>
  <body className={`${inter.className} antialiased bg-black text-[var(--foreground)]`}>
        <ClarityInit />
        <PersonStructuredData />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
  <ModernNavbarWrapper />
        {children}
        <ChatBot />
        <GoogleAnalytics />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
