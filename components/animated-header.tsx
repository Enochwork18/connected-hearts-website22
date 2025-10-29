"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/hooks/useReducedMotion"
import { heroEntrance, typewriterContainer, typewriterChar } from "@/lib/animations/variants"

interface AnimatedHeaderProps {
  text: string
  subtitle?: string
  className?: string
  subtitleClassName?: string
  type?: "typewriter" | "fade"
}

export function AnimatedHeader({
  text,
  subtitle,
  className = "",
  subtitleClassName = "",
  type = "fade"
}: AnimatedHeaderProps) {
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion, render without animation
  if (prefersReducedMotion) {
    return (
      <div>
        <h1 className={className}>{text}</h1>
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      </div>
    )
  }

  // Typewriter effect
  if (type === "typewriter") {
    const chars = text.split("")
    
    return (
      <div>
        <motion.h1
          className={className}
          variants={typewriterContainer}
          initial="hidden"
          animate="visible"
        >
          {chars.map((char, index) => (
            <motion.span key={index} variants={typewriterChar}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={subtitleClassName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: chars.length * 0.03 + 0.3, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    )
  }

  // Fade entrance (default)
  return (
    <div>
      <motion.h1
        className={className}
        variants={heroEntrance}
        initial="hidden"
        animate="visible"
      >
        {text}
      </motion.h1>
      {subtitle && (
        <motion.p
          className={subtitleClassName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
