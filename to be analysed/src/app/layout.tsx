import type { Metadata } from "next";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import UtilityBar from "@/components/layout/UtilityBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import AnnouncementModal from "@/components/layout/AnnouncementModal";
import VirtualTourModal from "@/components/layout/VirtualTourModal";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { logVisitor } from "@/lib/analytics";
import ApplyNowModal from "@/components/layout/ApplyNowModal";
import FacebookPixel from "@/components/analytics/FacebookPixel";
import JourneyTracker from "@/components/analytics/JourneyTracker";
import { Suspense } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

import prisma from "@/lib/db";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import FaqAssistant from "@/components/layout/FaqAssistant";
import NewsHighlight from "@/components/layout/NewsHighlight";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "global" },
    });

    return {
      title: settings?.siteName || "University of East Capital",
      description: settings?.metaDescription || "Unleashing potential, fostering excellence.",
      keywords: settings?.metaKeywords || "university, education, UEC",
      manifest: "/site.webmanifest",
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
          { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [
          { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
        ],
      },
    };
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {
      title: "University of East Capital",
      description: "Unleashing potential, fostering excellence.",
      keywords: "university, education, UEC",
      manifest: "/site.webmanifest",
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
          { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [
          { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
        ],
      },
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log the visit for custom Geo-Analytics
  // We don't await this to avoid blocking the page load
  try {
    logVisitor('/');
  } catch (e) {
    // Ignore build-time errors
  }

  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}>
      <body className={lato.className}>
        <SessionProvider>
          <AnnouncementModal />
          <VirtualTourModal />
          <WhatsAppButton />
          <FaqAssistant />
          <NewsHighlight />
          <Analytics />
          <SpeedInsights />
          <ApplyNowModal />


          <Suspense fallback={null}>
            <FacebookPixel />
            <JourneyTracker />
          </Suspense>
          <UtilityBar />
          <Navbar />
          <div style={{ overflowX: 'hidden', width: '100%' }}>
            {children}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
