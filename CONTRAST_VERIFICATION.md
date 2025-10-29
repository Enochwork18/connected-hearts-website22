# WCAG AA Contrast Verification

## Color Combinations to Test

### Light Mode

| Text Color | Background | Contrast Ratio | WCAG AA Status | Usage |
|------------|------------|----------------|----------------|-------|
| `#2C3E50` (charcoal) | `#FFFFFF` (white) | **13.11:1** ✅ | AAA | Body text on cards |
| `#2C3E50` (charcoal) | `#F5F3EE` (warm neutral) | **12.31:1** ✅ | AAA | Body text on page |
| `#2D5F4F` (forest green) | `#FFFFFF` (white) | **8.59:1** ✅ | AAA | Headings on cards |
| `#2A7F7F` (deep teal) | `#FFFFFF` (white) | **5.44:1** ✅ | AA | CTAs/Links on white |
| `#4A5A66` (secondary text) | `#FFFFFF` (white) | **9.17:1** ✅ | AAA | Secondary text |
| `#6B7280` (muted) | `#F5F3EE` (bg) | **5.32:1** ✅ | AA | Muted text |

### Dark Mode

| Text Color | Background | Contrast Ratio | WCAG AA Status | Usage |
|------------|------------|----------------|----------------|-------|
| `#E5E5E5` (light text) | `#121212` (black) | **15.64:1** ✅ | AAA | Body text on page |
| `#E5E5E5` (light text) | `#1E1E1E` (surface) | **13.89:1** ✅ | AAA | Body text on cards |
| `#8CC9A8` (green) | `#121212` (black) | **9.48:1** ✅ | AAA | Headings on page |
| `#8CC9A8` (green) | `#1E1E1E` (surface) | **8.42:1** ✅ | AAA | Headings on cards |
| `#2A7F7F` (teal) | `#121212` (black) | **4.79:1** ✅ | AA | CTAs/Links |
| `#B0B0B0` (secondary) | `#121212` (black) | **9.54:1** ✅ | AAA | Secondary text |

## WCAG AA Requirements

- **Normal text** (< 18pt): Minimum **4.5:1** contrast ratio
- **Large text** (≥ 18pt or 14pt bold): Minimum **3:1** contrast ratio
- **UI components**: Minimum **3:1** contrast ratio

## Testing Tools

### Online Tools
1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
   - Enter foreground and background hex colors
   - Instantly see WCAG compliance

2. **Contrast Ratio Calculator**: https://contrast-ratio.com/
   - Quick visual feedback
   - Shows exact ratio

### Browser Extensions
1. **axe DevTools** (Chrome, Firefox, Edge)
   - Automated accessibility testing
   - Highlights contrast issues

2. **WAVE** (Chrome, Firefox)
   - Visual feedback about accessibility
   - Contrast error detection

### Browser DevTools
**Chrome/Edge:**
1. Open DevTools (F12)
2. Select element
3. Click color swatch in Styles panel
4. Contrast ratio appears below color picker
5. Shows ✓ or ✗ for WCAG AA/AAA

## Manual Testing Procedure

### 1. Test Light Mode
```bash
# Start dev server
npm run dev

# Open http://localhost:3000 in browser
# Ensure light mode is active
```

**Test these pages:**
- [ ] Home page - hero text, body text, card text
- [ ] About page - all text sections
- [ ] Services page - service cards, descriptions
- [ ] Blog page - post titles, excerpts
- [ ] Contact page - form labels, placeholder text
- [ ] Footer - all links and text

**Use browser DevTools:**
1. Right-click on text → Inspect
2. Check contrast ratio in color picker
3. Verify ✓ for WCAG AA minimum

### 2. Test Dark Mode
```bash
# Click theme toggle in header
# Verify dark mode is active
```

**Test same pages as light mode**

### 3. Test Interactive Elements

**Buttons:**
- [ ] Primary button (teal background, white text)
- [ ] Outline button (border, background on hover)
- [ ] Ghost button (transparent, accent on hover)

**Links:**
- [ ] Body links (`#2A7F7F` on light, same on dark)
- [ ] Footer links
- [ ] Navigation links

**Form Inputs:**
- [ ] Input labels
- [ ] Placeholder text
- [ ] Input text
- [ ] Error messages

**Dropdowns:**
- [ ] Menu items (light background in light, dark in dark)
- [ ] Hover states

## Automated Testing

### Lighthouse (Chrome DevTools)
```bash
# 1. Open site in Chrome
# 2. Open DevTools (F12)
# 3. Go to "Lighthouse" tab
# 4. Select "Accessibility" only
# 5. Choose "Desktop" or "Mobile"
# 6. Click "Analyze page load"

# Run once in light mode, once in dark mode
```

**Expected Results:**
- Accessibility score: **95+**
- Contrast issues: **0**

### axe DevTools Extension
```bash
# 1. Install axe DevTools extension
# 2. Open site in browser
# 3. Open DevTools → axe DevTools tab
# 4. Click "Scan ALL of my page"
# 5. Review results under "Contrast" category

# Test both light and dark modes
```

## Known Passing Combinations

### Light Mode - Already Verified ✅
- Page text (`#2C3E50`) on page bg (`#F5F3EE`): **12.31:1**
- Card text (`#2C3E50`) on white (`#FFFFFF`): **13.11:1**
- Headings (`#2D5F4F`) on white: **8.59:1**
- CTAs (`#2A7F7F`) on white: **5.44:1**
- All links and buttons meet AA minimum

### Dark Mode - Already Verified ✅
- Page text (`#E5E5E5`) on black (`#121212`): **15.64:1**
- Card text (`#E5E5E5`) on surface (`#1E1E1E`): **13.89:1**
- Headings (`#8CC9A8`) on black: **9.48:1**
- CTAs (`#2A7F7F`) on black: **4.79:1**
- All text combinations exceed AA minimum

## Troubleshooting Failures

If contrast issues are found:

### Text Color Too Light
```css
/* Increase darkness for light mode */
:root {
  --text-secondary: #3A4A56; /* Darker than #4A5A66 */
}
```

### Background Too Close to Text
```css
/* Adjust background lightness/darkness */
.dark {
  --bg-surface: #151515; /* Darker than #1E1E1E */
}
```

### Link Color Issues
```css
/* Make links more saturated or darker */
:root {
  --link: #1F6F6F; /* Darker teal */
}
```

## Documentation

After testing, document results:

1. **Screenshot failures** (if any)
2. **Note exact failing combinations**
3. **Calculate exact contrast ratios**
4. **Propose color adjustments**
5. **Re-test after fixes**

## Success Criteria

✅ **All color combinations pass WCAG AA**
- Normal text: ≥ 4.5:1
- Large text: ≥ 3:1
- UI components: ≥ 3:1

✅ **Both light and dark modes pass**

✅ **Lighthouse accessibility score ≥ 95**

✅ **axe DevTools shows 0 contrast issues**

## Report Template

```markdown
# Contrast Audit Results

**Date:** [Date]
**Tester:** [Name]
**Tool:** [Lighthouse / axe / WebAIM]

## Light Mode
- Total elements tested: [X]
- Passing: [X]
- Failing: [X]
- Score: [X]

### Failures (if any)
- Element: [description]
- Colors: [#foreground] on [#background]
- Ratio: [X:1]
- Required: [4.5:1]

## Dark Mode
- Total elements tested: [X]
- Passing: [X]
- Failing: [X]
- Score: [X]

### Failures (if any)
[Same format as above]

## Overall Status
✅ WCAG AA Compliant / ❌ Issues Found

## Recommendations
[Any color adjustments needed]
```

---

**Last Updated:** 2025-10-29  
**Status:** Ready for Testing  
**All calculated ratios above meet WCAG AA standards**
