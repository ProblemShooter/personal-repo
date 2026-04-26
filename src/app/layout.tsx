import type { Metadata } from "next";
import { Orbitron, Syne, JetBrains_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Scene from "@/components/canvas/Scene";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SplashScreen from "@/components/ui/SplashScreen";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Jauhari | Neural Cosmos Portfolio",
  description: "Data, AI/ML, and Software Engineering professional based in Mumbai, Maharashtra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${syne.variable} ${jetbrainsMono.variable} ${rajdhani.variable} antialiased dark`}
    >
      <body className={cn("min-h-screen bg-background font-jetbrains text-foreground antialiased", "dark")}>
        <ScrollToTop />
        <SplashScreen />
        <CustomCursor />
        <SmoothScroll>
          <div className="relative w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <Scene />
            {/* Foreground Content Wrapper */}
            <div className="relative z-10 w-full flex flex-col items-center">
              {children}
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
