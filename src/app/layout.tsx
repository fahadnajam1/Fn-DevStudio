import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FN DevStudio | Building Stellar Web Solutions & AI Integrations",
  description: "FN DevStudio is a premier, forward-thinking web development and AI integration agency. We engineer high-performance, custom web applications and intelligent digital infrastructure.",
  keywords: [
    "Web Development Agency", 
    "AI Integration Services", 
    "Next.js Developer", 
    "Custom Web Applications", 
    "E-Commerce Solutions", 
    "Performance Optimization", 
    "Fahad Najam", 
    "Stellar Web Solutions"
  ],
  authors: [{ name: "Fahad Najam", url: "https://github.com/fahadnajam55" }],
  openGraph: {
    title: "FN DevStudio | Building Stellar Web Solutions & AI Integrations",
    description: "Premier agency bridging software logic and elegant UX with modern web development and AI capabilities.",
    url: "https://fndevstudio.com",
    siteName: "FN DevStudio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FN DevStudio | Building Stellar Web Solutions",
    description: "Premier agency bridging software logic and elegant UX with modern web development and AI capabilities.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
