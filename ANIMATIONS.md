# Animation System Documentation

## Overview

Connected Hearts uses Framer Motion for a cohesive, performant animation system that enhances UX while respecting accessibility preferences.

## Core Principles

1. **GPU-Accelerated**: All animations use transform and opacity for 60fps performance
2. **Accessible**: Respects `prefers-reduced-motion` system preference
3. **Consistent**: Reusable variants ensure uniform motion language
4. **Purposeful**: Animations guide attention and provide feedback

## Directory Structure

```
lib/animations/
  └── variants.ts          # Reusable animation variants

lib/hooks/
  └── useReducedMotion.ts  # Hook to detect motion preference

components/
  └── animated-header.tsx  # Reusable animated header component
```

## Animation Variants Library

**Location**: `lib/animations/variants.ts`

### Page Transitions
- `pageTransition` - Smooth page enter/exit
- `fadeInUp` - Element fades in from bottom
- `fadeInDown` - Element fades in from top
- `fadeInLeft` - Element fades in from left
- `fadeInRight` - Element fades in from right

### Interactive Elements
- `cardHover` - Card lift on hover
- `buttonPress` - Scale down on press
- `scaleIn` - Scale up entrance

### Complex Animations
- `typewriterContainer` + `typewriterChar` - Typewriter effect
- `staggerContainer` + `staggerItem` - Staggered list animations
- `heroEntrance` - Hero header entrance

### UI Components
- `modalOverlay` + `modalContent` - Modal animations
- `dropdownMenu` - Dropdown entrance/exit
- `toastNotification` - Toast slide in/out
- `slideInBottom` - Mobile menu animation

### Loading States
- `skeletonPulse` - Skeleton screen pulse
- `numberCounter` - Animated number counting

## Usage Examples

### 1. Animated Page Headers

```tsx
import { AnimatedHeader } from "@/components/animated-header"

// Fade entrance (default)
<AnimatedHeader 
  text="Welcome to Connected Hearts"
  subtitle="Guiding families toward peace and purpose"
  className="text-4xl font-bold text-forest dark:text-primary-green"
  subtitleClassName="text-lg text-muted-foreground"
/>

// Typewriter effect
<AnimatedHeader 
  text="About Us"
  type="typewriter"
  className="text-4xl font-bold"
/>
```

### 2. Card Hover Effects

```tsx
import { motion } from "framer-motion"
import { cardHover } from "@/lib/animations/variants"

<motion.div
  variants={cardHover}
  initial="rest"
  whileHover="hover"
  className="bg-white dark:bg-gray-800 p-6 rounded-lg"
>
  {/* Card content */}
</motion.div>
```

### 3. Staggered List Animations

```tsx
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animations/variants"

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItem}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

### 4. Button with Press Animation

```tsx
import { motion } from "framer-motion"
import { buttonPress } from "@/lib/animations/variants"

<motion.button
  variants={buttonPress}
  initial="rest"
  whileTap="pressed"
  className="px-6 py-3 bg-teal text-white rounded-lg"
>
  Book a Session
</motion.button>
```

### 5. Modal Animations

```tsx
import { motion, AnimatePresence } from "framer-motion"
import { modalOverlay, modalContent } from "@/lib/animations/variants"

<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        variants={modalOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/50"
      />
      <motion.div
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 flex items-center justify-center"
      >
        {/* Modal content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### 6. Respecting Reduced Motion

```tsx
import { useReducedMotion } from "@/lib/hooks/useReducedMotion"
import { motion } from "framer-motion"

function MyComponent() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
    >
      {/* Content */}
    </motion.div>
  )
}
```

## Animation Timing

**Durations**:
- Micro-interactions (buttons, hovers): 100-200ms
- UI feedback (dropdowns, tooltips): 200-300ms
- Component entrances: 300-600ms
- Page transitions: 400-800ms

**Easing**:
- Default: `[0.25, 0.1, 0.25, 1]` (easeInOutCubic)
- Quick interactions: `easeOut`
- Bouncy effects: `spring` with stiffness 300, damping 20-30

## Performance Best Practices

### ✅ DO
- Use `transform` and `opacity` for animations
- Use `will-change: transform` sparingly (let Framer Motion handle it)
- Animate on GPU-accelerated properties
- Use `AnimatePresence` for mount/unmount animations
- Test on lower-end devices

### ❌ DON'T
- Animate `width`, `height`, or `top/left` (causes layout reflow)
- Chain too many sequential animations
- Animate while scrolling (without IntersectionObserver)
- Ignore `prefers-reduced-motion`

## Accessibility

**Motion Preferences**:
- All animations check `prefers-reduced-motion`
- Users who prefer reduced motion get instant transitions (duration: 0)
- Critical functionality never depends on animation completion

**Focus Management**:
- Animations don't interfere with keyboard navigation
- Focus states are always visible
- Modals trap focus appropriately

## Pages with Header Animations

✅ Implemented:
- [ ] Home - Hero entrance
- [ ] About - Fade in
- [ ] Services (list) - Fade in
- [ ] Service Detail - Fade in
- [ ] Blog (list) - Fade in
- [ ] Blog Post - Fade in
- [ ] Testimonials - Fade in
- [ ] Booking - Fade in
- [ ] Gallery - Fade in
- [ ] Contact - Fade in
- [ ] Terms - Fade in
- [ ] Privacy - Fade in

## Implementation Checklist

**Core System**:
- [x] Animation variants library
- [x] useReducedMotion hook
- [x] AnimatedHeader component
- [ ] AnimatedCard component
- [ ] AnimatedButton component
- [ ] Skeleton loader component

**Page Headers**:
- [ ] Update all page headers to use AnimatedHeader
- [ ] Test all animations
- [ ] Verify reduced motion behavior

**Micro-interactions**:
- [ ] Add hover effects to all cards
- [ ] Add press effects to all buttons
- [ ] Add focus animations to form fields
- [ ] Add entrance animations to modals
- [ ] Add smooth transitions to dropdowns

## Testing Animations

### Manual Testing

1. **Visual Test**:
   ```bash
   npm run dev
   # Navigate to each page
   # Verify header animates smoothly
   ```

2. **Reduced Motion Test**:
   ```
   Chrome DevTools → Command Palette → "Emulate CSS prefers-reduced-motion"
   # Verify animations are disabled
   ```

3. **Performance Test**:
   ```
   Chrome DevTools → Performance tab
   # Record animation
   # Check for 60fps, no jank
   ```

### Automated Testing

```typescript
// Example test
describe("AnimatedHeader", () => {
  it("respects prefers-reduced-motion", () => {
    matchMedia.useMediaQuery("(prefers-reduced-motion: reduce)")
    render(<AnimatedHeader text="Test" />)
    // Assert no motion variants applied
  })
})
```

## Troubleshooting

**Animation not running**:
- Check if `initial` and `animate` props are set
- Verify variants are imported correctly
- Ensure component is client-side (`"use client"`)

**Jank/stuttering**:
- Check if animating layout properties (width/height)
- Reduce number of simultaneous animations
- Use `useReducedMotion` to simplify on low-end devices

**Hydration errors**:
- Wrap animation in `useEffect` or check `mounted` state
- Use `suppressHydrationWarning` if needed

## Future Enhancements

- [ ] Scroll-triggered animations with IntersectionObserver
- [ ] Parallax effects for hero sections
- [ ] Gesture-based interactions (swipe, drag)
- [ ] Loading progress animations
- [ ] Success/error animation states
- [ ] Confetti effects for celebrations
- [ ] Animated charts/graphs

---

**Last Updated**: 2025-10-29  
**Status**: Core System Complete  
**Next**: Implement on all pages
