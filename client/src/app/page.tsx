"use client";
import Weather from "@/components/Weather"
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";

export default function Page() {
  const { theme } = useTheme();

  return (
    <body className={ `bg-gradient-to-br ${theme === 'light' ? 'from-teal-200 to-pink-100' : 'from-purple-900 to-blue-900'} flex items-center justify-center min-h-screen` }>
      <ThemeSwitcher/>
      <Weather/>
    </body>
  )
}