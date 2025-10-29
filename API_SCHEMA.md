# API Schema Documentation

## Overview

This document defines all API endpoints for the Connected Hearts platform. Currently implemented as MSW mocks for frontend development, ready for backend integration.

**Base URL**: `/api`  
**Authentication**: JWT Bearer tokens  
**Content-Type**: `application/json`

---

## Authentication

### POST /auth/login
Login user and receive JWT token.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "client | admin"
  },
  "token": "eyJhbGc..."
}
```

**Error (401)**:
```json
{
  "error": "Invalid credentials"
}
```

**Mock Credentials**:
- Admin: `admin@ibasepo.org` / `admin123`
- Any email/password combination creates client user

---

### POST /auth/signup
Register new user account.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "confirmPassword": "securepass123"
}
```

**Response (201)**:
```json
{
  "user": {
    "id": "2",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "client"
  },
  "token": "eyJhbGc..."
}
```

---

### POST /auth/logout
Logout current user.

**Headers**: `Authorization: Bearer {token}`

**Response (200)**:
```json
{
  "success": true
}
```

---

### GET /auth/session
Get current session info.

**Headers**: `Authorization: Bearer {token}`

**Response (200)**:
```json
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "client"
  }
}
```

---

## Testimonials

### GET /testimonials
Get all approved testimonials (public) or all testimonials (admin).

**Query Params**:
- `status` (optional): `pending | approved | rejected`
- `limit` (optional): number, default 50
- `offset` (optional): number, default 0

**Response (200)**:
```json
{
  "testimonials": [
    {
      "id": "1",
      "name": "Sarah Johnson",
      "email": "sarah@example.com",
      "service": "Marriage Counseling",
      "rating": 5,
      "text": "Life-changing experience!",
      "status": "approved | pending | rejected",
      "createdAt": "2025-10-29T10:00:00Z"
    }
  ]
}
```

---

### POST /testimonials
Submit new testimonial.

**Request**:
```json
{
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "service": "Marriage Counseling",
  "rating": 5,
  "text": "Amazing service!",
  "photo": null
}
```

**Response (201)**:
```json
{
  "testimonial": {
    "id": "2",
    "name": "Sarah Johnson",
    "status": "pending",
    "createdAt": "2025-10-29T10:00:00Z"
  }
}
```

---

### PATCH /testimonials/:id/approve
Approve testimonial (admin only).

**Headers**: `Authorization: Bearer {token}`

**Response (200)**:
```json
{
  "testimonial": {
    "id": "1",
    "status": "approved"
  }
}
```

---

## Blog

### GET /blog
Get all blog posts.

**Query Params**:
- `limit` (optional): number
- `offset` (optional): number
- `category` (optional): string

**Response (200)**:
```json
{
  "posts": [
    {
      "id": "1",
      "title": "Building Stronger Families",
      "slug": "building-stronger-families",
      "excerpt": "Discover the keys...",
      "content": "<p>Full content...</p>",
      "author": "Elizabeth Omolara",
      "category": "Marriage",
      "featuredImage": "/images/blog-1.jpg",
      "publishedAt": "2025-10-29T10:00:00Z"
    }
  ]
}
```

---

### GET /blog/:slug
Get single blog post by slug.

**Response (200)**:
```json
{
  "post": {
    "id": "1",
    "title": "Building Stronger Families",
    "slug": "building-stronger-families",
    "content": "<p>Full HTML content...</p>",
    "author": "Elizabeth Omolara",
    "publishedAt": "2025-10-29T10:00:00Z"
  }
}
```

---

### POST /blog
Create new blog post (admin only).

**Headers**: `Authorization: Bearer {token}`

**Request**:
```json
{
  "title": "New Post Title",
  "slug": "new-post-title",
  "excerpt": "Short description...",
  "content": "<p>Full content...</p>",
  "category": "Marriage",
  "featuredImage": "/images/new-post.jpg"
}
```

**Response (201)**:
```json
{
  "post": {
    "id": "3",
    "title": "New Post Title",
    "publishedAt": "2025-10-29T10:00:00Z"
  }
}
```

---

## Bookings

### POST /bookings
Create new booking.

**Headers**: `Authorization: Bearer {token}` (optional for guests)

**Request**:
```json
{
  "service": "Marriage Counseling",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+447958709238",
  "preferredDate": "2025-11-15",
  "preferredTime": "14:00",
  "message": "Looking forward to the session"
}
```

**Response (201)**:
```json
{
  "booking": {
    "id": "1",
    "service": "Marriage Counseling",
    "date": "2025-11-15T14:00:00Z",
    "status": "pending",
    "createdAt": "2025-10-29T10:00:00Z"
  }
}
```

---

### GET /bookings
Get user's bookings (or all for admin).

**Headers**: `Authorization: Bearer {token}`

**Response (200)**:
```json
{
  "bookings": [
    {
      "id": "1",
      "service": "Marriage Counseling",
      "date": "2025-11-15T14:00:00Z",
      "status": "confirmed | pending | cancelled",
      "createdAt": "2025-10-29T10:00:00Z"
    }
  ]
}
```

---

## Services

### GET /services
Get all available services.

**Response (200)**:
```json
{
  "services": [
    {
      "id": "1",
      "title": "Marriage Counseling",
      "slug": "marriage-counseling",
      "description": "Professional marriage counseling services...",
      "price": 150,
      "duration": 60,
      "features": ["One-on-one sessions", "Confidential", "Faith-based"]
    }
  ]
}
```

---

## Gallery

### GET /gallery
Get all gallery images.

**Response (200)**:
```json
{
  "images": [
    {
      "id": "1",
      "url": "/images/gallery-1.jpg",
      "title": "Workshop Session",
      "description": "Community workshop",
      "uploadedAt": "2025-10-29T10:00:00Z"
    }
  ]
}
```

---

### POST /gallery
Upload new gallery image (admin only).

**Headers**: `Authorization: Bearer {token}`

**Content-Type**: `multipart/form-data`

**Request**:
```
FormData:
- file: [image file]
- title: "Workshop Session"
- description: "Community workshop"
```

**Response (201)**:
```json
{
  "image": {
    "id": "2",
    "url": "/images/gallery-new.jpg",
    "uploadedAt": "2025-10-29T10:00:00Z"
  }
}
```

---

## Newsletter

### POST /newsletter
Subscribe to newsletter.

**Request**:
```json
{
  "email": "subscriber@example.com"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Successfully subscribed"
}
```

---

## Contact

### POST /contact
Submit contact form.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about services",
  "message": "I would like to know more about..."
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "submissionId": "12345"
}
```

---

## File Upload

### POST /uploads
Upload file with progress tracking.

**Headers**: `Authorization: Bearer {token}`

**Content-Type**: `multipart/form-data`

**Response (200)**:
```json
{
  "url": "https://cdn.example.com/files/abc123.jpg",
  "filename": "profile-photo.jpg",
  "size": 1024000
}
```

---

## Admin Stats

### GET /admin/stats
Get dashboard statistics (admin only).

**Headers**: `Authorization: Bearer {token}`

**Response (200)**:
```json
{
  "stats": {
    "totalUsers": 150,
    "totalBookings": 45,
    "pendingTestimonials": 8,
    "totalRevenue": 15000,
    "recentBookings": 12,
    "activeSubscribers": 230
  }
}
```

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": {
    "field": "email",
    "message": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## Rate Limiting

- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 300 requests/minute
- **Admin endpoints**: 1000 requests/minute

**Rate limit headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635523200
```

---

## Backend Integration Checklist

- [ ] Replace MSW handlers with real API calls
- [ ] Implement JWT authentication
- [ ] Setup database (PostgreSQL/MongoDB)
- [ ] Configure file storage (S3/Cloudinary)
- [ ] Add rate limiting middleware
- [ ] Setup CORS properly
- [ ] Implement request validation
- [ ] Add logging and monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Configure email service
- [ ] Add webhook endpoints
- [ ] Implement caching layer
- [ ] Setup CI/CD pipeline

---

## Testing

### Enable MSW Mocks (Development)

```typescript
// app/layout.tsx or similar
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('@/lib/mocks/browser')
  worker.start()
}
```

### Test Endpoints

```bash
# In browser console after MSW is running
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@ibasepo.org', password: 'admin123' })
})
```

---

**Last Updated**: 2025-10-29  
**Status**: Mock Implementation Complete  
**Backend**: Ready for integration
