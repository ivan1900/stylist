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
  title: "Stylist - Virtual Try-On Fashion App",
  description: "See how clothes look on you with AI-powered virtual try-ons. Upload your photo, choose any outfit, and get instant photorealistic previews. Try before you buy.",
  keywords: "virtual try-on, fashion app, clothes preview, AI fashion, online shopping",
  openGraph: {
    title: "Stylist - Transform Your Fashion Game",
    description: "See how clothes look on you instantly with AI-powered virtual try-ons",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
