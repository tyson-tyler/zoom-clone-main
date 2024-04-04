import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/cursor";
import { ClerkProvider } from "@clerk/nextjs";
import {shadesOfPurple} from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";

import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mypager",
  description: "video calling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: shadesOfPurple,
          }}
        >
          <Toaster />
          <Cursor />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
