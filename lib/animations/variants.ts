/**
 * Animation Variants Library
 * Reusable Framer Motion animation variants for consistent motion across the site
 * All animations respect prefers-reduced-motion
 */

import { Variants } from "framer-motion"

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Fade in from top
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Scale up
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

// Card hover lift
export const cardHover: Variants = {
  rest: { 
    y: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    y: -8,
    boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Button press
export const buttonPress: Variants = {
  rest: { scale: 1 },
  pressed: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

// Typewriter reveal (for headers)
export const typewriterContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2
    }
  }
}

export const typewriterChar: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

// Modal animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export const modalContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
}

// Dropdown menu
export const dropdownMenu: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: -10
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15
    }
  }
}

// Toast notification
export const toastNotification: Variants = {
  hidden: { 
    opacity: 0,
    y: -100,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3
    }
  }
}

// Loading skeleton pulse
export const skeletonPulse: Variants = {
  start: {
    opacity: 0.5
  },
  end: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.5,
      ease: "easeInOut"
    }
  }
}

// Number counter (for stats)
export const numberCounter = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  }
}

// Rotate in
export const rotateIn: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -90 
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Bounce in
export const bounceIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

// Slide in from bottom (for mobile menu)
export const slideInBottom: Variants = {
  hidden: { 
    y: "100%",
    opacity: 0
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

// Hero header entrance
export const heroEntrance: Variants = {
  hidden: { 
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2
    }
  }
}
