import type { Locale } from "@lib/getDictionnary";
import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Adventur'IT — SG",
  description: "Société Générale's Adventur'IT game",
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html
      lang={params.lang}
      className={`overflow-hidden scroll-smooth bg-[var(--primary)] text-white ${inter.className}`}
    >
      {children}
    </html>
  );
}
