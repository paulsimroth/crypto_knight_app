import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import WagmiClientWrapper from "@/components/wagmi-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CookieBanner from "@/components/layout/cookie-banner";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/layout/google-analytics";
import "./globals.css";

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
          className='h-[100vh] flex flex-col items-center justify-between'
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-between">
              <Navbar />
              <main className='flex flex-col items-center justify-center bg-background h-fit'>
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
            <CookieBanner />
          </ThemeProvider>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </body>
      </WagmiClientWrapper>
    </html>
  );
}
