import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
const display = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const metadata: Metadata = {
  title: "Classic Ontario Limo | Premium Airport & Executive Chauffeur Service in Toronto & GTA",
  description: "Classic Ontario Limo — luxury airport limo and executive chauffeur service across Toronto, Mississauga and the GTA. Flat rates, 24/7 availability. Call +1 (416) 824-7400.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-CA" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}
