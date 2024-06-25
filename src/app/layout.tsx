import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ProgressProvider } from "@/Providers/progressProvider";
import LoadingBarComponent from "@/components/LoadingBarComponent";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokéWonk",
  description: "A frontend client for the official PokéAPI",
  icons: "/logo.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] min-h-screen">
        <ProgressProvider>
          <LoadingBarComponent />
          <Navbar />
          <div className="min-h-screen">
          <div className="text-white flex flex-col items-center justify-center gap-5 pt-3">
            <Link href={"/"}>
                <div className="flex items-center justify-center gap-3">
                <h1 className="text-center text-2xl font-bold">PokéWonk</h1>
                <Image src="/logo.svg" alt="logo" width={30} height={30}></Image>
                </div>
              </Link>
              <p className="text-center text-xl">A pokédex built using the pokéAPI</p>
            </div>
            {children}
          </div>
          <Footer />
        </ProgressProvider>
        </main>
      </body>
    </html>
  );
}
