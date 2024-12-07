import type { Metadata } from "next";
import "@/assets/globals.css";

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //we're keeping layout a server component, body is inside a client component for theme changing
  return (
    <html lang="en">
      {children}
    </html>
  );
}