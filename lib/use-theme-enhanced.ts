"use client"

import { useTheme as useThemeContext } from "@/lib/contexts/theme-context"

/**
 * Enhanced useTheme hook with additional utilities
 * 
 * @example
 * const { theme, toggleTheme, setTheme, isDark, systemTheme } = useTheme()
 */
export function useTheme() {
  const context = useThemeContext()
  
  return {
    ...context,
    isDark: context.theme === "dark",
    isLight: context.theme === "light",
    systemTheme: typeof window !== "undefined" 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : "light"
  }
}
