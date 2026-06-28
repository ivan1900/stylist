import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
