# QA Testing Checklist
**Project:** Ìbáṣepọ̀ Connected Hearts Website  
**Version:** 1.0.0  
**Date:** October 28, 2025

## Testing Instructions
- Mark items with ✅ when passed
- Mark items with ❌ when failed (add notes)
- Mark items with ⚠️ when needs review
- Add screenshots/evidence where requested

---

## 1. Navigation & Links Testing

### 1.1 Social Media Links
- [ ] **Footer Facebook icon** opens https://www.facebook.com/profile.php?id=100002866323294 in new tab
- [ ] **Footer Instagram icon** opens https://www.instagram.com/adukelara?igsh=MWQ0cWx1eGtpaXdxcw== in new tab
- [ ] **Twitter icon removed** from entire site
- [ ] **Social links have aria-labels** for accessibility

**Screenshot Required:** Footer with social icons visible

**Notes:**
```


```

---

### 1.2 Contact Links
- [ ] **Footer email 1** (enquiries@ibasepo.org.uk) has `mailto:` link and opens email client
- [ ] **Footer email 2** (eo.bismark@ibasepo.org.uk) has `mailto:` link and opens email client
- [ ] **Contact page email 1** opens email client
- [ ] **Contact page email 2** opens email client
- [ ] **Footer phone number** has `tel:+447958709238` link
- [ ] **Footer phone WhatsApp** link works
- [ ] **Contact page phone** has `tel:` link and WhatsApp link
- [ ] **Footer address** links to Google Maps
- [ ] **Contact page address** links to Google Maps
- [ ] **Google Maps links** open in new tab to correct location

**Screenshot Required:** Contact page with all clickable links highlighted

**Notes:**
```


```

---

### 1.3 Navigation Active State
- [ ] **Home page** - "Home" link is highlighted/active in navbar
- [ ] **About page** - "About" link is highlighted/active in navbar
- [ ] **Services page** - "Services" link is highlighted/active in navbar
- [ ] **Blog page** - "Blog" link is highlighted/active in navbar
- [ ] **Testimonials page** - "Testimonials" link is highlighted/active in navbar
- [ ] **Gallery page** - "Gallery" link is highlighted/active in navbar
- [ ] **Contact page** - "Contact" link is highlighted/active in navbar
- [ ] **Active state visible on mobile** navigation
- [ ] **Active state uses correct colors** (teal #2A7F7F, border-bottom)

**Screenshot Required:** Navigation on different pages showing active state

**Notes:**
```


```

---

### 1.4 "Book a Session" Button
- [ ] **Homepage** - Button visible and links to `/booking`
- [ ] **Header navigation** (desktop) - Button visible and links to `/booking`
- [ ] **Header navigation** (mobile) - Button visible and links to `/booking`
- [ ] **About page** (2 locations) - Buttons link to `/booking`
- [ ] **Testimonials page** - CTA button links to `/booking`
- [ ] **All "Book a Session" buttons** have hover states
- [ ] **Button text is consistent** across all instances

**Screenshot Required:** Multiple pages showing "Book a Session" buttons

**Notes:**
```


```

---

## 2. Testimonials Feature Testing

### 2.1 Testimonials Display (Public)
- [ ] **All testimonials display** with name, date, rating, text
- [ ] **Rating stars** (1-5) display correctly
- [ ] **Filter by service type** works correctly
- [ ] **Filter by rating** works correctly
- [ ] **Filters can be combined**
- [ ] **"No results" message** shows when filters return nothing
- [ ] **Pagination** works (if many testimonials)
- [ ] **Testimonial cards** have proper spacing and hover effects

**Screenshot Required:** Testimonials page with filters applied

**Notes:**
```


```

---

### 2.2 Testimonials Submission Form
- [ ] **"Submit Your Testimonial" button** shows the form
- [ ] **Name field** - required, validates correctly
- [ ] **Email field** - required, validates email format
- [ ] **Service dropdown** - required, shows all service types
- [ ] **Rating dropdown** - required, shows 1-5 stars options
- [ ] **Testimonial text** - required, enforces min/max length
- [ ] **Photo upload field** - optional, accepts images only
- [ ] **Photo upload field** - rejects files > 5MB
- [ ] **Submit button disabled** while form is submitting
- [ ] **Success message** displays after submission
- [ ] **Success message** mentions pending approval
- [ ] **Form resets** after successful submission
- [ ] **Cancel button** hides the form
- [ ] **Error messages display** for validation failures

**Screenshot Required:** Testimonial submission form (filled out)

**Notes:**
```


```

---

### 2.3 Admin Testimonial Moderation
(Requires admin login)

- [ ] **Admin can access** `/admin/testimonials`
- [ ] **Pending testimonials** list displays
- [ ] **Each testimonial shows** full details (name, email, rating, text, photo, date)
- [ ] **"Approve" button** works and changes status
- [ ] **"Reject" button** works and changes status
- [ ] **Edit functionality** allows minor text edits
- [ ] **Delete button** removes testimonial permanently
- [ ] **Delete requires confirmation** dialog
- [ ] **Filter by status** works (pending/approved/rejected)
- [ ] **Approved testimonials** appear on public page immediately
- [ ] **Rejected testimonials** do not appear on public page
- [ ] **Admin actions are logged** (who approved/edited/deleted)

**Screenshot Required:** Admin testimonials management interface

**Notes:**
```


```

---

## 3. UI/UX & Accessibility

### 3.1 Dropdown Menus
- [ ] **User dropdown** (when logged in) has opaque white background
- [ ] **Login dropdown** (when not logged in) has opaque white background
- [ ] **Dropdown text is readable** (good contrast)
- [ ] **Dropdown opens on click**
- [ ] **Dropdown closes** on outside click
- [ ] **Keyboard navigation** - Tab to dropdown trigger
- [ ] **Keyboard navigation** - Enter/Space opens dropdown
- [ ] **Keyboard navigation** - Arrow keys navigate items
- [ ] **Keyboard navigation** - Enter selects item
- [ ] **Keyboard navigation** - Escape closes dropdown
- [ ] **Focus visible** on dropdown items

**Screenshot Required:** Dropdown menu open (both logged in and logged out states)

**Notes:**
```


```

---

### 3.2 Hover & Focus States
- [ ] **All links** have hover state (color change)
- [ ] **All buttons** have hover state
- [ ] **Keyboard focus** visible on all interactive elements
- [ ] **Focus ring** is clearly visible (not removed with outline:none)
- [ ] **Navigation links** have hover color change
- [ ] **Form inputs** have focus border
- [ ] **Card components** have hover elevation/shadow effect

**Screenshot Required:** Various elements showing hover/focus states

**Notes:**
```


```

---

### 3.3 Color Contrast (WCAG AA)
Test all text/background combinations with a contrast checker

- [ ] **Body text** (#2C3E50) on white background: _________ (needs 4.5:1)
- [ ] **Teal links** (#2A7F7F) on white background: _________ (needs 4.5:1)
- [ ] **Forest green headings** (#2D5F4F) on white background: _________ (needs 4.5:1)
- [ ] **White text** on teal background (#2A7F7F): _________ (needs 4.5:1)
- [ ] **White text** on forest green (#2D5F4F): _________ (needs 4.5:1)
- [ ] **Text on cream background** (#F5F3EE): _________ (needs 4.5:1)
- [ ] **All failing combinations** have been fixed

**Tool Used:** _________________  
**Contrast Ratios Recorded:** Yes / No

**Notes:**
```


```

---

### 3.4 Responsive Design

#### Mobile (320-480px)
- [ ] **Homepage layout** adapts correctly
- [ ] **Navigation menu** (hamburger) works
- [ ] **Text is readable** at mobile size
- [ ] **Images scale** appropriately
- [ ] **Forms are usable** (fields not too small)
- [ ] **Buttons are tappable** (min 44x44px)
- [ ] **Footer stacks** vertically
- [ ] **No horizontal scrolling**
- [ ] **Testimonial cards** stack vertically

#### Small Tablet (481-767px)
- [ ] **Layout transitions** smoothly
- [ ] **Grid layouts** adjust (2-column where appropriate)
- [ ] **Navigation still in hamburger** menu
- [ ] **No content cutoff**

#### Tablet (768-1023px)
- [ ] **Desktop navigation appears**
- [ ] **Multi-column layouts** display correctly
- [ ] **Images and cards** in appropriate grid (2-3 columns)
- [ ] **Forms** use optimized layout

#### Desktop (1024px+)
- [ ] **Full layout displayed**
- [ ] **Content doesn't exceed max-width** (readable)
- [ ] **Images high quality**
- [ ] **Spacing and padding** appropriate

**Devices Tested:**
- Mobile: _________________
- Tablet: _________________
- Desktop: _________________

**Screenshot Required:** Same page at 4 different breakpoints

**Notes:**
```


```

---

## 4. Authentication & Authorization

### 4.1 Client Authentication
- [ ] **Signup page** accessible at `/signup`
- [ ] **User can create account** with name, email, password
- [ ] **Email validation** works
- [ ] **Password requirements** enforced
- [ ] **Duplicate email** shows error
- [ ] **Login page** accessible at `/login`
- [ ] **User can log in** with correct credentials
- [ ] **Wrong password** shows error
- [ ] **"Remember me"** works (if implemented)
- [ ] **Logout** works from user dropdown
- [ ] **Session persists** on page refresh
- [ ] **Forgot password** link works

**Screenshot Required:** Signup and login pages

**Notes:**
```


```

---

### 4.2 Admin Authentication
- [ ] **Admin login** accessible at `/admin/login`
- [ ] **Admin login UI** distinct from client login
- [ ] **Admin can log in** with admin credentials
- [ ] **Client credentials** do not work on admin login
- [ ] **Admin has separate session** from client
- [ ] **Admin sees "Admin Panel"** link in header
- [ ] **Client does not see** "Admin Panel" link

**Screenshot Required:** Admin login page and logged-in admin header

**Notes:**
```


```

---

### 4.3 Role-Based Access Control
- [ ] **Admin routes** protected from non-admin users
- [ ] **Accessing `/admin` as client** redirects to login/403
- [ ] **Admin can access** all admin routes
- [ ] **Client can access** dashboard routes
- [ ] **Client cannot access** admin routes even when logged in
- [ ] **Logging out** clears session properly
- [ ] **Direct URL access** to protected routes is blocked

**Screenshot Required:** Attempt to access admin page as client (error/redirect)

**Notes:**
```


```

---

## 5. Admin Dashboard Functionality

### 5.1 Admin Dashboard Overview
- [ ] **Admin dashboard** accessible at `/admin`
- [ ] **Dashboard shows statistics** (users, bookings, testimonials, etc.)
- [ ] **Navigation to all admin sections** works
- [ ] **Admin can access** Blog management
- [ ] **Admin can access** Bookings management
- [ ] **Admin can access** Categories management
- [ ] **Admin can access** Contacts management
- [ ] **Admin can access** Gallery management
- [ ] **Admin can access** Payments management
- [ ] **Admin can access** Services management
- [ ] **Admin can access** Subscribers management
- [ ] **Admin can access** Testimonials management

**Screenshot Required:** Admin dashboard with navigation

**Notes:**
```


```

---

### 5.2 Admin Content Management
(Test key CRUD operations in each section)

#### Blog Management
- [ ] **List all blog posts**
- [ ] **Create new blog post**
- [ ] **Edit existing blog post**
- [ ] **Delete blog post** (with confirmation)
- [ ] **Set post as featured**
- [ ] **Change post status** (draft/published)

#### Bookings Management
- [ ] **View all bookings**
- [ ] **Filter bookings** by status/date
- [ ] **Update booking status** (pending/confirmed/completed/cancelled)
- [ ] **View booking details**

#### Gallery Management
- [ ] **Upload new image**
- [ ] **Add image title and description**
- [ ] **Delete image** (with confirmation)
- [ ] **Images display in gallery**

#### Newsletter
- [ ] **View subscriber list**
- [ ] **Export subscribers** (if available)
- [ ] **Send newsletter** (or schedule)
- [ ] **Preview newsletter** before sending

**Screenshot Required:** Examples from 2-3 admin sections

**Notes:**
```


```

---

## 6. Forms & Security

### 6.1 Contact Form
- [ ] **Contact form** accessible at `/contact`
- [ ] **All fields** render correctly
- [ ] **Required fields** (name, email, message) enforced
- [ ] **Email validation** works
- [ ] **Phone field** accepts valid format
- [ ] **Message** has character limit
- [ ] **Submit button** disabled while submitting
- [ ] **Success message** displays after submission
- [ ] **Error message** displays on failure
- [ ] **Form resets** after submission

**Screenshot Required:** Contact form submission (success state)

**Notes:**
```


```

---

### 6.2 Newsletter Signup
- [ ] **Newsletter form** in footer works
- [ ] **Newsletter form** on homepage (if present) works
- [ ] **Email validation** enforced
- [ ] **Duplicate subscription** shows appropriate message
- [ ] **Success message** displays
- [ ] **Error handling** works

**Screenshot Required:** Newsletter signup success message

**Notes:**
```


```

---

### 6.3 Spam Protection
- [ ] **Honeypot field** added to contact form (hidden)
- [ ] **Honeypot field** added to testimonial form (hidden)
- [ ] **Honeypot field** added to newsletter form (hidden)
- [ ] **CAPTCHA** implemented (if using reCAPTCHA/hCaptcha)
- [ ] **Rate limiting** appears to be working (test multiple rapid submissions)

**Notes:**
```


```

---

### 6.4 Input Sanitization
(Requires code review + testing)

- [ ] **HTML tags in testimonials** are escaped/sanitized
- [ ] **Script tags** do not execute
- [ ] **SQL injection attempts** fail safely
- [ ] **XSS attempts** are blocked
- [ ] **All user input** validated on both client and server

**Testing Method:**
Try submitting forms with:
- `<script>alert('XSS')</script>`
- `'; DROP TABLE users; --`
- `<img src=x onerror=alert('XSS')>`

All should be safely handled without breaking the app.

**Notes:**
```


```

---

## 7. Performance & SEO

### 7.1 Page Load Performance
- [ ] **Homepage loads** in < 3 seconds
- [ ] **Images lazy load** (below fold)
- [ ] **Hero images** load with priority
- [ ] **No layout shift** during load
- [ ] **Fonts load smoothly** (no FOIT/FOUT)

**Tool:** Lighthouse / PageSpeed Insights  
**Performance Score:** _______  
**Screenshot Required:** Lighthouse performance report

**Notes:**
```


```

---

### 7.2 SEO & Meta Tags
- [ ] **Homepage title** is descriptive
- [ ] **Homepage meta description** present
- [ ] **About page** has unique title and description
- [ ] **Blog posts** have meta titles and descriptions
- [ ] **Open Graph tags** present
- [ ] **Twitter Card tags** present
- [ ] **All images have alt text**
- [ ] **Headings hierarchy** is logical (H1 > H2 > H3)

**Tool:** View Page Source / SEO Checker  
**SEO Score:** _______  

**Notes:**
```


```

---

### 7.3 Accessibility Audit
- [ ] **Lighthouse Accessibility Score:** _______ (Target: 90+)
- [ ] **All form inputs** have associated labels
- [ ] **All images** have meaningful alt text
- [ ] **Links have descriptive text** (not "click here")
- [ ] **Color alone** not used to convey information
- [ ] **Focus order** is logical
- [ ] **Headings** used correctly
- [ ] **ARIA attributes** used where needed
- [ ] **Landmark regions** defined (header, nav, main, footer)
- [ ] **Skip to content** link (if implemented)

**Tool:** Lighthouse Accessibility Audit  
**Screenshot Required:** Lighthouse accessibility report

**Notes:**
```


```

---

## 8. Cross-Browser Testing

### 8.1 Desktop Browsers
- [ ] **Chrome** (latest) - All features work
- [ ] **Firefox** (latest) - All features work
- [ ] **Edge** (latest) - All features work
- [ ] **Safari** (latest, macOS) - All features work

**Versions Tested:**
- Chrome: _______
- Firefox: _______
- Edge: _______
- Safari: _______

**Notes:**
```


```

---

### 8.2 Mobile Browsers
- [ ] **Chrome Mobile** (Android) - All features work
- [ ] **Safari Mobile** (iOS) - All features work
- [ ] **Samsung Internet** (if available) - All features work

**Devices/OS Tested:**
- Android: _______
- iOS: _______

**Notes:**
```


```

---

## 9. Console & Error Checking

### 9.1 JavaScript Console Errors
- [ ] **Homepage** - No console errors
- [ ] **About page** - No console errors
- [ ] **Services page** - No console errors
- [ ] **Blog page** - No console errors
- [ ] **Blog post** (individual) - No console errors
- [ ] **Testimonials page** - No console errors
- [ ] **Gallery page** - No console errors
- [ ] **Contact page** - No console errors
- [ ] **Booking page** - No console errors
- [ ] **Login page** - No console errors
- [ ] **Admin dashboard** - No console errors

**Screenshot Required:** Console on various pages (should be clean)

**Notes:**
```


```

---

### 9.2 Network Errors
- [ ] **No 404 errors** on page loads
- [ ] **No 500 errors** on page loads
- [ ] **All images load** successfully
- [ ] **API calls** return expected responses
- [ ] **No CORS errors**

**Screenshot Required:** Network tab showing successful requests

**Notes:**
```


```

---

## 10. Final Integration Tests

### 10.1 Complete User Journey (Client)
1. [ ] **Visit homepage**
2. [ ] **Click "Book a Session"** from hero
3. [ ] **Navigate to Testimonials page**
4. [ ] **Submit a testimonial** with photo
5. [ ] **Navigate to Blog**
6. [ ] **Read a blog post**
7. [ ] **Subscribe to newsletter** (footer)
8. [ ] **Navigate to Contact page**
9. [ ] **Submit contact form**
10. [ ] **Click social media links** (open in new tabs)
11. [ ] **Click email/phone/location** links (all work)

**All steps completed successfully:** Yes / No

**Notes:**
```


```

---

### 10.2 Complete Admin Journey
1. [ ] **Login as admin** at `/admin/login`
2. [ ] **View admin dashboard**
3. [ ] **Navigate to pending testimonials**
4. [ ] **Approve a testimonial**
5. [ ] **Edit a testimonial**
6. [ ] **Navigate to blog management**
7. [ ] **Create a new blog post**
8. [ ] **Publish blog post**
9. [ ] **Navigate to bookings**
10. [ ] **Update booking status**
11. [ ] **View subscribers list**
12. [ ] **Logout**

**All steps completed successfully:** Yes / No

**Notes:**
```


```

---

## 11. Documentation Review

- [ ] **AUDIT_REPORT.md** reviewed and accurate
- [ ] **MOCK_API_DOCUMENTATION.md** complete with all endpoints
- [ ] **JSON schemas** provided for all API requests
- [ ] **Security considerations** documented
- [ ] **Rate limiting** documented
- [ ] **Error codes** reference included
- [ ] **Admin runbook** created (see section 12)

**Notes:**
```


```

---

## 12. Linting & Code Quality

- [ ] **Run `npm run lint`** - All errors fixed
- [ ] **TypeScript errors** resolved
- [ ] **Console warnings** minimized
- [ ] **Unused imports** removed
- [ ] **Code formatted** consistently

**Lint Results:**
```


```

---

## Summary

### Total Tests
- **Passed:** ______
- **Failed:** ______
- **Needs Review:** ______

### Critical Issues
```


```

### Medium Issues
```


```

### Minor Issues
```


```

### Recommended Before Launch
```


```

---

## Sign-Off

**Tester Name:** _______________________  
**Date:** _______________________  
**Status:** ☐ Approved for Production  ☐ Needs Fixes  
**Signature:** _______________________

---

## Notes & Additional Observations
```






```
