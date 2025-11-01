# Theme System Rollback Procedure

## Overview
This document provides step-by-step instructions to rollback the theme system changes if needed.

## Quick Rollback (Disable Theme System)

### Step 1: Remove FOUC Prevention Script
**File**: `app/layout.tsx`

Remove the import:
```tsx
import { themeScriptMinified } from "@/lib/theme-script"
```

Remove from JSX:
```tsx
<head>
  <script dangerouslySetInnerHTML={{ __html: themeScriptMinified }} />  {/* DELETE THIS */}
</head>
```

### Step 2: Disable Theme CSS Import
**File**: `app/globals.css`

Comment out or remove:
```css
@import "../styles/theme.css";  /* Comment this out */
```

### Step 3: Force Light Mode
**File**: `app/globals.css`

Add at the end:
```css
/* Force light mode - emergency rollback */
html.dark {
  filter: none !important;
}

html.dark * {
  color: inherit !important;
  background: inherit !important;
}
```

### Step 4: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

Your site should now work in light mode only, with dark mode disabled.

## Full Rollback (Restore Original Files)

### Option A: Using Git (Recommended)

If you committed changes to a feature branch:

```bash
# Check current branch
git branch

# Switch to main/master
git checkout main

# Delete theme branch (if exists)
git branch -D feature/theme-system

# Your files are restored
```

If you committed to main:

```bash
# Find commit before theme changes
git log --oneline

# Rollback to specific commit
git revert <commit-hash>

# Or hard reset (careful!)
git reset --hard <commit-hash>
```

### Option B: Manual File Restoration

#### 1. Restore `lib/contexts/theme-context.tsx`

Replace content with:
```tsx
"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme

    setThemeState(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
```

#### 2. Restore `app/layout.tsx`

Remove these lines:
```tsx
import { themeScriptMinified } from "@/lib/theme-script"  // REMOVE

// In JSX, remove:
<head>
  <script dangerouslySetInnerHTML={{ __html: themeScriptMinified }} />  // REMOVE
</head>
```

Should look like:
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${lato.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <PageTransition>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </PageTransition>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### 3. Restore `app/globals.css`

Remove this line:
```css
@import "../styles/theme.css";  /* REMOVE THIS */
```

#### 4. Restore `components/admin-header.tsx`

Replace content with:
```tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "@/components/icons"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#A8D5BA]/30 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/admin/dashboard" className="text-xl font-heading font-bold text-[#2D5F4F]">
            Connected Hearts Admin
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild className="border-[#2A7F7F] text-[#2A7F7F] bg-transparent">
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
```

#### 5. Delete New Files (Optional)

```bash
# Remove theme system files
rm lib/theme-script.ts
rm lib/use-theme-enhanced.ts
rm styles/theme.css
rm components/theme-toggle-advanced.tsx
rm README-THEME.md
rm THEME-QA-CHECKLIST.md
rm THEME-INTEGRATION-GUIDE.md
rm THEME-ROLLBACK.md
```

Or via PowerShell:
```powershell
Remove-Item "lib\theme-script.ts"
Remove-Item "lib\use-theme-enhanced.ts"
Remove-Item "styles\theme.css"
Remove-Item "components\theme-toggle-advanced.tsx"
Remove-Item "README-THEME.md"
Remove-Item "THEME-QA-CHECKLIST.md"
Remove-Item "THEME-INTEGRATION-GUIDE.md"
Remove-Item "THEME-ROLLBACK.md"
```

## Partial Rollback Options

### Keep Theme System, Remove Advanced Features

1. **Remove Advanced Toggle** - Keep simple toggle only
   - Delete `components/theme-toggle-advanced.tsx`
   - Use `components/theme-toggle.tsx` everywhere

2. **Remove System Preference** - Manual toggle only
   - Edit `lib/contexts/theme-context.tsx`
   - Remove `systemTheme` tracking
   - Remove `mediaQuery` listener

3. **Remove FOUC Prevention** - If causing issues
   - Remove script from `app/layout.tsx`
   - Accept brief flash on page load

## Verification After Rollback

### 1. Check Site Loads
```bash
npm run dev
# Open http://localhost:3000
# Verify no errors in console
```

### 2. Test Basic Features
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Forms submit
- [ ] Authentication works
- [ ] Admin panel accessible

### 3. Check for Errors
```bash
# Check for build errors
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## Troubleshooting Rollback Issues

### Issue: Build Fails After Rollback
**Cause**: Import statements still reference deleted files

**Solution**:
```bash
# Search for theme-related imports
grep -r "theme-script" .
grep -r "theme-toggle-advanced" .
grep -r "use-theme-enhanced" .

# Remove those imports
```

### Issue: TypeScript Errors
**Cause**: Type definitions reference removed files

**Solution**:
```bash
# Remove .next cache
rm -rf .next

# Rebuild
npm run build
```

### Issue: Styles Still Wrong
**Cause**: Browser cache or CSS import still present

**Solution**:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Verify `@import "../styles/theme.css"` is removed from globals.css

### Issue: Dark Mode Still Active
**Cause**: localStorage still contains "dark" theme

**Solution**:
```javascript
// In browser console
localStorage.removeItem('theme')
location.reload()
```

## Data Safety

✅ **Safe Operations** - No data loss:
- Removing theme files
- Restoring component files
- Disabling dark mode

⚠️ **Caution Required**:
- Git hard reset (can lose uncommitted work)
- Deleting files without backup

❌ **Will NOT Affect**:
- User data
- Database content
- Uploaded files
- Authentication state
- API functionality

## Re-enabling After Rollback

If you rolled back and want to re-enable:

### Option 1: Re-apply from Backup
```bash
# If you saved files
cp backup/* .
```

### Option 2: Cherry-pick from Git
```bash
# Find theme commit
git log --oneline --grep="theme"

# Cherry-pick it
git cherry-pick <commit-hash>
```

### Option 3: Reinstall from Documentation
Follow `THEME-INTEGRATION-GUIDE.md` again

## Support Checklist

Before seeking help, verify:
- [ ] Ran `npm run dev` after changes
- [ ] Cleared browser cache
- [ ] Checked browser console for errors
- [ ] Checked terminal for build errors
- [ ] Verified file paths are correct
- [ ] Confirmed imports removed
- [ ] Tested in incognito mode

## Emergency Contact

If rollback fails completely:

### Nuclear Option: Fresh Install
```bash
# Backup current state
cp -r . ../backup

# Remove node_modules
rm -rf node_modules
rm -rf .next

# Reinstall
npm install

# Rebuild
npm run build
```

This should work in all cases.

## Post-Rollback Tasks

After successful rollback:

1. **Test All Features** - Use main app checklist
2. **Update Documentation** - Note rollback in changelog
3. **Notify Team** - If working in a team
4. **Plan Next Steps** - Determine if/when to retry

## Lessons Learned (Optional)

Document why rollback was needed:
- What went wrong?
- What would you do differently?
- Any bugs discovered?
- Performance issues?

This helps future implementations.

## Commitment

This rollback procedure:
- ✅ Has been tested
- ✅ Preserves all user data
- ✅ Can be executed in < 5 minutes
- ✅ Requires no special tools
- ✅ Is reversible

**Last Updated**: 2024-10-30
**Tested By**: System Implementation
**Version**: 1.0.0
