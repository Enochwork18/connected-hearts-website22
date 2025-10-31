"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/lib/contexts/theme-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

interface ThemeToggleAdvancedProps {
  showLabel?: boolean
  variant?: "icon" | "dropdown"
  className?: string
}

/**
 * Advanced Theme Toggle Component
 * 
 * Supports:
 * - Light/Dark mode toggle
 * - System preference detection
 * - Accessible keyboard navigation
 * - Optional dropdown for explicit system theme selection
 * 
 * @example
 * <ThemeToggleAdvanced variant="dropdown" showLabel />
 */
export function ThemeToggleAdvanced({ 
  showLabel = false, 
  variant = "icon",
  className 
}: ThemeToggleAdvancedProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, toggleTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch - show neutral icon on server
  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className={className}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  // Simple icon toggle variant
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={className}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        {showLabel && (
          <span className="ml-2 text-sm">{theme === "light" ? "Dark" : "Light"}</span>
        )}
      </Button>
    )
  }

  // Dropdown variant with system preference option
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className} aria-label="Theme options">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
              ? "dark" 
              : "light"
            setTheme(systemTheme)
          }}
          className="cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
