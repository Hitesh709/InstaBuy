import type { Metadata } from "next";
import "./tokens.css";
import "../components/ui/primitives.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "InstaBuy — Member-only local commerce",
  description: "A commerce network connecting partner stores with eligible customers through exclusive offers."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
