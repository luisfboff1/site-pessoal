// To enable cookie consent for Clarity tracking, call Clarity.consent(true) or Clarity.consent(false) after initialization if required by your privacy policy.
// To prioritize session recording, use Clarity.upgrade('reason') when a special event occurs.
import type { Metadata } from "next";
import ClarityInit from "@/components/ClarityInit";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PersonStructuredData, OrganizationStructuredData, WebSiteStructuredData } from "@/components/StructuredData";
import ChatBot from "@/components/ChatBot";
import ModernNavbarWrapper from "@/components/ModernNavbarWrapper";
import Plasma from '@/components/Plasma';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
  <body className={`${inter.className} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <ClarityInit />
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Plasma color="#0ea5a4" speed={0.5} direction="forward" scale={1.1} opacity={0.08} mouseInteractive={false} />
        </div>
        <PersonStructuredData />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
  <ModernNavbarWrapper />
        {children}
        <ChatBot />
        <GoogleAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
