import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Lato } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/contexts/auth-context"
import { ThemeProvider } from "@/lib/contexts/theme-context"
import { PageTransition } from "@/components/page-transition"
import { ConditionalLayout } from "@/components/conditional-layout"
import { themeScriptMinified } from "@/lib/theme-script"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Ìbáṣepọ̀ Connected Hearts - Faith-Based Coaching & Consultancy",
    template: "%s | Connected Hearts",
  },
  description:
    "Guiding families toward peace, purpose, and legacy through faith-based coaching and consultancy services. Expert marriage counseling, pre-marital coaching, and family therapy rooted in biblical principles.",
  keywords: [
    "faith-based coaching",
    "marriage counseling",
    "family therapy",
    "pre-marital coaching",
    "relationship coaching",
    "biblical counseling",
    "Christian coaching",
    "family consultancy",
  ],
  authors: [{ name: "Elizabeth Omolara" }],
  creator: "Elizabeth Omolara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://connectedhearts.com",
    title: "Ìbáṣepọ̀ Connected Hearts - Faith-Based Coaching & Consultancy",
    description:
      "Guiding families toward peace, purpose, and legacy through faith-based coaching and consultancy services.",
    siteName: "Connected Hearts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ìbáṣepọ̀ Connected Hearts",
    description: "Faith-based coaching and consultancy for stronger relationships",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScriptMinified }} />
      </head>
      <body className={`${montserrat.variable} ${lato.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <PageTransition>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </PageTransition>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
