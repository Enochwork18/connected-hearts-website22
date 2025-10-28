# API Schema Documentation

**Project:** Ìbáṣepọ̀ Connected Hearts  
**Date:** 2025-10-28  
**Version:** 1.0.0 (Mock Implementation)

## Overview

This document describes all API endpoints currently mocked in the frontend. Each endpoint includes:
- HTTP method and path
- Request/response formats with JSON schemas
- Expected status codes
- Authentication requirements
- Backend implementation notes

## Base URL

```
Development: http://localhost:3000/api
Production: https://api.connectedhearts.com
```

Set via environment variable:
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.connectedhearts.com
```

---

## Authentication Endpoints

### POST /auth/signup
**Description:** Register new user account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "+1234567890" // optional
}
```

**Response (201):**
```json
{
  "user": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "role": "user",
    "createdAt": "2025-10-28T12:00:00Z",
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**
- 400: Email already exists
- 422: Validation error

---

### POST /auth/login
**Description:** User login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2025-10-28T12:00:00Z",
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### POST /auth/admin/login
**Description:** Admin login

**Request:** Same as /auth/login

**Response (200):** Same as /auth/login but with `role: "admin"`

**Errors:**
- 401: Invalid admin credentials
- 403: User is not an admin

---

### GET /auth/me
**Description:** Get current user profile

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "isActive": true
}
```

---

### POST /auth/logout
**Description:** Logout user (clear session)

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Payment Endpoints

### POST /payments/create-intent
**Description:** Create payment intent

**Headers:**
```
Authorization: Bearer {token}
Idempotency-Key: idem_{timestamp}_{random}
```

**Request:**
```json
{
  "amount": 10000, // cents
  "currency": "USD",
  "provider": "stripe", // or "paystack", "paypal"
  "metadata": {
    "bookingId": "bkg_123",
    "serviceId": "svc_456"
  }
}
```

**Response (201):**
```json
{
  "id": "pi_abc123",
  "amount": 10000,
  "currency": "USD",
  "status": "idle",
  "clientSecret": "pi_secret_xyz789",
  "provider": "stripe",
  "metadata": {},
  "createdAt": "2025-10-28T12:00:00Z",
  "updatedAt": "2025-10-28T12:00:00Z"
}
```

---

### POST /payments/confirm
**Description:** Confirm payment with payment method

**Headers:**
```
Authorization: Bearer {token}
Idempotency-Key: idem_{timestamp}_{random}
```

**Request:**
```json
{
  "paymentIntentId": "pi_abc123",
  "paymentMethod": {
    "type": "card",
    "last4": "4242",
    "brand": "visa"
  }
}
```

**Response (200):**
```json
{
  "id": "pi_abc123",
  "status": "succeeded", // or "failed"
  "amount": 10000,
  "updatedAt": "2025-10-28T12:01:00Z"
}
```

---

### POST /payments/refund
**Description:** Create refund for payment

**Request:**
```json
{
  "paymentIntentId": "pi_abc123",
  "amount": 5000 // optional, defaults to full amount
}
```

**Response (200):**
```json
{
  "id": "re_abc123",
  "status": "succeeded",
  "amount": 5000
}
```

---

### POST /webhooks/payment
**Description:** Webhook for async payment updates (backend only)

**Headers:**
```
Stripe-Signature: t=timestamp,v1=signature
```

**Request:**
```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_abc123",
      "status": "succeeded"
    }
  }
}
```

**Response (200):**
```json
{
  "received": true
}
```

---

## Booking Endpoints

### POST /bookings
**Description:** Create booking

**Request:**
```json
{
  "userId": "usr_abc123",
  "serviceId": "svc_123",
  "serviceName": "Marriage Counseling",
  "date": "2025-11-01",
  "time": "10:00",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "clientPhone": "+1234567890",
  "notes": "First session",
  "amount": 10000
}
```

**Response (201):**
```json
{
  "id": "bkg_abc123",
  "userId": "usr_abc123",
  "serviceId": "svc_123",
  "status": "pending",
  "paymentStatus": "pending",
  "createdAt": "2025-10-28T12:00:00Z"
}
```

---

### GET /bookings/user/:userId
**Description:** Get user's bookings

**Response (200):**
```json
[
  {
    "id": "bkg_abc123",
    "serviceName": "Marriage Counseling",
    "date": "2025-11-01",
    "time": "10:00",
    "status": "confirmed",
    "amount": 10000
  }
]
```

---

## Upload Endpoints

### POST /uploads
**Description:** Upload file (avatar, gallery image)

**Headers:**
```
Content-Type: multipart/form-data
```

**Request:**
```
file: [binary data]
type: "avatar" | "gallery" | "blog"
```

**Response (200):**
```json
{
  "url": "https://storage.connectedhearts.com/uploads/1234567890-filename.jpg",
  "filename": "filename.jpg",
  "size": 245678,
  "type": "image/jpeg"
}
```

---

## Testimonial Endpoints

### POST /testimonials
**Description:** Submit testimonial

**Request:**
```json
{
  "userId": "usr_abc123",
  "name": "John Doe",
  "isAnonymous": false,
  "service": "Marriage Counseling",
  "rating": 5,
  "quote": "Excellent service!",
  "photo": "https://..."
}
```

**Response (201):**
```json
{
  "id": "tst_abc123",
  "status": "pending",
  "createdAt": "2025-10-28T12:00:00Z"
}
```

---

### GET /testimonials
**Description:** Get approved testimonials (public)

**Response (200):**
```json
[
  {
    "id": "tst_abc123",
    "name": "John Doe",
    "service": "Marriage Counseling",
    "rating": 5,
    "quote": "Excellent service!",
    "createdAt": "2025-10-28T12:00:00Z"
  }
]
```

---

### PATCH /admin/testimonials/:id/status
**Description:** Update testimonial status (admin only)

**Request:**
```json
{
  "status": "approved" // or "rejected"
}
```

**Response (200):**
```json
{
  "id": "tst_abc123",
  "status": "approved",
  "updatedAt": "2025-10-28T12:05:00Z"
}
```

---

## Admin Statistics

### GET /admin/stats
**Description:** Get dashboard statistics

**Response (200):**
```json
{
  "totalUsers": 150,
  "totalBookings": 45,
  "totalRevenue": 450000,
  "pendingTestimonials": 3,
  "activeSubscribers": 230,
  "recentBookings": [...],
  "recentContacts": [...]
}
```

---

## Error Responses

All endpoints may return these standard errors:

**400 Bad Request:**
```json
{
  "error": "Validation error",
  "message": "Invalid email format",
  "code": "VALIDATION_ERROR"
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED"
}
```

**403 Forbidden:**
```json
{
  "error": "Insufficient permissions",
  "code": "FORBIDDEN"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "message": "Something went wrong",
  "code": "INTERNAL_ERROR"
}
```

---

## Migration Notes

### From Mock to Production

1. **Replace mock API calls** in `lib/services/api.ts`
2. **Update base URL** via environment variable
3. **Implement backend endpoints** matching these schemas
4. **Add authentication middleware** on backend
5. **Enable CORS** for frontend domain
6. **Add rate limiting** on backend
7. **Implement request validation** using schemas above
8. **Set up logging and monitoring**

### Security Considerations

- Never expose API keys on frontend
- Use HttpOnly cookies for auth tokens
- Implement CSRF protection
- Validate all inputs on backend
- Use prepared statements for database queries
- Enable security headers (CSP, HSTS, etc.)
- Implement webhook signature verification
- Add request throttling and rate limiting
