# Security Implementation Guide
**Project:** Ìbáṣepọ̀ Connected Hearts Website  
**Date:** October 28, 2025  
**Version:** 1.0.0

---

## Overview

This document details all security measures implemented in the Connected Hearts website frontend, including spam protection, input sanitization, and recommendations for backend security.

---

## 1. Spam Protection (✅ Implemented)

### 1.1 Honeypot Fields

Honeypot fields have been added to all public forms to catch automated bots.

#### Implementation Details

**How it works:**
- Hidden field that's invisible to users but visible to bots
- If the field is filled, the submission is silently rejected
- Returns fake success message to fool spam bots

**Forms Protected:**
- ✅ Newsletter signup form
- ✅ Contact form
- ✅ Testimonials submission form

**Code Example:**
```tsx
// Hidden honeypot field
<input
  type="text"
  name="website"
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>

// Check in submit handler
if (honeypot) {
  console.log("[Security] Bot detected via honeypot")
  setStatus("success") // Fake success
  return
}
```

**Files Modified:**
- `components/newsletter-form.tsx`
- `app/contact/page.tsx`
- `app/testimonials/page.tsx`

---

### 1.2 Rate Limiting (Client-Side)

Rate limiting utilities have been created to prevent abuse.

**Location:** `lib/utils/security.ts`

**Usage Example:**
```tsx
import { checkRateLimit } from "@/lib/utils/security"

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Check rate limit
  const rateCheck = checkRateLimit("contact-form", 60, 3) // 3 attempts per 60 minutes
  
  if (!rateCheck.allowed) {
    setError(`Too many attempts. Please try again in ${rateCheck.retryAfter} seconds.`)
    return
  }
  
  // Proceed with submission
  // ...
}
```

**Recommended Limits:**
- Contact Form: 3 requests per hour
- Testimonial Submission: 2 requests per hour
- Newsletter Subscribe: 5 requests per hour

**Note:** Server-side rate limiting is still required for production.

---

### 1.3 CAPTCHA Integration (Recommended)

For production, implement Google reCAPTCHA v3 or hCaptcha.

**Recommended Implementation:**

```bash
npm install react-google-recaptcha-v3
```

```tsx
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const { executeRecaptcha } = useGoogleReCaptcha()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!executeRecaptcha) {
    console.log("Execute recaptcha not yet available")
    return
  }
  
  const token = await executeRecaptcha("submit_form")
  
  // Send token to backend for verification
  // Backend must verify with Google API
}
```

**Configuration:**
Add to `.env.local`:
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

## 2. Input Sanitization (✅ Utilities Created)

### 2.1 Security Utilities

Comprehensive security utilities have been created in `lib/utils/security.ts`.

#### Available Functions:

1. **sanitizeHtml(input: string)**
   - Escapes HTML special characters
   - Prevents XSS attacks
   ```tsx
   import { sanitizeHtml } from "@/lib/utils/security"
   const safe = sanitizeHtml(userInput)
   ```

2. **sanitizeInput(input: string)**
   - Removes script tags, iframes, event handlers
   - Removes javascript: and data: protocols
   ```tsx
   import { sanitizeInput } from "@/lib/utils/security"
   const safe = sanitizeInput(userInput)
   ```

3. **isValidEmail(email: string)**
   - Validates email format
   - Checks for common issues
   ```tsx
   import { isValidEmail } from "@/lib/utils/security"
   if (!isValidEmail(email)) {
     setError("Invalid email format")
   }
   ```

4. **validateImageFile(file: File, maxSizeInMB: number)**
   - Validates file type (images only)
   - Validates file size
   ```tsx
   import { validateImageFile } from "@/lib/utils/security"
   const result = validateImageFile(file, 5)
   if (!result.valid) {
     setError(result.error)
   }
   ```

5. **validatePasswordStrength(password: string)**
   - Checks password complexity
   - Returns strength rating and feedback
   ```tsx
   import { validatePasswordStrength } from "@/lib/utils/security"
   const result = validatePasswordStrength(password)
   console.log(result.strength) // "weak" | "medium" | "strong"
   ```

---

### 2.2 Usage in Forms

**Recommended Implementation:**

```tsx
import { sanitizeInput, isValidEmail } from "@/lib/utils/security"

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Sanitize text inputs
  const safeName = sanitizeInput(formData.name)
  const safeMessage = sanitizeInput(formData.message)
  
  // Validate email
  if (!isValidEmail(formData.email)) {
    setError("Invalid email address")
    return
  }
  
  // Send sanitized data to API
  await api.submit({
    name: safeName,
    email: formData.email,
    message: safeMessage,
  })
}
```

---

## 3. Security Headers (Backend Required)

### 3.1 Recommended Headers

Security headers configuration is available in `lib/utils/security.ts`.

**Add to `next.config.mjs`:**

```javascript
import { securityHeaders } from "./lib/utils/security.js"

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
```

**Headers Included:**
- `Strict-Transport-Security` - Force HTTPS
- `X-Frame-Options` - Prevent clickjacking
- `X-Content-Type-Options` - Prevent MIME sniffing
- `X-XSS-Protection` - Enable XSS filter
- `Referrer-Policy` - Control referer information
- `Permissions-Policy` - Control browser features

---

### 3.2 Content Security Policy (CSP)

CSP generator function available in `lib/utils/security.ts`.

**Implementation:**

```javascript
import { getContentSecurityPolicy } from "./lib/utils/security.js"

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: getContentSecurityPolicy(),
          },
        ],
      },
    ]
  },
}
```

**Note:** Adjust CSP in production to remove `unsafe-inline` and `unsafe-eval` where possible.

---

## 4. Authentication Security (Backend Required)

### 4.1 Password Requirements

Use the `validatePasswordStrength()` utility to enforce strong passwords.

**Minimum Requirements:**
- At least 8 characters
- Contains lowercase letters
- Contains uppercase letters
- Contains numbers
- Contains special characters

**Implementation:**
```tsx
import { validatePasswordStrength } from "@/lib/utils/security"

const result = validatePasswordStrength(password)

if (!result.valid) {
  setErrors(result.feedback)
  return
}
```

---

### 4.2 Session Management

**Recommendations for Backend:**

1. **Use HttpOnly Cookies**
   ```javascript
   res.cookie("token", jwtToken, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: "strict",
     maxAge: 24 * 60 * 60 * 1000, // 24 hours
   })
   ```

2. **Implement Session Timeout**
   - Client sessions: 24 hours
   - Admin sessions: 8 hours
   - Auto-refresh tokens before expiry

3. **Secure Token Storage**
   - Never store tokens in localStorage (XSS vulnerable)
   - Use HttpOnly cookies
   - Implement CSRF protection

---

### 4.3 Role-Based Access Control

**Current Implementation:**
- Separate login routes: `/login` (client) and `/admin/login` (admin)
- Role-based UI rendering using `isAdmin` flag
- Protected routes using middleware

**Verification Required:**
- [ ] Test client cannot access admin routes
- [ ] Test admin routes redirect unauthorized users
- [ ] Test session separation (client + admin can't coexist)

**File to Check:** `middleware.ts`

---

## 5. File Upload Security

### 5.1 Client-Side Validation

Use `validateImageFile()` utility for photo uploads.

**Implementation:**
```tsx
import { validateImageFile } from "@/lib/utils/security"

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
  
  const result = validateImageFile(file, 5) // 5MB limit
  
  if (!result.valid) {
    setError(result.error)
    return
  }
  
  setFormData({ ...formData, photo: file })
}
```

---

### 5.2 Server-Side Requirements

**Backend Must Implement:**

1. **File Type Validation**
   - Whitelist only: JPEG, PNG, WebP, GIF
   - Check magic bytes, not just extension
   - Use libraries like `file-type` (npm)

2. **File Size Limits**
   - Testimonial photos: 5MB max
   - Gallery images: 10MB max
   - Enforce on server, not just client

3. **Filename Sanitization**
   ```typescript
   import { sanitizeFilename } from "@/lib/utils/security"
   
   const safeFilename = sanitizeFilename(file.originalname)
   const uniqueFilename = `${Date.now()}-${safeFilename}`
   ```

4. **Virus Scanning**
   - Use ClamAV or similar for uploaded files
   - Scan before saving to storage

5. **Separate Storage**
   - Store uploads in separate subdomain/bucket
   - Serve with `Content-Disposition: inline` for images
   - Never execute uploaded files

---

## 6. API Security (Backend Required)

### 6.1 Input Validation

All API endpoints must validate input.

**Use Zod for Schema Validation:**

```typescript
import { z } from "zod"

const TestimonialSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  service: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string().min(20).max(1000),
})

// In API handler
try {
  const data = TestimonialSchema.parse(req.body)
  // Data is now validated and typed
} catch (error) {
  return res.status(400).json({ error: "Validation failed" })
}
```

---

### 6.2 Rate Limiting

**Use express-rate-limit or similar:**

```javascript
import rateLimit from "express-rate-limit"

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per hour
  message: "Too many contact form submissions, please try again later.",
})

app.post("/api/contact", contactLimiter, async (req, res) => {
  // Handler
})
```

**Recommended Limits:**
- Contact Form: 3/hour per IP
- Testimonial: 2/hour per IP
- Newsletter: 5/hour per IP
- Login Attempts: 5/15min per IP
- API General: 100/15min per IP

---

### 6.3 CORS Configuration

```javascript
import cors from "cors"

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
```

---

### 6.4 SQL Injection Prevention

**Use Parameterized Queries:**

```typescript
// ❌ NEVER do this
const query = `SELECT * FROM users WHERE email = '${email}'`

// ✅ Always use parameterized queries
const query = "SELECT * FROM users WHERE email = ?"
const result = await db.query(query, [email])
```

**Or use ORM (Prisma, TypeORM, etc.):**

```typescript
const user = await prisma.user.findUnique({
  where: { email },
})
```

---

## 7. Environment Variables

### 7.1 Required Environment Variables

**Create `.env.local` file:**

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# API Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Email Service (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload
UPLOAD_MAX_SIZE=5242880 # 5MB in bytes
CLOUDINARY_URL=cloudinary://key:secret@cloud_name

# URLs
NEXT_PUBLIC_SITE_URL=https://connectedhearts.com
FRONTEND_URL=https://connectedhearts.com
```

**Security Notes:**
- Never commit `.env` files to git
- Use different secrets for dev/staging/production
- Rotate secrets regularly
- Use environment-specific configurations

---

## 8. Monitoring & Logging

### 8.1 Security Logging

**Log the following events:**
- Failed login attempts
- Rate limit violations
- Honeypot triggers
- File upload attempts
- XSS/Injection attempts
- Admin actions (approve/delete/edit)

**Example:**
```typescript
logger.warn({
  event: "honeypot_triggered",
  form: "contact",
  ip: req.ip,
  timestamp: new Date().toISOString(),
})
```

---

### 8.2 Error Handling

**Never expose sensitive info in errors:**

```typescript
// ❌ BAD
catch (error) {
  return res.status(500).json({ error: error.message })
}

// ✅ GOOD
catch (error) {
  logger.error(error) // Log full error internally
  return res.status(500).json({ 
    error: "An error occurred. Please try again later." 
  })
}
```

---

## 9. Testing Security

### 9.1 Manual Testing

**Test for XSS:**
```
Try submitting: <script>alert('XSS')</script>
Should be: escaped or rejected
```

**Test for SQL Injection:**
```
Try email: admin'--
Should be: rejected or escaped
```

**Test Honeypot:**
```
Fill hidden field with JavaScript
Should be: silently rejected
```

**Test Rate Limiting:**
```
Submit form 10 times rapidly
Should be: blocked after limit
```

---

### 9.2 Security Checklist

Before production deployment:

- [ ] All forms have honeypot fields
- [ ] Rate limiting implemented on backend
- [ ] Input sanitization on all user inputs
- [ ] SQL parameterized queries used
- [ ] Passwords hashed (bcrypt/argon2)
- [ ] HTTPS enforced (HSTS header)
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] File uploads validated and scanned
- [ ] Error messages don't expose sensitive info
- [ ] Environment variables secured
- [ ] Session tokens in HttpOnly cookies
- [ ] CSRF protection implemented
- [ ] Admin routes properly protected
- [ ] Logging and monitoring in place

---

## 10. Incident Response

### 10.1 If Security Breach Detected

1. **Immediate Actions:**
   - Take affected service offline
   - Revoke all active sessions
   - Rotate all secrets and keys
   - Enable maintenance mode

2. **Investigation:**
   - Review logs for entry point
   - Identify compromised data
   - Document timeline of events

3. **Remediation:**
   - Patch vulnerability
   - Reset passwords for affected users
   - Notify affected users
   - Update security measures

4. **Post-Incident:**
   - Conduct security audit
   - Update security documentation
   - Improve monitoring
   - Train team on new procedures

---

## 11. Regular Security Maintenance

### 11.1 Monthly Tasks

- [ ] Review and rotate API keys
- [ ] Check for dependency vulnerabilities: `npm audit`
- [ ] Review failed login attempts
- [ ] Check rate limit logs
- [ ] Update security packages

### 11.2 Quarterly Tasks

- [ ] Full security audit
- [ ] Penetration testing
- [ ] Review and update security policies
- [ ] Team security training
- [ ] Backup verification

---

## 12. Resources & References

### Security Tools
- **npm audit** - Check for vulnerable dependencies
- **Snyk** - Continuous security monitoring
- **OWASP ZAP** - Web application security scanner
- **Lighthouse** - Includes basic security checks

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

## Summary

### ✅ Completed (Frontend)
- Honeypot spam protection on all forms
- Security utility functions created
- Input sanitization utilities
- Rate limiting utilities (client-side)
- File validation utilities
- Security headers configuration
- Password strength validation

### ⚠️ Requires Backend Implementation
- Server-side rate limiting
- CAPTCHA integration
- Database encryption
- Session management
- File virus scanning
- API input validation
- SQL injection prevention
- Audit logging

### 📚 Documentation
- This security guide
- API documentation with security notes
- QA checklist with security tests

---

**Status:** Frontend security measures implemented  
**Next Steps:** Backend security implementation required before production  
**Last Updated:** October 28, 2025

---

*For questions or security concerns, contact the development team immediately.*
