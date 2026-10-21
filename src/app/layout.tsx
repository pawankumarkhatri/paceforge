import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/providers";
import { PwaRegister } from "@/components/pwa-register";
import { VercelInsights } from "@/components/vercel-insights";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const headingFont = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const devanagariFont = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "PaceForge — VDOT Marathon Engine",
    template: "%s · PaceForge",
  },
  description:
    "VDOT-first marathon PWA: predict every distance from one race, plus pace bands, splits, fueling, and training tools. English & Hindi. Offline-ready.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "PaceForge",
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN", "en_US"],
    siteName: "PaceForge",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${bodyFont.variable} ${headingFont.variable} ${devanagariFont.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-clip">
        <Providers>
          <PwaRegister />
          <AppShell>{children}</AppShell>
          <VercelInsights />
        </Providers>
      </body>
    </html>
  );
}
