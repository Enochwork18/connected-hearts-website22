# Security Documentation

## Frontend Security Measures

### Input Sanitization

**DOMPurify Integration**:
```typescript
import DOMPurify from 'dompurify'

// Sanitize rich text before rendering
const cleanHTML = DOMPurify.sanitize(userContent, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'rel']
})
```

**Current Usage**:
- Blog post content
- Testimonial text
- User comments
- Any user-generated HTML

### Form Validation

**Zod Schemas** (already in use):
```typescript
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters')
})
```

**Honeypot Fields** (implemented in testimonials):
```tsx
<input
  type="text"
  name="website"
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```

### XSS Prevention

✅ **Implemented**:
- All user input sanitized with DOMPurify
- React auto-escapes by default
- No `dangerouslySetInnerHTML` without sanitization

❌ **Avoid**:
- Direct HTML injection
- `eval()` or `new Function()`
- Inline event handlers in JSX

### CSRF Protection

**Frontend Measures**:
- JWT tokens in Authorization header (not cookies)
- SameSite cookie attribute for any cookies
- Custom headers for state-changing requests

**Backend Requirements**:
- Implement CSRF tokens for cookie-based auth
- Validate Origin/Referer headers
- Use double-submit cookie pattern

### Authentication & Session

**Current Implementation**:
```typescript
// Store JWT in localStorage
localStorage.setItem('auth_token', token)

// Send with requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

**⚠️ Production Recommendations**:
- Migrate to HttpOnly cookies
- Implement refresh token rotation
- Add session timeout (15-30 min)
- Implement remember-me securely

### Rate Limiting UI

**Visual Feedback**:
```typescript
const [isRateLimited, setIsRateLimited] = useState(false)
const [retryAfter, setRetryAfter] = useState(0)

// Handle 429 response
if (response.status === 429) {
  const retryAfter = response.headers.get('Retry-After')
  setIsRateLimited(true)
  setRetryAfter(parseInt(retryAfter))
}
```

## Backend Security Requirements

### Essential Headers

```
# Required HTTP Security Headers
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: no-referrer-when-downgrade
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### HTTPS Enforcement

```typescript
// Next.js middleware
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' && 
      request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    )
  }
}
```

### JWT Best Practices

**Token Structure**:
```json
{
  "sub": "user-id",
  "role": "client",
  "iat": 1635523200,
  "exp": 1635526800
}
```

**Requirements**:
- Use strong secret (256-bit minimum)
- Short expiry (15 min access, 7 days refresh)
- Include only necessary claims
- Validate signature on every request
- Implement token blacklist for logout

### Database Security

**Query Parameterization**:
```typescript
// ✅ Good - Parameterized
db.query('SELECT * FROM users WHERE email = ?', [email])

// ❌ Bad - SQL Injection risk
db.query(`SELECT * FROM users WHERE email = '${email}'`)
```

**Requirements**:
- Use ORM or parameterized queries
- Implement row-level security
- Encrypt sensitive data at rest
- Regular backups
- Audit logging

### File Upload Security

**Validation**:
```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

function validateFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }
  // Additional: scan for malware
}
```

**Storage**:
- Use CDN/object storage (not local filesystem)
- Generate random filenames
- Set proper Content-Type headers
- Implement virus scanning

### API Security

**Rate Limiting** (backend implementation):
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

**Request Validation**:
```typescript
import { z } from 'zod'

app.post('/api/contact', validate(contactSchema), async (req, res) => {
  // Handler
})
```

### Logging & Monitoring

**Log Events**:
- Failed login attempts
- Password changes
- Admin actions
- File uploads
- API errors
- Suspicious activity

**Tools**:
- Sentry for error tracking
- LogRocket for session replay
- CloudWatch/DataDog for metrics

## Webhook Security

**Verification**:
```typescript
function verifyWebhookSignature(payload: string, signature: string, secret: string) {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  )
}
```

## Environment Variables

**Never commit**:
- API keys
- Database credentials
- JWT secrets
- Third-party service keys

**Use .env.local** (gitignored):
```
DATABASE_URL=...
JWT_SECRET=...
STRIPE_SECRET_KEY=...
SENDGRID_API_KEY=...
```

## Production Checklist

### Code
- [ ] Remove all `console.log` statements
- [ ] No hardcoded secrets
- [ ] Error messages don't leak info
- [ ] Sanitize all user inputs
- [ ] Validate all API responses

### Configuration
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CORS properly restricted
- [ ] CSP policy defined
- [ ] Rate limiting enabled

### Authentication
- [ ] JWT secrets rotated
- [ ] Session timeout configured
- [ ] Password requirements enforced
- [ ] Account lockout after failed attempts
- [ ] 2FA available (future)

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Logging configured
- [ ] Alerts for suspicious activity
- [ ] Regular security audits

### Compliance
- [ ] GDPR compliance (if EU users)
- [ ] Data retention policy
- [ ] Privacy policy updated
- [ ] Cookie consent banner
- [ ] User data export/deletion

## Incident Response

**Security Breach Steps**:
1. Isolate affected systems
2. Revoke compromised credentials
3. Analyze breach scope
4. Notify affected users (if required)
5. Fix vulnerability
6. Post-mortem analysis

**Contact**:
- Security Email: security@ibasepo.org
- Response Time: < 24 hours

## Dependency Security

**Regular Updates**:
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update dependencies
npm update
```

**Automated Scanning**:
- Dependabot (GitHub)
- Snyk
- npm audit in CI/CD

## Testing

### Security Test Cases

```typescript
describe('Security', () => {
  it('sanitizes XSS in testimonials', () => {
    const malicious = '<script>alert("xss")</script>'
    const clean = sanitize(malicious)
    expect(clean).not.toContain('<script>')
  })

  it('prevents SQL injection in search', () => {
    const malicious = "'; DROP TABLE users; --"
    expect(() => search(malicious)).not.toThrow()
  })

  it('rejects large file uploads', () => {
    const largeFile = new File(['x'.repeat(10e6)], 'large.jpg')
    expect(validateFile(largeFile)).toThrow('File too large')
  })
})
```

## Penetration Testing

**Recommended Tools**:
- OWASP ZAP
- Burp Suite
- Nmap
- Nikto

**Annual Assessment**:
- Hire security firm for audit
- Vulnerability scan
- Penetration test
- Code review

---

**Last Updated**: 2025-10-29  
**Status**: Frontend measures implemented  
**Next**: Backend security implementation
