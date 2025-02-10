import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryProvider } from "@/components/query-provider";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pathfinder",
  description: "A revolutionary way to book travel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <Script
          id="custom-script"
          src="https://mn-tz.com/Mzg2Mjkz.js?t=386293"
          strategy="lazyOnload"
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider>{children}</SidebarProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
