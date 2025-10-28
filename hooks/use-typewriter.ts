"use client"

import { useEffect, useState } from "react"
import { useMotionPreference } from "./use-motion-preference"

interface TypewriterOptions {
  text: string
  speed?: number
  delay?: number
}

export function useTypewriter({ text, speed = 70, delay = 0 }: TypewriterOptions) {
  const [display, setDisplay] = useState("")
  const { shouldReduceMotion } = useMotionPreference()

  useEffect(() => {
    // If reduced motion, show text immediately
    if (shouldReduceMotion) {
      setDisplay(text)
      return
    }

    let i = 0
    let mounted = true
    let timeoutId: NodeJS.Timeout

    // Initial delay before starting
    const startTimeout = setTimeout(() => {
      function step() {
        if (!mounted) return

        if (i <= text.length) {
          setDisplay(text.slice(0, i))
          i++
          timeoutId = setTimeout(step, speed)
        }
      }
      step()
    }, delay)

    return () => {
      mounted = false
      clearTimeout(startTimeout)
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay, shouldReduceMotion])

  return display
}
