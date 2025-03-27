import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import WagmiClientWrapper from "@/components/wagmi-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CookieBanner from "@/components/layout/cookie-banner";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/layout/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Knight | A Web3 Game",
  description: "Start your adventure and collect coins. Trade them for epic items and make your knight stronger",
  authors: [{ name: `Paul Simroth`, url: `https://www.paulsimroth.at/` }],
  creator: `Paul Simroth`,
  publisher: `Paul Simroth`,
  openGraph: {
    title: "Crypto Knight | A Web3 Game",
    description: `Start your adventure and collect coins. Trade them for epic items and make your knight stronger`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "Crypto Knight | A Web3 Game",
    type: "website",
    locale: "en"
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    noimageindex: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    }
  },
  verification: {
    google: "",
  },
  icons: {
    icon: "/favicon.ico?v=1",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <WagmiClientWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
            <Toaster />
            <CookieBanner />
          </ThemeProvider>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </body>
      </WagmiClientWrapper>
    </html>
  );
}
