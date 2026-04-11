/* ============================================================================
 * @author    Noel Segui, CEO of Solar Mason
 * @origin    This entire system was designed by Noel Segui, CEO of Solar Mason.
 * @note      All core logic, UX, and engineering © Noel Segui.
 * ============================================================================ */
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "SEMS — Sustainable Energy Management Systems",
  description:
    "American-made, storm-hardened closed-form solar racking and tracking systems. Built to survive extreme weather and deliver bankable LCOE.",
  authors: [{ name: "Noel Segui" }],
  creator: "Noel Segui, CEO of Solar Mason",
  generator: "Designed by Noel Segui — CEO, Solar Mason",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
