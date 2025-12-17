import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWIFT TERMINAL - AUTHORIZED ACCESS ONLY",
  description: "SYSTEM SECURE // ENCRYPTED CONNECTION ESTABLISHED. UNAUTHORIZED ACCESS ATTEMPTS WILL BE LOGGED AND TRACED.",
  openGraph: {
    title: "SWIFT TERMINAL - AUTHORIZED ACCESS ONLY",
    description: "SYSTEM SECURE // ENCRYPTED CONNECTION ESTABLISHED. UNAUTHORIZED ACCESS ATTEMPTS WILL BE LOGGED AND TRACED.",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWIFT TERMINAL - AUTHORIZED ACCESS ONLY",
    description: "SYSTEM SECURE // ENCRYPTED CONNECTION ESTABLISHED. UNAUTHORIZED ACCESS ATTEMPTS WILL BE LOGGED AND TRACED.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/swiftgreen.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
