/**
 * Security Utilities for Input Sanitization
 * Connected Hearts Website
 * 
 * These utilities help prevent XSS, injection attacks, and other security vulnerabilities.
 */

/**
 * Sanitizes a string by escaping HTML special characters
 * Prevents XSS attacks by converting potentially dangerous characters
 * 
 * @param input - The string to sanitize
 * @returns Sanitized string safe for display
 */
export function sanitizeHtml(input: string): string {
  if (!input) return ""
  
  const htmlEscapeMap: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  }
  
  return input.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Sanitizes user input by removing potentially dangerous characters
 * while preserving basic formatting
 * 
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return ""
  
  // Remove any script tags
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
  
  // Remove any iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
  
  // Remove any onclick/onerror/onload attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, "")
  
  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, "")
  
  return sanitized.trim()
}

/**
 * Validates email format
 * 
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  // Additional check for common email format issues
  if (email.length > 254) return false // Max email length per RFC 5321
  if (email.startsWith(".") || email.endsWith(".")) return false
  if (email.includes("..")) return false
  
  return emailRegex.test(email)
}

/**
 * Validates phone number format (international)
 * 
 * @param phone - Phone number to validate
 * @returns true if valid phone format
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "")
  
  // Check if it's a valid international format
  // Must start with + and have 7-15 digits
  const phoneRegex = /^\+?[1-9]\d{6,14}$/
  
  return phoneRegex.test(cleaned)
}

/**
 * Sanitizes filename for safe storage
 * Removes path traversal attempts and dangerous characters
 * 
 * @param filename - Original filename
 * @returns Sanitized filename
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return "file"
  
  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\.\//g, "")
  sanitized = sanitized.replace(/\.\.\\/g, "")
  
  // Remove any path separators
  sanitized = sanitized.replace(/[/\\]/g, "")
  
  // Only allow alphanumeric, dash, underscore, and single dot before extension
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, "_")
  
  // Ensure it's not empty
  if (!sanitized || sanitized === ".") {
    sanitized = "file"
  }
  
  return sanitized
}

/**
 * Validates file type for uploads
 * 
 * @param file - File object to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns true if file type is allowed
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  if (!file) return false
  
  return allowedTypes.includes(file.type)
}

/**
 * Validates file size
 * 
 * @param file - File object to validate
 * @param maxSizeInMB - Maximum allowed size in megabytes
 * @returns true if file size is within limit
 */
export function isValidFileSize(file: File, maxSizeInMB: number): boolean {
  if (!file) return false
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

/**
 * Validates image file for upload
 * 
 * @param file - File object to validate
 * @param maxSizeInMB - Maximum allowed size in megabytes (default: 5MB)
 * @returns Object with validation result and error message if any
 */
export function validateImageFile(
  file: File,
  maxSizeInMB: number = 5
): { valid: boolean; error?: string } {
  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
  
  if (!isValidFileType(file, allowedImageTypes)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.",
    }
  }
  
  if (!isValidFileSize(file, maxSizeInMB)) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeInMB}MB limit.`,
    }
  }
  
  return { valid: true }
}

/**
 * Rate limiting helper (client-side)
 * Tracks submission timestamps to prevent spam
 * 
 * @param key - Unique key for the action (e.g., 'contact-form', 'testimonial-submit')
 * @param limitInMinutes - Time window in minutes
 * @param maxAttempts - Maximum attempts allowed in the time window
 * @returns Object with allowed status and retry time if blocked
 */
export function checkRateLimit(
  key: string,
  limitInMinutes: number = 60,
  maxAttempts: number = 3
): { allowed: boolean; retryAfter?: number } {
  const storageKey = `rateLimit_${key}`
  const now = Date.now()
  
  // Get previous attempts from localStorage
  const stored = localStorage.getItem(storageKey)
  let attempts: number[] = stored ? JSON.parse(stored) : []
  
  // Remove attempts outside the time window
  const windowStart = now - limitInMinutes * 60 * 1000
  attempts = attempts.filter((timestamp) => timestamp > windowStart)
  
  // Check if rate limit exceeded
  if (attempts.length >= maxAttempts) {
    const oldestAttempt = Math.min(...attempts)
    const retryAfter = Math.ceil((oldestAttempt + limitInMinutes * 60 * 1000 - now) / 1000)
    
    return {
      allowed: false,
      retryAfter,
    }
  }
  
  // Add current attempt
  attempts.push(now)
  localStorage.setItem(storageKey, JSON.stringify(attempts))
  
  return { allowed: true }
}

/**
 * Clears rate limit for a specific key
 * Useful for testing or after successful verification
 * 
 * @param key - The rate limit key to clear
 */
export function clearRateLimit(key: string): void {
  const storageKey = `rateLimit_${key}`
  localStorage.removeItem(storageKey)
}

/**
 * SQL Injection prevention for search queries
 * Escapes special SQL characters
 * 
 * @param input - User input string
 * @returns Escaped string safe for SQL queries
 */
export function escapeSqlString(input: string): string {
  if (!input) return ""
  
  return input
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\x00/g, "\\0")
    .replace(/\x1a/g, "\\Z")
}

/**
 * Content Security Policy (CSP) generator
 * Returns recommended CSP headers for Next.js app
 * 
 * @returns CSP header string
 */
export function getContentSecurityPolicy(): string {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline for dev
    "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ]
  
  return csp.join("; ")
}

/**
 * Security headers configuration for Next.js
 * Add these to next.config.js
 */
export const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

/**
 * Password strength validator
 * 
 * @param password - Password to validate
 * @returns Object with validation result and feedback
 */
export function validatePasswordStrength(password: string): {
  valid: boolean
  strength: "weak" | "medium" | "strong"
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0
  
  if (!password) {
    return {
      valid: false,
      strength: "weak",
      feedback: ["Password is required"],
    }
  }
  
  // Length check
  if (password.length < 8) {
    feedback.push("Password must be at least 8 characters")
  } else {
    score++
  }
  
  // Complexity checks
  if (!/[a-z]/.test(password)) {
    feedback.push("Add lowercase letters")
  } else {
    score++
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push("Add uppercase letters")
  } else {
    score++
  }
  
  if (!/\d/.test(password)) {
    feedback.push("Add numbers")
  } else {
    score++
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push("Add special characters (!@#$%...)")
  } else {
    score++
  }
  
  // Determine strength
  let strength: "weak" | "medium" | "strong" = "weak"
  if (score >= 4) strength = "strong"
  else if (score >= 2) strength = "medium"
  
  return {
    valid: score >= 3,
    strength,
    feedback,
  }
}
