import Weather from "@/components/Weather"
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from '@/context/ThemeContext';

export default function Page() {
  return (
    <ThemeProvider>
      <body className="bg-gradient-to-br from-teal-200 to-pink-100 flex items-center justify-center min-h-screen">
        <ThemeSwitcher/>
        <Weather/>
      </body>
    </ThemeProvider>
  )
}