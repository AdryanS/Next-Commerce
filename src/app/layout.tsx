import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations"
import Navbar from "@/components/Navbar";

import HydrateComponent from "@/components/Hydrate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next E-Commerce 14",
  description: "Next E-Commerce usando next 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={clsx(inter.className, "bg-slate-700")}>
          <HydrateComponent>
            <Navbar />
            <main className="h-screen pt-16 px-8">{children}</main>
          </HydrateComponent>
        </body>
      </html>
    </ClerkProvider>
  );
}
