import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luis Fernando Boff | Desenvolvedor Full Stack & Data Scientist",
    template: "%s | Luis Fernando"
  },
  description: "Desenvolvedor especializado em energia solar, aplicativos, ERP, landing pages e data science. Criando soluções inteligentes com Next.js, Python, TypeScript e mais.",
  keywords: [
    "desenvolvedor full stack",
    "energia solar",
    "data science",
    "aplicativos",
    "ERP",
    "landing pages",
    "Next.js",
    "Python",
    "TypeScript",
    "React",
    "desenvolvimento web"
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
    url: "https://luisfernando.dev",
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://luisfernando.dev" />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white`}>
        {children}

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
