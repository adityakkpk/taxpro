import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import SessionProvider from "@/src/app/components/SessionProvider";
import Navbar from "@/src/app/components/layout/Navbar";
import Footer from "@/src/app/components/layout/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AARTax - Professional Tax Services",
  description: "Expert tax consultation and enquiry services",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
