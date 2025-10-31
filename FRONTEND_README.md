# Connected Hearts - Frontend Documentation

## Overview

This is the complete frontend for **Ìbáṣepọ̀ Connected Hearts**, a faith-based relationship coaching and counseling platform. The frontend is built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** components.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Mock API Layer](#mock-api-layer)
7. [Authentication System](#authentication-system)
8. [Admin Dashboard](#admin-dashboard)
9. [Payment Integration](#payment-integration)
10. [Backend Integration Guide](#backend-integration-guide)
11. [Deployment](#deployment)

---

## Features

### Public Features
- ✅ **Home Page** - Hero section, services overview, about section, testimonials
- ✅ **About Page** - Elizabeth Omolara's story, mission, values
- ✅ **Services Page** - Comprehensive service listings with filtering
- ✅ **Blog** - Articles with categories and search functionality
- ✅ **Testimonials** - Client reviews with filtering and submission form
- ✅ **Gallery** - Photo gallery from workshops and events
- ✅ **Contact** - Contact form with WhatsApp integration (+44 7958 709238)
- ✅ **Newsletter Subscription** - Email signup with Mailchimp integration (mock)
- ✅ **3-Step Booking Flow** - Service selection → Client info → Payment

### User Features
- ✅ **User Authentication** - Signup, login, password reset
- ✅ **User Dashboard** - View bookings, profile management
- ✅ **Booking Management** - Create and track bookings

### Admin Features
- ✅ **Admin Authentication** - Separate admin login
- ✅ **Admin Dashboard** - Overview with statistics
- ✅ **Blog Management** - Create, edit, delete blog posts
- ✅ **Service Management** - Manage service offerings
- ✅ **Testimonial Management** - Approve/reject testimonials
- ✅ **Gallery Management** - Upload and manage images
- ✅ **Booking Management** - View and update booking status
- ✅ **Payment Tracking** - View payment history and export CSV
- ✅ **Subscriber Management** - View and export newsletter subscribers
- ✅ **Contact Management** - View and respond to contact submissions
- ✅ **Category Management** - Manage blog and service categories

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Form Handling**: React Hook Form (ready for integration)
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

---

## Project Structure

\`\`\`
connected-hearts/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Auth routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── admin/                    # Admin dashboard
│   │   ├── dashboard/
│   │   ├── blog/
│   │   ├── services/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── subscribers/
│   │   ├── contacts/
│   │   └── categories/
│   ├── dashboard/                # User dashboard
│   ├── about/
│   ├── services/
│   ├── blog/
│   ├── testimonials/
│   ├── gallery/
│   ├── contact/
│   ├── booking/
│   ├── legal/
│   │   ├── privacy/
│   │   └── terms/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── admin-header.tsx
│   ├── admin-sidebar.tsx
│   └── newsletter-form.tsx
├── lib/                          # Utilities and services
│   ├── services/
│   │   └── api.ts               # Mock API service layer
│   ├── contexts/
│   │   └── auth-context.tsx     # Authentication context
│   ├── mock-data.ts             # Mock data for development
│   └── utils.ts
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── FRONTEND_README.md            # This file
└── package.json

\`\`\`

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd connected-hearts
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in the required environment variables (see [Environment Variables](#environment-variables))

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Ìbáṣepọ̀ Connected Hearts"

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=info@connectedhearts.com
NEXT_PUBLIC_CONTACT_PHONE=+447958709238
NEXT_PUBLIC_WHATSAPP_NUMBER=447958709238

# Calendly Integration (for booking)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username

# Payment Gateways (Mock - Replace with real keys)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxxxxxxxxxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxxxxxxxxxxxx

# Mailchimp Integration (for newsletter)
MAILCHIMP_API_KEY=xxxxxxxxxxxxx-us1
MAILCHIMP_AUDIENCE_ID=xxxxxxxxxxxxx
MAILCHIMP_SERVER_PREFIX=us1

# Database (Backend)
DATABASE_URL=postgresql://user:password@localhost:5432/connected_hearts

# Authentication (Backend)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Email Service (Backend - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
\`\`\`

**Note**: All `NEXT_PUBLIC_*` variables are exposed to the browser. Keep sensitive keys server-side only.

---

## Mock API Layer

The frontend includes a comprehensive mock API service layer located at `lib/services/api.ts`. This allows the frontend to function fully without a backend during development.

### Features

- **Simulated Network Delays** - Realistic API response times
- **In-Memory Data Storage** - Persists during session
- **TypeScript Types** - Full type safety
- **TODO Comments** - Clear integration points for backend

### Usage Example

\`\`\`typescript
import { apiService } from "@/lib/services/api"

// Authentication
const user = await apiService.auth.login(email, password)

// Bookings
const bookings = await apiService.bookings.getAll()
await apiService.bookings.create(bookingData)

// Testimonials
await apiService.testimonials.submit(testimonialData)
await apiService.testimonials.approve(id)

// Newsletter
await apiService.subscribers.subscribe(email)
\`\`\`

### Backend Integration

Each API method includes a `TODO` comment indicating where to replace the mock with real backend calls:

\`\`\`typescript
// TODO: Replace with actual API call
// POST /api/auth/login
// Body: { email, password }
// Response: { user, token }
\`\`\`

---

## Authentication System

### User Authentication

**Routes:**
- `/login` - User login
- `/signup` - User registration
- `/forgot-password` - Password reset

**Features:**
- Email/password authentication
- Form validation
- Error handling
- Protected routes
- Session management via Context API

### Admin Authentication

**Routes:**
- `/admin/login` - Admin login (separate from user login)

**Features:**
- Role-based access control
- Admin-only routes
- Separate admin dashboard

### Auth Context

Located at `lib/contexts/auth-context.tsx`, provides:
- `user` - Current user object
- `isAuthenticated` - Auth status
- `isAdmin` - Admin status
- `login()` - Login function
- `logout()` - Logout function
- `signup()` - Registration function

**Usage:**
\`\`\`typescript
import { useAuth } from "@/lib/contexts/auth-context"

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  // Use auth state and functions
}
\`\`\`

---

## Admin Dashboard

### Access

Navigate to `/admin/login` and use mock credentials:
- **Email**: admin@connectedhearts.com
- **Password**: admin123

### Features

1. **Dashboard** (`/admin/dashboard`)
   - Statistics overview
   - Quick actions

2. **Blog Management** (`/admin/blog`)
   - List all posts
   - Search and filter
   - Create/edit/delete posts

3. **Service Management** (`/admin/services`)
   - Manage service offerings
   - Update pricing and descriptions

4. **Testimonial Management** (`/admin/testimonials`)
   - Approve/reject pending testimonials
   - Filter by status
   - Delete testimonials

5. **Gallery Management** (`/admin/gallery`)
   - Upload images
   - Organize by category
   - Delete images

6. **Booking Management** (`/admin/bookings`)
   - View all bookings
   - Update booking status
   - Filter by status

7. **Payment Tracking** (`/admin/payments`)
   - View payment history
   - Export to CSV
   - Filter by status

8. **Subscriber Management** (`/admin/subscribers`)
   - View newsletter subscribers
   - Export to CSV
   - Remove subscribers

9. **Contact Management** (`/admin/contacts`)
   - View contact form submissions
   - Mark as read
   - Delete submissions

10. **Category Management** (`/admin/categories`)
    - Manage blog and service categories
    - Filter by type

---

## Payment Integration

### Supported Gateways

1. **Paystack** (Primary for UK/Nigeria)
2. **Flutterwave** (Alternative)

### 3-Step Booking Flow

**Step 1: Service Selection**
- Choose service
- Select date and time (Calendly integration)

**Step 2: Client Information**
- Name, email, phone
- Additional notes

**Step 3: Payment**
- Choose payment method
- Enter payment details
- Process payment

**Step 4: Confirmation**
- Booking confirmation
- Download calendar event
- Email confirmation (backend)

### Mock Payment

Currently uses mock payment processing. To integrate real payments:

1. **Paystack Integration**
   \`\`\`typescript
   // In lib/services/api.ts, replace mock with:
   const response = await fetch('https://api.paystack.co/transaction/initialize', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       email: clientEmail,
       amount: amount * 100, // Convert to kobo
       callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`
     })
   })
   \`\`\`

2. **Flutterwave Integration**
   \`\`\`typescript
   // Similar pattern for Flutterwave
   const response = await fetch('https://api.flutterwave.com/v3/payments', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       tx_ref: generateReference(),
       amount: amount,
       currency: 'GBP',
       redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`,
       customer: { email: clientEmail, name: clientName }
     })
   })
   \`\`\`

---

## Backend Integration Guide

### Step 1: Set Up Backend API

Create a backend API (Node.js/Express, Python/Django, etc.) with the following endpoints:

#### Authentication Endpoints
\`\`\`
POST   /api/auth/signup          - User registration
POST   /api/auth/login           - User login
POST   /api/auth/logout          - User logout
POST   /api/auth/forgot-password - Password reset request
POST   /api/auth/reset-password  - Password reset confirmation
GET    /api/auth/me              - Get current user
\`\`\`

#### Booking Endpoints
\`\`\`
GET    /api/bookings             - Get all bookings (admin)
GET    /api/bookings/user        - Get user's bookings
POST   /api/bookings             - Create booking
PATCH  /api/bookings/:id/status  - Update booking status
DELETE /api/bookings/:id         - Delete booking
\`\`\`

#### Payment Endpoints
\`\`\`
POST   /api/payments/initialize  - Initialize payment
POST   /api/payments/verify      - Verify payment
GET    /api/payments             - Get payment history
\`\`\`

#### Testimonial Endpoints
\`\`\`
GET    /api/testimonials         - Get approved testimonials
POST   /api/testimonials         - Submit testimonial
PATCH  /api/testimonials/:id/approve - Approve testimonial
PATCH  /api/testimonials/:id/reject  - Reject testimonial
DELETE /api/testimonials/:id     - Delete testimonial
\`\`\`

#### Newsletter Endpoints
\`\`\`
POST   /api/newsletter/subscribe - Subscribe to newsletter
GET    /api/newsletter/subscribers - Get all subscribers (admin)
DELETE /api/newsletter/:id       - Unsubscribe
\`\`\`

#### Contact Endpoints
\`\`\`
POST   /api/contact              - Submit contact form
GET    /api/contact              - Get all submissions (admin)
PATCH  /api/contact/:id/read     - Mark as read
DELETE /api/contact/:id          - Delete submission
\`\`\`

#### Blog Endpoints
\`\`\`
GET    /api/blog                 - Get all posts
GET    /api/blog/:id             - Get single post
POST   /api/blog                 - Create post (admin)
PATCH  /api/blog/:id             - Update post (admin)
DELETE /api/blog/:id             - Delete post (admin)
\`\`\`

#### Service Endpoints
\`\`\`
GET    /api/services             - Get all services
GET    /api/services/:id         - Get single service
POST   /api/services             - Create service (admin)
PATCH  /api/services/:id         - Update service (admin)
DELETE /api/services/:id         - Delete service (admin)
\`\`\`

### Step 2: Replace Mock API Calls

In `lib/services/api.ts`, replace each mock function with actual API calls:

**Before (Mock):**
\`\`\`typescript
async login(email: string, password: string) {
  await delay(1000)
  // TODO: Replace with actual API call
  // POST /api/auth/login
  const user = mockUsers.find(u => u.email === email)
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials")
  }
  return user
}
\`\`\`

**After (Real API):**
\`\`\`typescript
async login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (!response.ok) {
    throw new Error("Invalid credentials")
  }
  
  const data = await response.json()
  return data.user
}
\`\`\`

### Step 3: Add Authentication Headers

For protected routes, add authentication tokens:

\`\`\`typescript
const token = localStorage.getItem('auth_token')

const response = await fetch(`${API_BASE_URL}/api/bookings`, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
\`\`\`

### Step 4: Error Handling

Implement proper error handling:

\`\`\`typescript
try {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong')
  }
  
  return await response.json()
} catch (error) {
  console.error('API Error:', error)
  throw error
}
\`\`\`

### Step 5: Environment Configuration

Update `.env.local` with your backend URL:

\`\`\`env
NEXT_PUBLIC_API_URL=https://api.connectedhearts.com
# or for development
NEXT_PUBLIC_API_URL=http://localhost:4000
\`\`\`

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Domain**
   - Add custom domain in Vercel dashboard
   - Update DNS records

### Other Platforms

The app can also be deployed to:
- **Netlify** - Similar to Vercel
- **AWS Amplify** - AWS hosting
- **Railway** - Full-stack hosting
- **DigitalOcean App Platform** - VPS hosting

---

## Support

For questions or issues:
- **Email**: info@connectedhearts.com
- **WhatsApp**: +44 7958 709238
- **Website**: [connectedhearts.com](https://connectedhearts.com)

---

## License

© 2025 Ìbáṣepọ̀ Connected Hearts. All rights reserved.
