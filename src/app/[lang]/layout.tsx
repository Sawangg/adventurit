import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SG — 2024",
  description: "",
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang} className="overflow-x-hidden scroll-smooth bg-[#09090b]">
      <body
        className={`grid min-h-screen min-w-screen grid-rows-[auto_1fr_auto] overflow-x-hidden p-2 text-white ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
