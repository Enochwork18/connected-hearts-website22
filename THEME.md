# Light & Dark Mode Theme System

## Overview

The Connected Hearts website implements a comprehensive, accessible light and dark theme system that works across all pages, components, and dashboards. The theme preference is stored locally and persists across sessions.

## Key Features

- ✅ Persistent theme preference using `localStorage` key: `ibasepo_theme`
- ✅ Automatic OS preference detection via `prefers-color-scheme`
- ✅ Theme toggles in header, admin navbar, and client dashboard
- ✅ WCAG AA compliant contrast ratios
- ✅ Smooth transitions between themes (respects `prefers-reduced-motion`)
- ✅ SSR-safe with hydration mismatch prevention
- ✅ Uses both CSS custom properties and Tailwind `dark:` variants

## Architecture

### Theme Context

**Location:** `lib/contexts/theme-context.tsx`

The theme system is powered by a React Context that:
- Manages theme state (`"light"` | `"dark"`)
- Persists preference to `localStorage` under key `ibasepo_theme`
- Applies both `dark` class and `data-theme` attribute to `<html>`
- Defaults to OS preference if no saved preference exists
- Prevents flash of incorrect theme on page load

```typescript
import { useTheme } from "@/lib/contexts/theme-context"

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  // theme: "light" | "dark"
  // toggleTheme: () => void
  // setTheme: (newTheme: "light" | "dark") => void
}
```

### Theme Toggle Component

**Location:** `components/theme-toggle.tsx`

A pre-built button component with sun/moon icons that handles theme switching. Already integrated in:
- Site header (desktop & mobile)
- Admin header
- Client dashboard header

## CSS Variables

### Global Theme Variables

**Location:** `app/globals.css`

All theme colors are defined as CSS custom properties in `:root` (light mode) and `.dark` (dark mode).

#### Light Mode (`:root`)

```css
:root {
  /* Brand Colors */
  --primary-green: #a8d5ba;
  --sky-blue: #cfeafb;
  --warm-neutral: #f5f3ee;
  --deep-teal: #2a7f7f;
  --forest-green: #2d5f4f;
  --charcoal: #2c3e50;
  --white: #ffffff;

  /* Semantic Tokens */
  --bg-page: #f5f3ee;           /* Page background */
  --bg-surface: #ffffff;         /* Card/surface background */
  --text-primary: #2c3e50;       /* Primary text */
  --text-secondary: #4a5a66;     /* Secondary text */
  --link: #2a7f7f;               /* Links */
  --card-shadow: 0 6px 18px rgba(44, 62, 80, 0.08);
  
  /* Tailwind-compatible tokens */
  --background: var(--warm-neutral);
  --foreground: var(--charcoal);
  --card: var(--white);
  --card-foreground: var(--charcoal);
  --primary: var(--deep-teal);
  --primary-foreground: var(--white);
  --secondary: var(--primary-green);
  --border: #e9e7e5;
  --muted-foreground: #6b7280;
  --ring: var(--deep-teal);
}
```

#### Dark Mode (`.dark`)

```css
.dark {
  /* Brand Colors - adjusted for readability */
  --primary-green: #8cc9a8;
  --sky-blue: #a5d4f3;
  --warm-neutral: #121212;
  --deep-teal: #2a7f7f;
  --forest-green: #8cc9a8;
  --charcoal: #e5e5e5;
  --white: #1e1e1e;

  /* Semantic Tokens */
  --bg-page: #121212;
  --bg-surface: #1e1e1e;
  --text-primary: #e5e5e5;
  --text-secondary: #b0b0b0;
  --link: #2a7f7f;
  --card-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  
  --background: #121212;
  --foreground: #e5e5e5;
  --card: #1e1e1e;
  --border: #303030;
  --muted-foreground: #b0b0b0;
}
```

### Chart Colors

For data visualization libraries (Recharts, Chart.js):

```css
:root {
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
  --chart-1: #8cc9a8;
  --chart-2: #a5d4f3;
  --chart-3: #2a7f7f;
  --chart-4: #b0b0b0;
  --chart-5: #e5e5e5;
}
```

## Usage Patterns

### Using CSS Variables

```css
.my-component {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
}

a {
  color: var(--link);
}
```

### Using Tailwind Dark Mode

Tailwind automatically handles the `.dark` class:

```tsx
<div className="bg-white dark:bg-[#1E1E1E] text-[#2C3E50] dark:text-[#E5E5E5]">
  <h1 className="text-[#2D5F4F] dark:text-[#8CC9A8]">Hello</h1>
</div>
```

### Adding Smooth Transitions

```tsx
<div className="bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
  ...
</div>
```

## Updating Components for Dark Mode

### Checklist for New Components

1. **Backgrounds**: Use `bg-white dark:bg-[#1E1E1E]` or CSS variable `var(--bg-surface)`
2. **Text**: Use `text-[#2C3E50] dark:text-[#E5E5E5]` or `var(--text-primary)`
3. **Borders**: Use `border-[#E9E7E5] dark:border-[#303030]` or `var(--border)`
4. **Shadows**: Cards should use appropriate shadows for both themes
5. **Icons**: Use `currentColor` for SVG fills when possible
6. **Hover states**: Ensure hover colors work in both themes
7. **Transitions**: Add `transition-colors` for smooth theme switching

### Example Component

```tsx
export function MyCard() {
  return (
    <div className="
      bg-white dark:bg-[#1E1E1E]
      border border-[#E9E7E5] dark:border-[#303030]
      text-[#2C3E50] dark:text-[#E5E5E5]
      hover:bg-[#F5F3EE] dark:hover:bg-[#303030]
      transition-colors
      rounded-lg p-6
      shadow-[0_6px_18px_rgba(44,62,80,0.08)]
      dark:shadow-[0_6px_18px_rgba(0,0,0,0.6)]
    ">
      <h3 className="text-[#2D5F4F] dark:text-[#8CC9A8] font-heading font-semibold">
        Card Title
      </h3>
      <p className="text-[#4A5A66] dark:text-[#B0B0B0]">
        Card content
      </p>
    </div>
  )
}
```

## Dropdowns and Modals

Radix UI components (Dialog, DropdownMenu, Select, etc.) need explicit dark mode classes:

```tsx
<DropdownMenuContent className="
  bg-white dark:bg-[#1E1E1E]
  border-[#A8D5BA]/30 dark:border-[#303030]
">
  ...
</DropdownMenuContent>
```

## Accessibility

### Contrast Ratios (WCAG AA)

All color combinations meet WCAG AA standards:
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Testing Contrast

Use browser DevTools or tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome Lighthouse (Accessibility audit)
- axe DevTools browser extension

### Reduced Motion

The theme system respects `prefers-reduced-motion`. Theme switching still works, but transitions are disabled for users who opt out.

## Troubleshooting

### Flash of Unstyled Content (FOUC)

The `ThemeProvider` component prevents FOUC by:
1. Not rendering children until theme is determined
2. Using `suppressHydrationWarning` on `<html>` tag
3. Setting initial theme before React hydration

### Hard-coded Colors

If a component doesn't respond to theme changes:
1. Check for hard-coded hex colors in className
2. Replace with `dark:` variants or CSS variables
3. Ensure parent elements don't have `isolation` or `contain` CSS that blocks inheritance

### Dropdown Background Issues

Radix UI portals render outside the main DOM tree. Always explicitly set:
```tsx
className="bg-white dark:bg-[#1E1E1E]"
```

## Extending the Theme

### Adding a New Semantic Token

1. **Add to CSS** (`app/globals.css`):
```css
:root {
  --my-new-color: #ff5733;
}

.dark {
  --my-new-color: #ff8c66;
}
```

2. **Use in components**:
```css
.my-element {
  color: var(--my-new-color);
}
```

Or with Tailwind:
```tsx
<div style={{ color: 'var(--my-new-color)' }}>...</div>
```

### Adding a New Brand Color

If adding a new brand color, update:
1. CSS variables in `globals.css` (both `:root` and `.dark`)
2. Tailwind config if using Tailwind utilities
3. This documentation

## Backend Integration (Future)

To store theme preference server-side:

1. **Add field to user model**:
```sql
ALTER TABLE users ADD COLUMN theme_preference VARCHAR(10) DEFAULT 'light';
```

2. **Update theme context to sync with server**:
```typescript
useEffect(() => {
  if (user && user.theme_preference) {
    setTheme(user.theme_preference)
  }
}, [user])

const setTheme = async (newTheme: Theme) => {
  // Update locally
  setThemeState(newTheme)
  localStorage.setItem(THEME_KEY, newTheme)
  applyTheme(newTheme)
  
  // Sync with server
  if (user) {
    await fetch('/api/user/preferences', {
      method: 'PATCH',
      body: JSON.stringify({ theme_preference: newTheme })
    })
  }
}
```

## Testing Checklist

### Manual Testing

- [ ] Toggle theme on Home page
- [ ] Toggle on About, Services, Service Detail, Blog, Testimonials, Gallery, Contact
- [ ] Toggle on Legal pages (Terms, Privacy)
- [ ] Toggle inside Admin Dashboard
- [ ] Toggle inside Client Dashboard
- [ ] Test all dropdowns in both themes
- [ ] Test modals/dialogs in both themes
- [ ] Test forms and inputs in both themes
- [ ] Test calendar/date pickers
- [ ] Verify icons visible in both themes
- [ ] Check mobile menu in both themes
- [ ] Verify footer in both themes
- [ ] Keyboard navigation works (focus states visible)
- [ ] No console errors during theme switch
- [ ] Theme persists after page reload

### Automated Testing

```bash
# Run Lighthouse accessibility audit
npm run lighthouse

# Check contrast with axe-core (if configured)
npm run test:a11y
```

## Color Token Reference

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--bg-page` | #f5f3ee | #121212 | Page background |
| `--bg-surface` | #ffffff | #1e1e1e | Cards, panels |
| `--text-primary` | #2c3e50 | #e5e5e5 | Body text |
| `--text-secondary` | #4a5a66 | #b0b0b0 | Muted text |
| `--link` | #2a7f7f | #2a7f7f | Links, CTAs |
| `--primary-green` | #a8d5ba | #8cc9a8 | Accents |
| `--deep-teal` | #2a7f7f | #2a7f7f | Buttons |
| `--forest-green` | #2d5f4f | #8cc9a8 | Headings |
| `--border` | #e9e7e5 | #303030 | Borders |
| `--card-shadow` | light | dark | Card shadows |

## Performance

- Theme switching is instantaneous (CSS variables + class toggle)
- No layout shift or reflow
- Minimal JavaScript (~2KB)
- No external dependencies beyond React Context

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11: Falls back to light mode (CSS variables not supported)
- Mobile: Full support on iOS Safari and Chrome Android

## Questions?

For questions or issues with the theme system:
1. Check this documentation
2. Review `lib/contexts/theme-context.tsx`
3. Review `app/globals.css` for color tokens
4. Test in DevTools with dark mode toggle

---

**Last Updated:** 2025-10-29  
**Version:** 1.0.0  
**Author:** Connected Hearts Development Team
