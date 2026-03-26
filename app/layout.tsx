import "./globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "Mentor Graph — The Sage",
  description:
    "The Sage guides you from AI conversations to a clear mentor graph: who shapes your thinking, across Wealth, Business, Engineering, and Investing — plus insights to choose better mentors.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gray-950 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
