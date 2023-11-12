import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SG — 2024",
  description: "Société Générale's Adventur'IT game",
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html
      lang={params.lang}
      className={`overflow-x-hidden scroll-smooth bg-[var(--primary)] text-white ${inter.className}`}
    >
      {children}
    </html>
  );
}
