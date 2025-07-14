import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import ConnectWalletButton from "@/components/ConnectWalletButton"; // 👈 importa el botón

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NomadPass - Digital Identity for Everyone",
  description: "Empowering the unbanked with digital identity, payments and more",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <div className="w-full flex justify-end p-4">
          {/* <ConnectWalletButton onConnected={(address) => console.log('Wallet connected:', address)} /> */}
          <ConnectWalletButton/>
        </div>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
