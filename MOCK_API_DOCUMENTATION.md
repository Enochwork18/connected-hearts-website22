# Mock API Documentation
**Project:** Ìbáṣepọ̀ Connected Hearts Website  
**Version:** 1.0.0  
**Date:** October 28, 2025

## Base URL
```
Development: http://localhost:3000/api
Production: https://connectedhearts.com/api
```

## Authentication
All admin endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Testimonials Endpoints

### 1. Submit Testimonial (Public)
**Endpoint:** `POST /api/testimonials`  
**Description:** Allows users to submit a testimonial for review  
**Authentication:** None required

**Request Headers:**
```
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```json
{
  "name": "string (required, max 100 characters)",
  "email": "string (required, valid email format)",
  "service": "string (required, one of service types)",
  "rating": "integer (required, 1-5)",
  "text": "string (required, min 20 characters, max 1000 characters)",
  "photo": "file (optional, image/*, max 5MB)"
}
```

**JSON Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "email", "service", "rating", "text"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "service": {
      "type": "string",
      "enum": [
        "Marriage Counseling",
        "Parenting Coaching",
        "Personal Development",
        "Pre-Marital Coaching",
        "Family Therapy",
        "Faith-Based Workshops",
        "Team Building Workshops",
        "Adventure Therapy",
        "Community Support Programs"
      ]
    },
    "rating": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5
    },
    "text": {
      "type": "string",
      "minLength": 20,
      "maxLength": 1000
    },
    "photo": {
      "type": "string",
      "format": "binary",
      "description": "Image file (JPG, PNG, WebP)"
    }
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Testimonial submitted successfully. It will be reviewed before being published.",
  "data": {
    "id": "uuid",
    "status": "pending",
    "submittedAt": "2025-10-28T16:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "field": "email",
    "message": "Invalid email format"
  }
}
```

**Error Response (429 Too Many Requests):**
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later.",
  "retryAfter": 3600
}
```

---

### 2. Get All Testimonials (Admin)
**Endpoint:** `GET /api/admin/testimonials`  
**Description:** Retrieve all testimonials with filtering and pagination  
**Authentication:** Required (Admin only)

**Query Parameters:**
```
status: string (optional) - Filter by status: "pending" | "approved" | "rejected"
page: integer (optional, default: 1)
limit: integer (optional, default: 20, max: 100)
sortBy: string (optional, default: "submittedAt") - "submittedAt" | "rating" | "name"
sortOrder: string (optional, default: "desc") - "asc" | "desc"
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "service": "Marriage Counseling",
        "rating": 5,
        "text": "Amazing experience...",
        "photo": "https://cdn.example.com/testimonials/abc123.jpg",
        "status": "pending",
        "submittedAt": "2025-10-28T16:30:00Z",
        "reviewedAt": null,
        "reviewedBy": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 42,
      "itemsPerPage": 20
    }
  }
}
```

**JSON Schema (Testimonial Object):**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "service": {
      "type": "string"
    },
    "rating": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5
    },
    "text": {
      "type": "string"
    },
    "photo": {
      "type": ["string", "null"],
      "format": "uri"
    },
    "status": {
      "type": "string",
      "enum": ["pending", "approved", "rejected"]
    },
    "submittedAt": {
      "type": "string",
      "format": "date-time"
    },
    "reviewedAt": {
      "type": ["string", "null"],
      "format": "date-time"
    },
    "reviewedBy": {
      "type": ["string", "null"],
      "description": "Admin user ID who reviewed"
    }
  }
}
```

---

### 3. Approve Testimonial (Admin)
**Endpoint:** `PATCH /api/admin/testimonials/:id/approve`  
**Description:** Approve a pending testimonial  
**Authentication:** Required (Admin only)

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Testimonial approved successfully",
  "data": {
    "id": "uuid",
    "status": "approved",
    "reviewedAt": "2025-10-28T17:00:00Z",
    "reviewedBy": "admin-uuid"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Testimonial not found"
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Testimonial has already been reviewed"
}
```

---

### 4. Reject Testimonial (Admin)
**Endpoint:** `PATCH /api/admin/testimonials/:id/reject`  
**Description:** Reject a pending testimonial  
**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "reason": "string (optional, max 500 characters)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Testimonial rejected",
  "data": {
    "id": "uuid",
    "status": "rejected",
    "reviewedAt": "2025-10-28T17:00:00Z",
    "reviewedBy": "admin-uuid"
  }
}
```

---

### 5. Edit Testimonial (Admin)
**Endpoint:** `PATCH /api/admin/testimonials/:id`  
**Description:** Edit testimonial text (minor corrections only)  
**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "text": "string (required, min 20 characters, max 1000 characters)",
  "editNote": "string (optional, reason for edit)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Testimonial updated successfully",
  "data": {
    "id": "uuid",
    "text": "Updated testimonial text...",
    "editedAt": "2025-10-28T17:05:00Z",
    "editedBy": "admin-uuid"
  }
}
```

---

### 6. Delete Testimonial (Admin)
**Endpoint:** `DELETE /api/admin/testimonials/:id`  
**Description:** Permanently delete a testimonial  
**Authentication:** Required (Admin only)

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Testimonial deleted successfully"
}
```

---

## Authentication Endpoints

### 1. User Login
**Endpoint:** `POST /api/auth/login`  
**Description:** Authenticate a client user  
**Authentication:** None required

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 8 characters)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "client"
    },
    "token": "jwt-token-string",
    "expiresAt": "2025-10-29T16:30:00Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### 2. Admin Login
**Endpoint:** `POST /api/auth/admin/login`  
**Description:** Authenticate an admin user  
**Authentication:** None required

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 8 characters)",
  "adminCode": "string (optional, additional security)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Admin User",
      "email": "admin@connectedhearts.com",
      "role": "admin"
    },
    "token": "jwt-token-string",
    "expiresAt": "2025-10-29T16:30:00Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Invalid admin credentials"
}
```

---

### 3. User Signup
**Endpoint:** `POST /api/auth/signup`  
**Description:** Register a new client user  
**Authentication:** None required

**Request Body:**
```json
{
  "name": "string (required, max 100 characters)",
  "email": "string (required, valid email, unique)",
  "password": "string (required, min 8 characters)",
  "phone": "string (optional, valid phone format)"
}
```

**JSON Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "email", "password"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"
    },
    "phone": {
      "type": "string",
      "pattern": "^\\+?[1-9]\\d{1,14}$"
    }
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "client"
    },
    "token": "jwt-token-string",
    "expiresAt": "2025-10-29T16:30:00Z"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

### 4. Logout
**Endpoint:** `POST /api/auth/logout`  
**Description:** Invalidate current session  
**Authentication:** Required

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 5. Forgot Password
**Endpoint:** `POST /api/auth/forgot-password`  
**Description:** Request password reset email  
**Authentication:** None required

**Request Body:**
```json
{
  "email": "string (required, valid email)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset instructions sent to your email"
}
```

---

## Booking Endpoints

### 1. Create Booking
**Endpoint:** `POST /api/bookings`  
**Description:** Book a consultation session  
**Authentication:** Required (User or Guest)

**Request Body:**
```json
{
  "serviceId": "string (required, uuid)",
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "preferredDate": "string (required, date-time)",
  "alternateDate": "string (optional, date-time)",
  "message": "string (optional, max 500 characters)"
}
```

**JSON Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["serviceId", "name", "email", "phone", "preferredDate"],
  "properties": {
    "serviceId": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "phone": {
      "type": "string",
      "pattern": "^\\+?[1-9]\\d{1,14}$"
    },
    "preferredDate": {
      "type": "string",
      "format": "date-time"
    },
    "alternateDate": {
      "type": "string",
      "format": "date-time"
    },
    "message": {
      "type": "string",
      "maxLength": 500
    }
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking request submitted successfully",
  "data": {
    "id": "uuid",
    "bookingNumber": "BK-20251028-001",
    "status": "pending",
    "createdAt": "2025-10-28T16:30:00Z"
  }
}
```

---

### 2. Get User Bookings
**Endpoint:** `GET /api/bookings`  
**Description:** Get all bookings for authenticated user  
**Authentication:** Required (User)

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "bookingNumber": "BK-20251028-001",
        "service": {
          "id": "uuid",
          "title": "Marriage Counseling",
          "duration": "60 minutes"
        },
        "preferredDate": "2025-11-05T10:00:00Z",
        "status": "confirmed",
        "createdAt": "2025-10-28T16:30:00Z"
      }
    ]
  }
}
```

---

### 3. Get All Bookings (Admin)
**Endpoint:** `GET /api/admin/bookings`  
**Description:** Get all bookings with filtering  
**Authentication:** Required (Admin)

**Query Parameters:**
```
status: string (optional) - "pending" | "confirmed" | "completed" | "cancelled"
dateFrom: string (optional, date)
dateTo: string (optional, date)
page: integer (optional, default: 1)
limit: integer (optional, default: 20)
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "bookingNumber": "BK-20251028-001",
        "client": {
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "+447958709238"
        },
        "service": {
          "id": "uuid",
          "title": "Marriage Counseling"
        },
        "preferredDate": "2025-11-05T10:00:00Z",
        "alternateDate": null,
        "message": "Looking forward to the session",
        "status": "pending",
        "createdAt": "2025-10-28T16:30:00Z",
        "updatedAt": "2025-10-28T16:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25
    }
  }
}
```

---

## Contact Form Endpoint

### Submit Contact Message
**Endpoint:** `POST /api/contact`  
**Description:** Submit a contact form message  
**Authentication:** None required

**Request Body:**
```json
{
  "name": "string (required, max 100 characters)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "subject": "string (optional, max 200 characters)",
  "message": "string (required, min 10 characters, max 2000 characters)",
  "honeypot": "string (must be empty - spam protection)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Message sent successfully. We'll get back to you soon!"
}
```

**Error Response (429 Too Many Requests):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "retryAfter": 300
}
```

---

## Newsletter Endpoints

### 1. Subscribe to Newsletter
**Endpoint:** `POST /api/newsletter/subscribe`  
**Description:** Subscribe to newsletter  
**Authentication:** None required

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "name": "string (optional, max 100 characters)",
  "honeypot": "string (must be empty - spam protection)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!"
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Email already subscribed"
}
```

---

### 2. Get Subscribers (Admin)
**Endpoint:** `GET /api/admin/subscribers`  
**Description:** Get all newsletter subscribers  
**Authentication:** Required (Admin)

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "subscribers": [
      {
        "id": "uuid",
        "email": "subscriber@example.com",
        "name": "Jane Doe",
        "subscribedAt": "2025-10-28T16:30:00Z",
        "status": "active"
      }
    ],
    "total": 150
  }
}
```

---

### 3. Send Newsletter (Admin)
**Endpoint:** `POST /api/admin/newsletter/send`  
**Description:** Send newsletter to all active subscribers  
**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "subject": "string (required, max 200 characters)",
  "content": "string (required, HTML content)",
  "scheduledFor": "string (optional, date-time for scheduled send)"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Newsletter sent to 150 subscribers",
  "data": {
    "id": "uuid",
    "sentAt": "2025-10-28T17:00:00Z",
    "recipientCount": 150
  }
}
```

---

## Blog Endpoints

### 1. Get All Blog Posts (Public)
**Endpoint:** `GET /api/blog`  
**Description:** Get published blog posts  
**Authentication:** None required

**Query Parameters:**
```
category: string (optional)
tag: string (optional)
page: integer (optional, default: 1)
limit: integer (optional, default: 10)
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "slug": "5-pillars-of-healthy-marriage",
        "title": "5 Pillars of a Healthy Marriage",
        "excerpt": "Discover the foundation...",
        "category": "Relationships",
        "tags": ["marriage", "communication"],
        "author": "Elizabeth Omolara",
        "publishDate": "2024-01-15",
        "readTime": "5 min",
        "image": "https://cdn.example.com/blog/post1.jpg"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25
    }
  }
}
```

---

### 2. Get Single Blog Post (Public)
**Endpoint:** `GET /api/blog/:slug`  
**Description:** Get a single blog post by slug  
**Authentication:** None required

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "5-pillars-of-healthy-marriage",
    "title": "5 Pillars of a Healthy Marriage",
    "content": "Full markdown content...",
    "category": "Relationships",
    "tags": ["marriage", "communication", "faith"],
    "author": "Elizabeth Omolara",
    "publishDate": "2024-01-15",
    "readTime": "5 min",
    "image": "https://cdn.example.com/blog/post1.jpg",
    "featured": true
  }
}
```

---

### 3. Create Blog Post (Admin)
**Endpoint:** `POST /api/admin/blog`  
**Description:** Create a new blog post  
**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "title": "string (required, max 200 characters)",
  "slug": "string (required, unique, url-safe)",
  "excerpt": "string (required, max 300 characters)",
  "content": "string (required, markdown)",
  "category": "string (required)",
  "tags": ["array of strings"],
  "image": "string (required, url)",
  "featured": "boolean (optional, default: false)",
  "status": "string (draft | published)",
  "publishDate": "string (optional, date-time)"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "uuid",
    "slug": "new-blog-post",
    "status": "published",
    "createdAt": "2025-10-28T17:00:00Z"
  }
}
```

---

## Gallery Endpoints

### 1. Get Gallery Images (Public)
**Endpoint:** `GET /api/gallery`  
**Description:** Get all gallery images  
**Authentication:** None required

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "id": "uuid",
        "url": "https://cdn.example.com/gallery/img1.jpg",
        "thumbnail": "https://cdn.example.com/gallery/img1-thumb.jpg",
        "title": "Workshop Session",
        "description": "Team building activity",
        "category": "Workshops",
        "uploadedAt": "2025-10-15T10:00:00Z"
      }
    ]
  }
}
```

---

### 2. Upload Gallery Image (Admin)
**Endpoint:** `POST /api/admin/gallery`  
**Description:** Upload a new gallery image  
**Authentication:** Required (Admin)

**Request Body (FormData):**
```
image: file (required, image/*, max 10MB)
title: string (required)
description: string (optional)
category: string (optional)
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": "uuid",
    "url": "https://cdn.example.com/gallery/img-new.jpg",
    "uploadedAt": "2025-10-28T17:00:00Z"
  }
}
```

---

## Error Codes Reference

| Status Code | Meaning |
|-------------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

All public endpoints are rate-limited to prevent abuse:

- **Contact Form:** 3 requests per hour per IP
- **Testimonial Submission:** 2 requests per hour per IP  
- **Newsletter Subscribe:** 5 requests per hour per IP  
- **General API:** 100 requests per 15 minutes per IP

Rate limit headers included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1698516000
```

---

## Security Considerations

### Input Sanitization
- All user inputs must be sanitized on both client and server
- HTML content should be sanitized using DOMPurify or similar
- SQL injection prevention through parameterized queries
- XSS protection enabled

### CORS Policy
```javascript
{
  origin: ["https://connectedhearts.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}
```

### File Upload Security
- File type validation (whitelist only)
- File size limits enforced
- Malware scanning recommended
- Secure filename generation (UUID-based)
- Storage in separate subdomain/bucket

---

## Testing the API

### Example cURL Request (Testimonial Submission):
```bash
curl -X POST https://connectedhearts.com/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "service": "Marriage Counseling",
    "rating": 5,
    "text": "Elizabeth helped us reconnect and communicate better than ever. Highly recommend!"
  }'
```

### Example cURL Request (Admin - Approve Testimonial):
```bash
curl -X PATCH https://connectedhearts.com/api/admin/testimonials/abc-123/approve \
  -H "Authorization: Bearer your-jwt-token"
```

---

## Changelog

### Version 1.0.0 (2025-10-28)
- Initial API documentation
- All core endpoints defined
- JSON schemas provided for validation
- Security and rate limiting documented

---

## Support & Contact

For API questions or issues:
- Email: dev@connectedhearts.com
- Documentation: https://docs.connectedhearts.com
- Status Page: https://status.connectedhearts.com
