"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  systemTheme: Theme
  isSystemTheme: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [systemTheme, setSystemTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const detectedSystemTheme = mediaQuery.matches ? "dark" : "light"
    setSystemTheme(detectedSystemTheme)
    
    // Check for saved preference
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const initialTheme = savedTheme || detectedSystemTheme

    setThemeState(initialTheme)
    applyTheme(initialTheme)

    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light"
      setSystemTheme(newSystemTheme)
      
      // If user hasn't set a preference, follow system
      if (!localStorage.getItem("theme")) {
        setThemeState(newSystemTheme)
        applyTheme(newSystemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    
    root.setAttribute("data-theme", newTheme)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Prevent flash of incorrect theme
  if (!mounted) {
    return <>{children}</>
  }

  const isSystemTheme = !localStorage.getItem("theme")

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        setTheme, 
        systemTheme,
        isSystemTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
