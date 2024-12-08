import type { Metadata } from "next";
import "@/assets/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //we want to keep layout a server component, so body is inside a client component (page.tsx) for theme switching purpose
  return (
    <html lang="en"> 
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </html>
  );
}