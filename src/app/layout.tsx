import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ProgressProvider } from "@/Providers/progressProvider";
import LoadingBarComponent from "@/components/LoadingBarComponent";
import Footer from "@/components/Footer";

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
            {children}
          </div>
          <Footer />
        </ProgressProvider>
        </main>
      </body>
    </html>
  );
}
