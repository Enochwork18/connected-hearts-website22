# Theme System QA Checklist

## Pre-Launch Testing Checklist

### 1. Visual Testing

#### Light Mode
- [ ] Homepage displays correctly
- [ ] All service pages display correctly
- [ ] Blog pages display correctly
- [ ] Gallery displays correctly
- [ ] Contact form displays correctly
- [ ] Admin dashboard displays correctly
- [ ] Admin pages (bookings, blog, etc.) display correctly
- [ ] Modal dialogs display correctly
- [ ] Dropdown menus display correctly
- [ ] Charts and graphs display correctly
- [ ] Footer displays correctly

#### Dark Mode
- [ ] Homepage displays correctly
- [ ] All service pages display correctly
- [ ] Blog pages display correctly
- [ ] Gallery displays correctly
- [ ] Contact form displays correctly
- [ ] Admin dashboard displays correctly
- [ ] Admin pages (bookings, blog, etc.) display correctly
- [ ] Modal dialogs display correctly
- [ ] Dropdown menus display correctly
- [ ] Charts and graphs display correctly
- [ ] Footer displays correctly

### 2. Theme Toggle Functionality

#### Client Site
- [ ] Theme toggle visible in header
- [ ] Theme toggle works on click
- [ ] Icon animates smoothly
- [ ] No page flash when toggling
- [ ] Theme persists after page refresh
- [ ] Theme persists after navigation
- [ ] Mobile menu theme toggle works

#### Admin Dashboard
- [ ] Theme toggle visible in admin header
- [ ] Dropdown shows Light/Dark/System options
- [ ] Theme toggle works on all admin pages
- [ ] Theme persists in admin section
- [ ] Admin theme independent of client theme

### 3. System Preference Detection

- [ ] Browser reports system preference correctly
- [ ] App respects system preference on first visit
- [ ] Changing OS theme reflects in app
- [ ] Explicit user choice overrides system preference
- [ ] System option in dropdown works correctly

### 4. FOUC (Flash of Unstyled Content) Prevention

- [ ] No white flash on page load (dark mode)
- [ ] No dark flash on page load (light mode)
- [ ] Theme applied before first paint
- [ ] Hard refresh shows correct theme immediately
- [ ] Opening in new tab shows correct theme

### 5. localStorage Persistence

- [ ] Theme choice saved to localStorage
- [ ] Theme restored on page refresh
- [ ] Theme restored after browser restart
- [ ] Incognito mode works (defaults to system)
- [ ] Clearing localStorage resets to system theme

### 6. Component Integration

#### Forms
- [ ] Input fields visible in both themes
- [ ] Labels readable in both themes
- [ ] Placeholder text visible in both themes
- [ ] Validation errors visible in both themes
- [ ] Focus states visible in both themes
- [ ] Disabled states visible in both themes

#### Buttons
- [ ] Primary buttons visible in both themes
- [ ] Secondary buttons visible in both themes
- [ ] Ghost buttons visible in both themes
- [ ] Outline buttons visible in both themes
- [ ] Hover states work in both themes
- [ ] Focus states work in both themes

#### Cards
- [ ] Card backgrounds distinct from page background
- [ ] Card borders visible in both themes
- [ ] Card text readable in both themes
- [ ] Card shadows visible in both themes
- [ ] Nested cards visible in both themes

#### Navigation
- [ ] Header background distinct in both themes
- [ ] Nav links readable in both themes
- [ ] Active nav items highlighted correctly
- [ ] Hover states visible in both themes
- [ ] Mobile menu works in both themes

#### Footer
- [ ] Footer background distinct in both themes
- [ ] Footer links visible in both themes
- [ ] Social icons visible in both themes
- [ ] Copyright text visible in both themes

### 7. Accessibility Testing

#### Keyboard Navigation
- [ ] Theme toggle accessible via keyboard
- [ ] Tab order logical
- [ ] Focus indicators visible in both themes
- [ ] Enter/Space activates theme toggle
- [ ] Escape closes dropdown (if used)

#### Screen Readers
- [ ] Theme toggle has aria-label
- [ ] Theme state announced to screen readers
- [ ] Theme change announced to screen readers
- [ ] All interactive elements have labels

#### Contrast Ratios
- [ ] Primary text meets WCAG AA (4.5:1) in light mode
- [ ] Primary text meets WCAG AA (4.5:1) in dark mode
- [ ] Buttons meet WCAG AA in light mode
- [ ] Buttons meet WCAG AA in dark mode
- [ ] Status colors (success/error) meet WCAG AA
- [ ] Links distinguishable from body text

#### Motion & Animation
- [ ] Respects prefers-reduced-motion
- [ ] Theme transition smooth but not distracting
- [ ] Icon animation can be disabled
- [ ] No jarring movements

### 8. Performance Testing

- [ ] Theme toggle responds in < 16ms (60fps)
- [ ] No layout shift on theme change
- [ ] localStorage write doesn't block UI
- [ ] Page load time unaffected
- [ ] Memory usage normal
- [ ] No console errors

### 9. Browser Testing

#### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Opera (latest)

#### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Firefox Mobile (Android)
- [ ] Samsung Internet

#### Tablet
- [ ] iPad Safari
- [ ] Android Chrome

### 10. Edge Cases

- [ ] localStorage disabled - graceful fallback
- [ ] JavaScript disabled - shows default theme
- [ ] Very long page - theme toggle still accessible
- [ ] Print view works correctly
- [ ] RTL (right-to-left) languages work
- [ ] Zoom levels (50% to 200%) work

### 11. Integration Testing

#### User Flows
- [ ] New user visits site → sees system theme
- [ ] User toggles theme → preference saved
- [ ] User navigates pages → theme persists
- [ ] User logs in → theme persists
- [ ] User logs out → theme persists
- [ ] Admin logs in → theme persists
- [ ] Admin switches theme → separate from client theme

#### Cross-Page Consistency
- [ ] Theme consistent across all client pages
- [ ] Theme consistent across all admin pages
- [ ] Theme consistent in modals
- [ ] Theme consistent in embedded iframes (if any)

### 12. Regression Testing

- [ ] No existing functionality broken
- [ ] Authentication still works
- [ ] Forms still submit correctly
- [ ] API calls still work
- [ ] Images still load correctly
- [ ] Links still navigate correctly

### 13. Error Handling

- [ ] Theme script error doesn't break page
- [ ] localStorage error handled gracefully
- [ ] Theme context error shows error boundary
- [ ] Missing CSS variables have fallbacks
- [ ] Network errors don't affect theme

### 14. Documentation

- [ ] README-THEME.md is accurate
- [ ] Code comments are clear
- [ ] Integration guide is complete
- [ ] Migration guide is helpful
- [ ] Rollback procedure tested

### 15. Production Readiness

- [ ] All console.log removed
- [ ] No TODO comments left
- [ ] TypeScript errors resolved
- [ ] ESLint warnings resolved
- [ ] Build succeeds without errors
- [ ] Production bundle size acceptable

## Testing Tools

### Manual Testing
```bash
# Run dev server
npm run dev

# Check in multiple browsers
# Test with DevTools device emulation
```

### Automated Testing (Optional)
```bash
# Run Lighthouse for accessibility
npm run lighthouse

# Run visual regression tests
npm run test:visual

# Check contrast ratios
npm run test:contrast
```

### Browser DevTools Checks
```javascript
// Check localStorage
localStorage.getItem('theme')

// Check applied theme
document.documentElement.className

// Check CSS variables
getComputedStyle(document.documentElement).getPropertyValue('--background')

// Simulate system preference change
matchMedia('(prefers-color-scheme: dark)').matches
```

## Common Issues & Solutions

### Issue: FOUC on page load
**Solution**: Ensure theme script is in `<head>` before stylesheets

### Issue: Theme not persisting
**Solution**: Check localStorage is not disabled/blocked

### Issue: Contrast too low
**Solution**: Adjust CSS variables in `styles/theme.css`

### Issue: Icons not changing
**Solution**: Verify dark mode classes on icon elements

### Issue: Admin theme same as client
**Solution**: They should be the same - it's site-wide

## Sign-Off

- [ ] Developer testing complete
- [ ] QA testing complete
- [ ] Accessibility audit complete
- [ ] Product owner approval
- [ ] Ready for production deployment

**Tested by**: _________________
**Date**: _________________
**Version**: _________________
**Sign-off**: _________________
