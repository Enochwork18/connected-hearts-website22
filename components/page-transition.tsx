"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useMotionPreference } from "@/hooks/use-motion-preference"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { shouldReduceMotion } = useMotionPreference()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.2,
          ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
