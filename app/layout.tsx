import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from "@/components/page-transition";
import { NavigationGuard } from "@/components/navigation-guard";
import { Analytics } from "@/components/analytics";
import AuthListenerWrapper from "@/components/AuthListenerWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cryptobotpro.com"),
  title: "CryptoBot Pro - Automated Cryptocurrency Trading",
  description:
    "Professional cryptocurrency trading bot with advanced automation and proven profitability.",
  keywords:
    "crypto trading bot, automated trading, cryptocurrency, bitcoin trading, crypto automation",
  authors: [{ name: "CryptoBot Pro Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cryptobotpro.com",
    siteName: "CryptoBot Pro",
    title: "CryptoBot Pro - Automated Cryptocurrency Trading",
    description:
      "Professional cryptocurrency trading bot with advanced automation and proven profitability.",
    images: [
      {
        url: "https://cryptobotpro.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CryptoBot Pro Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoBot Pro - Automated Cryptocurrency Trading",
    description:
      "Professional cryptocurrency trading bot with advanced automation and proven profitability.",
    images: ["https://cryptobotpro.com/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1b1e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="cryptobot-theme"
        >
          <AuthListenerWrapper>
            <NavigationGuard>
              <PageTransition>{children}</PageTransition>
            </NavigationGuard>
          </AuthListenerWrapper>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
