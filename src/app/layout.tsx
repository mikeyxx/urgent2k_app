import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/navbarComp/Navbar";
import UtilsContextProvider from "@/context/UtilsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urgent2k App",
  description: "Earn money with your skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UtilsContextProvider>
          <Navbar />
          <main>{children}</main>
        </UtilsContextProvider>
      </body>
    </html>
  );
}
