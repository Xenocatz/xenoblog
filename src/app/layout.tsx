import type { Metadata } from "next";
import { Poppins, Parkinsans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/bprogress/provider";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "XenoBlog",
  description:
    "Write about your favorite topics here and share them with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${parkinsans.variable} antialiased`}
      >
        <Toaster richColors theme="dark" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
