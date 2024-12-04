import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-teal-200 to-pink-100 flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}