import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoveWorld Music Week | Global Worship Experience",
  description: "The official digital hub for LoveWorld Music Week. Access daily resources, event info, and giving opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}