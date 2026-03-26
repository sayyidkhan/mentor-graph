import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentor Graph",
  description:
    "Identify the best mentors that shape your thinking from your AI conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
