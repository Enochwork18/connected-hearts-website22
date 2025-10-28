"use client"

import { useState, useEffect } from "react"

export function useMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [userPreference, setUserPreference] = useState<boolean | null>(null)

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener("change", handler)

    // Check user's stored preference
    const stored = localStorage.getItem("motion-preference")
    if (stored !== null) {
      setUserPreference(stored === "reduced")
    }

    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const shouldReduceMotion = userPreference !== null ? userPreference : prefersReducedMotion

  const toggleMotion = () => {
    const newPref = !shouldReduceMotion
    setUserPreference(newPref)
    localStorage.setItem("motion-preference", newPref ? "reduced" : "full")
  }

  return {
    shouldReduceMotion,
    toggleMotion,
    hasUserPreference: userPreference !== null,
  }
}
