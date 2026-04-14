import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    // This allows pages to export just `title: "Workflows"`
    // and it will render as "Workflows | Synapse"
    template: "%s | Synapse",
    // This is the fallback for the home page (/)
    default: "Synapse | Automate your work, beautifully.",
  },
  description:
    "Connect your favorite apps and automate your workflows with Synapse's powerful, drag-and-drop visual canvas.",

  // Optional but highly recommended: OpenGraph for rich link previews in Slack/Discord/Twitter
  openGraph: {
    title: "Synapse",
    description: "Connect your favorite apps and automate your workflows.",
    type: "website",
    siteName: "Synapse",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider>
          {children}
          <Toaster richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
