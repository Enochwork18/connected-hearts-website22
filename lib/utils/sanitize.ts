import DOMPurify from "dompurify"

/**
 * Sanitize HTML content to prevent XSS attacks
 * Use this for any user-generated content displayed in the UI
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === "undefined") {
    // Server-side: return as-is, sanitization happens client-side
    return dirty
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li", "blockquote"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  })
}

/**
 * Sanitize plain text input (escape HTML entities)
 */
export function sanitizeText(input: string): string {
  if (typeof window === "undefined") {
    return input
  }

  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (basic)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
  return phoneRegex.test(phone)
}

/**
 * Validate password strength
 * At least 6 characters for MVP (document stronger requirements for production)
 */
export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" }
  }

  // For production, enforce: 8+ chars, uppercase, lowercase, number, special char
  // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
  //   return { valid: false, message: "Password must contain uppercase, lowercase, number, and special character" }
  // }

  return { valid: true }
}

/**
 * Sanitize URL to prevent javascript: and data: URLs
 */
export function sanitizeUrl(url: string): string {
  const dangerous = /^(javascript|data|vbscript):/i
  if (dangerous.test(url)) {
    return ""
  }
  return url
}
