import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThriveConnect",
  description: "FACEIT stats viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-t from-[#0A1B3A] via-[#102857] to-[#183A7A] text-gray-100">
        {children}
      </body>
    </html>
  );
}
