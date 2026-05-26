import type { Metadata } from "next";
import { Inter, Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VRTX Studio — Futuristic Creative Agency",
  description:
    "We craft next-generation digital experiences. Award-winning creative agency specializing in web design, branding, motion, and immersive tech.",
  keywords: [
    "creative agency",
    "web design",
    "branding",
    "motion graphics",
    "UI/UX",
    "digital experience",
  ],
  openGraph: {
    title: "VRTX Studio — Futuristic Creative Agency",
    description: "We craft next-generation digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${syne.variable} ${spaceMono.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
