// Mock API Service Layer for Connected Hearts
// This file centralizes all API calls with mock responses
// TODO: Replace mock responses with real API endpoints when backend is ready

// Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "user" | "admin"
  createdAt: string
  isActive: boolean
}

export interface Booking {
  id: string
  userId: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  paymentMethod?: "paystack" | "flutterwave"
  amount: number
  createdAt: string
}

export interface Testimonial {
  id: string
  userId?: string
  name: string
  isAnonymous: boolean
  service: string
  rating: number
  quote: string
  photo?: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export interface Subscriber {
  id: string
  email: string
  name?: string
  subscribedAt: string
  isActive: boolean
  source: "footer" | "homepage" | "blog"
}

export interface PaymentSession {
  sessionId: string
  paymentUrl: string
  reference: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image: string
  status: "draft" | "published"
  publishedAt?: string
  createdAt: string
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  price: number
  duration: string
  category: string
  image: string
  features: string[]
  isActive: boolean
  createdAt: string
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: string
  tags: string[]
  uploadedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  type: "service" | "blog"
  description?: string
  color: string
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

// Mock delay to simulate network requests
const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data storage (in-memory for frontend)
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@connectedhearts.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
]

const mockBookings: Booking[] = []
let mockTestimonials: Testimonial[] = []
const mockSubscribers: Subscriber[] = []

let mockBlogPosts: BlogPost[] = []
let mockServices: Service[] = []
let mockGalleryImages: GalleryImage[] = []
let mockCategories: Category[] = []
let mockContactMessages: ContactMessage[] = []

// ============================================
// AUTHENTICATION API
// ============================================

export const authAPI = {
  // User signup
  // TODO: POST /api/auth/signup
  signup: async (data: { email: string; password: string; name: string; phone?: string }): Promise<{
    user: User
    token: string
  }> => {
    await mockDelay()

    // Mock validation
    if (mockUsers.find((u) => u.email === data.email)) {
      throw new Error("Email already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: "user",
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    mockUsers.push(newUser)

    const mockToken = btoa(JSON.stringify({ userId: newUser.id, role: newUser.role }))

    return { user: newUser, token: mockToken }
  },

  // User login
  // TODO: POST /api/auth/login
  login: async (data: { email: string; password: string }): Promise<{ user: User; token: string }> => {
    await mockDelay()

    const user = mockUsers.find((u) => u.email === data.email && u.isActive)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const mockToken = btoa(JSON.stringify({ userId: user.id, role: user.role }))

    return { user, token: mockToken }
  },

  // Admin login
  // TODO: POST /api/auth/admin/login
  adminLogin: async (data: { email: string; password: string }): Promise<{ user: User; token: string }> => {
    await mockDelay()

    const user = mockUsers.find((u) => u.email === data.email && u.role === "admin" && u.isActive)

    if (!user) {
      throw new Error("Invalid admin credentials")
    }

    const mockToken = btoa(JSON.stringify({ userId: user.id, role: user.role }))

    return { user, token: mockToken }
  },

  // Forgot password
  // TODO: POST /api/auth/forgot-password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    await mockDelay()
    return { message: "Password reset link sent to your email" }
  },

  // Get current user
  // TODO: GET /api/auth/me
  getCurrentUser: async (token: string): Promise<User> => {
    await mockDelay()

    try {
      const decoded = JSON.parse(atob(token))
      const user = mockUsers.find((u) => u.id === decoded.userId)

      if (!user) throw new Error("User not found")

      return user
    } catch {
      throw new Error("Invalid token")
    }
  },

  // Logout
  logout: () => {
    // Clear token from storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_token")
    }
  },
}

// ============================================
// BOOKING API
// ============================================

export const bookingAPI = {
  // Create booking
  // TODO: POST /api/bookings
  create: async (data: Omit<Booking, "id" | "createdAt" | "status" | "paymentStatus">): Promise<Booking> => {
    await mockDelay()

    const newBooking: Booking = {
      ...data,
      id: Date.now().toString(),
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    }

    mockBookings.push(newBooking)

    return newBooking
  },

  // Get user bookings
  // TODO: GET /api/bookings/user/:userId
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    await mockDelay()
    return mockBookings.filter((b) => b.userId === userId)
  },

  // Get all bookings (admin)
  // TODO: GET /api/bookings
  getAll: async (filters?: { status?: string; date?: string }): Promise<Booking[]> => {
    await mockDelay()

    let filtered = [...mockBookings]

    if (filters?.status) {
      filtered = filtered.filter((b) => b.status === filters.status)
    }

    if (filters?.date) {
      filtered = filtered.filter((b) => b.date === filters.date)
    }

    return filtered
  },

  // Update booking status
  // TODO: PATCH /api/bookings/:id/status
  updateStatus: async (id: string, status: Booking["status"]): Promise<Booking> => {
    await mockDelay()

    const booking = mockBookings.find((b) => b.id === id)
    if (!booking) throw new Error("Booking not found")

    booking.status = status
    return booking
  },

  // Cancel booking
  // TODO: DELETE /api/bookings/:id
  cancel: async (id: string): Promise<void> => {
    await mockDelay()

    const booking = mockBookings.find((b) => b.id === id)
    if (booking) {
      booking.status = "cancelled"
    }
  },
}

// ============================================
// PAYMENT API
// ============================================

export const paymentAPI = {
  // Get all payments (admin)
  // TODO: GET /api/admin/payments
  getAll: async (): Promise<
    Array<{
      id: string
      bookingId: string
      amount: number
      status: string
      method: string
      reference: string
      createdAt: string
    }>
  > => {
    await mockDelay()

    // Return payment data from bookings
    return mockBookings
      .filter((b) => b.paymentStatus === "paid")
      .map((b) => ({
        id: b.id,
        bookingId: b.id,
        amount: b.amount,
        status: b.paymentStatus,
        method: b.paymentMethod || "paystack",
        reference: `REF_${b.id}`,
        createdAt: b.createdAt,
      }))
  },

  // Create payment session (Paystack)
  // TODO: POST /api/payments/paystack/create-session
  // Required env: NEXT_PUBLIC_PAYSTACK_KEY
  createPaystackSession: async (data: {
    amount: number
    email: string
    bookingId: string
  }): Promise<PaymentSession> => {
    await mockDelay(1000)

    // Mock Paystack session
    const reference = `PS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      sessionId: reference,
      paymentUrl: `https://checkout.paystack.com/mock/${reference}`,
      reference,
    }
  },

  // Create payment session (Flutterwave)
  // TODO: POST /api/payments/flutterwave/create-session
  // Required env: NEXT_PUBLIC_FLUTTERWAVE_KEY
  createFlutterwaveSession: async (data: {
    amount: number
    email: string
    bookingId: string
  }): Promise<PaymentSession> => {
    await mockDelay(1000)

    // Mock Flutterwave session
    const reference = `FW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      sessionId: reference,
      paymentUrl: `https://checkout.flutterwave.com/mock/${reference}`,
      reference,
    }
  },

  // Verify payment
  // TODO: POST /api/payments/verify
  verifyPayment: async (reference: string): Promise<{ success: boolean; bookingId: string }> => {
    await mockDelay(1500)

    // Mock verification (80% success rate)
    const success = Math.random() > 0.2

    if (success) {
      // Update booking payment status
      const bookingId = reference.split("_")[2] || "1"
      const booking = mockBookings.find((b) => b.id === bookingId)
      if (booking) {
        booking.paymentStatus = "paid"
        booking.status = "confirmed"
      }

      return { success: true, bookingId }
    }

    throw new Error("Payment verification failed")
  },

  // Webhook handler (for backend)
  // TODO: POST /api/payments/webhook
  // This should verify webhook signature and update booking status
  webhookHandler: async (payload: any): Promise<void> => {
    // This will be implemented on backend
    // Frontend doesn't need to call this
    console.log("[v0] Webhook payload received:", payload)
  },
}

// ============================================
// TESTIMONIAL API
// ============================================

export const testimonialAPI = {
  // Submit testimonial
  // TODO: POST /api/testimonials
  submit: async (data: Omit<Testimonial, "id" | "createdAt" | "status">): Promise<Testimonial> => {
    await mockDelay()

    const newTestimonial: Testimonial = {
      ...data,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    mockTestimonials.push(newTestimonial)

    return newTestimonial
  },

  // Get approved testimonials (public)
  // TODO: GET /api/testimonials
  getApproved: async (): Promise<Testimonial[]> => {
    await mockDelay()
    return mockTestimonials.filter((t) => t.status === "approved")
  },

  // Get all testimonials (admin)
  // TODO: GET /api/admin/testimonials
  getAll: async (status?: "pending" | "approved" | "rejected"): Promise<Testimonial[]> => {
    await mockDelay()

    if (status) {
      return mockTestimonials.filter((t) => t.status === status)
    }

    return mockTestimonials
  },

  // Update testimonial status
  // TODO: PATCH /api/admin/testimonials/:id/status
  updateStatus: async (id: string, status: "approved" | "rejected"): Promise<Testimonial> => {
    await mockDelay()

    const testimonial = mockTestimonials.find((t) => t.id === id)
    if (!testimonial) throw new Error("Testimonial not found")

    testimonial.status = status
    return testimonial
  },

  // Delete testimonial
  // TODO: DELETE /api/admin/testimonials/:id
  delete: async (id: string): Promise<void> => {
    await mockDelay()
    mockTestimonials = mockTestimonials.filter((t) => t.id !== id)
  },
}

// ============================================
// NEWSLETTER/SUBSCRIBER API
// ============================================

export const subscriberAPI = {
  // Subscribe to newsletter
  // TODO: POST /api/subscribers
  subscribe: async (data: { email: string; name?: string; source: Subscriber["source"] }): Promise<Subscriber> => {
    await mockDelay()

    // Check if already subscribed
    if (mockSubscribers.find((s) => s.email === data.email && s.isActive)) {
      throw new Error("Email already subscribed")
    }

    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      subscribedAt: new Date().toISOString(),
      isActive: true,
      source: data.source,
    }

    mockSubscribers.push(newSubscriber)

    return newSubscriber
  },

  // Get all subscribers (admin)
  // TODO: GET /api/admin/subscribers
  getAll: async (): Promise<Subscriber[]> => {
    await mockDelay()
    return mockSubscribers
  },

  // Unsubscribe
  // TODO: POST /api/subscribers/unsubscribe
  unsubscribe: async (email: string): Promise<void> => {
    await mockDelay()

    const subscriber = mockSubscribers.find((s) => s.email === email)
    if (subscriber) {
      subscriber.isActive = false
    }
  },

  // Export subscribers (admin)
  // TODO: GET /api/admin/subscribers/export
  exportCSV: async (): Promise<string> => {
    await mockDelay()

    const headers = "Email,Name,Subscribed At,Source,Status\n"
    const rows = mockSubscribers
      .map((s) => `${s.email},${s.name || ""},${s.subscribedAt},${s.source},${s.isActive ? "Active" : "Inactive"}`)
      .join("\n")

    return headers + rows
  },

  // Sync with Mailchimp (admin)
  // TODO: POST /api/admin/subscribers/mailchimp-sync
  // Required env: MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID
  syncMailchimp: async (): Promise<{ synced: number; failed: number }> => {
    await mockDelay(2000)

    // Mock sync result
    return {
      synced: mockSubscribers.filter((s) => s.isActive).length,
      failed: 0,
    }
  },
}

// ============================================
// USER MANAGEMENT API (Admin)
// ============================================

export const userAPI = {
  // Get all users (admin)
  // TODO: GET /api/admin/users
  getAll: async (): Promise<User[]> => {
    await mockDelay()
    return mockUsers
  },

  // Get user by ID
  // TODO: GET /api/admin/users/:id
  getById: async (id: string): Promise<User> => {
    await mockDelay()

    const user = mockUsers.find((u) => u.id === id)
    if (!user) throw new Error("User not found")

    return user
  },

  // Toggle user active status
  // TODO: PATCH /api/admin/users/:id/toggle-active
  toggleActive: async (id: string): Promise<User> => {
    await mockDelay()

    const user = mockUsers.find((u) => u.id === id)
    if (!user) throw new Error("User not found")

    user.isActive = !user.isActive
    return user
  },

  // Export users (admin)
  // TODO: GET /api/admin/users/export
  exportCSV: async (): Promise<string> => {
    await mockDelay()

    const headers = "ID,Email,Name,Phone,Role,Created At,Status\n"
    const rows = mockUsers
      .map(
        (u) =>
          `${u.id},${u.email},${u.name},${u.phone || ""},${u.role},${u.createdAt},${u.isActive ? "Active" : "Inactive"}`,
      )
      .join("\n")

    return headers + rows
  },

  // Update user profile
  // TODO: PATCH /api/users/profile
  updateProfile: async (userId: string, data: { name?: string; phone?: string; photo?: string }): Promise<User> => {
    await mockDelay()

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) throw new Error("User not found")

    if (data.name) user.name = data.name
    if (data.phone !== undefined) user.phone = data.phone
    // Note: photo would be added to User type when backend is ready

    return user
  },

  // Change password
  // TODO: POST /api/users/change-password
  changePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    await mockDelay()

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) throw new Error("User not found")

    // Mock validation (in real app, verify old password)
    if (oldPassword.length < 6 || newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    return { success: true }
  },
}

// ============================================
// BLOG API
// ============================================

export const blogAPI = {
  // Get all blog posts (admin)
  // TODO: GET /api/admin/blog
  getAll: async (): Promise<BlogPost[]> => {
    await mockDelay()
    return mockBlogPosts
  },

  // Get published blog posts (public)
  // TODO: GET /api/blog
  getPublished: async (): Promise<BlogPost[]> => {
    await mockDelay()
    return mockBlogPosts.filter((post) => post.status === "published")
  },

  // Get blog post by slug
  // TODO: GET /api/blog/:slug
  getBySlug: async (slug: string): Promise<BlogPost> => {
    await mockDelay()
    const post = mockBlogPosts.find((p) => p.slug === slug)
    if (!post) throw new Error("Blog post not found")
    return post
  },

  // Create blog post
  // TODO: POST /api/admin/blog
  create: async (data: Omit<BlogPost, "id" | "createdAt">): Promise<BlogPost> => {
    await mockDelay()
    const newPost: BlogPost = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    mockBlogPosts.push(newPost)
    return newPost
  },

  // Update blog post
  // TODO: PATCH /api/admin/blog/:id
  update: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    await mockDelay()
    const post = mockBlogPosts.find((p) => p.id === id)
    if (!post) throw new Error("Blog post not found")
    Object.assign(post, data)
    return post
  },

  // Delete blog post
  // TODO: DELETE /api/admin/blog/:id
  delete: async (id: string): Promise<void> => {
    await mockDelay()
    mockBlogPosts = mockBlogPosts.filter((p) => p.id !== id)
  },
}

// ============================================
// SERVICES API
// ============================================

export const servicesAPI = {
  // Get all services (admin)
  // TODO: GET /api/admin/services
  getAll: async (): Promise<Service[]> => {
    await mockDelay()
    return mockServices
  },

  // Get active services (public)
  // TODO: GET /api/services
  getActive: async (): Promise<Service[]> => {
    await mockDelay()
    return mockServices.filter((service) => service.isActive)
  },

  // Get service by slug
  // TODO: GET /api/services/:slug
  getBySlug: async (slug: string): Promise<Service> => {
    await mockDelay()
    const service = mockServices.find((s) => s.slug === slug)
    if (!service) throw new Error("Service not found")
    return service
  },

  // Create service
  // TODO: POST /api/admin/services
  create: async (data: Omit<Service, "id" | "createdAt">): Promise<Service> => {
    await mockDelay()
    const newService: Service = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    mockServices.push(newService)
    return newService
  },

  // Update service
  // TODO: PATCH /api/admin/services/:id
  update: async (id: string, data: Partial<Service>): Promise<Service> => {
    await mockDelay()
    const service = mockServices.find((s) => s.id === id)
    if (!service) throw new Error("Service not found")
    Object.assign(service, data)
    return service
  },

  // Delete service
  // TODO: DELETE /api/admin/services/:id
  delete: async (id: string): Promise<void> => {
    await mockDelay()
    mockServices = mockServices.filter((s) => s.id !== id)
  },
}

// ============================================
// GALLERY API
// ============================================

export const galleryAPI = {
  // Get all gallery images (admin)
  // TODO: GET /api/admin/gallery
  getAll: async (): Promise<GalleryImage[]> => {
    await mockDelay()
    return mockGalleryImages
  },

  // Get gallery images by category (public)
  // TODO: GET /api/gallery
  getByCategory: async (category?: string): Promise<GalleryImage[]> => {
    await mockDelay()
    if (category) {
      return mockGalleryImages.filter((img) => img.category === category)
    }
    return mockGalleryImages
  },

  // Upload image
  // TODO: POST /api/admin/gallery
  upload: async (data: Omit<GalleryImage, "id" | "uploadedAt">): Promise<GalleryImage> => {
    await mockDelay()
    const newImage: GalleryImage = {
      ...data,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
    }
    mockGalleryImages.push(newImage)
    return newImage
  },

  // Delete image
  // TODO: DELETE /api/admin/gallery/:id
  delete: async (id: string): Promise<void> => {
    await mockDelay()
    mockGalleryImages = mockGalleryImages.filter((img) => img.id !== id)
  },
}

// ============================================
// CATEGORIES API
// ============================================

export const categoriesAPI = {
  // Get all categories (admin)
  // TODO: GET /api/admin/categories
  getAll: async (): Promise<Category[]> => {
    await mockDelay()
    return mockCategories
  },

  // Get categories by type (public)
  // TODO: GET /api/categories/:type
  getByType: async (type: "service" | "blog"): Promise<Category[]> => {
    await mockDelay()
    return mockCategories.filter((cat) => cat.type === type)
  },

  // Create category
  // TODO: POST /api/admin/categories
  create: async (data: Omit<Category, "id" | "createdAt">): Promise<Category> => {
    await mockDelay()
    const newCategory: Category = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    mockCategories.push(newCategory)
    return newCategory
  },

  // Update category
  // TODO: PATCH /api/admin/categories/:id
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    await mockDelay()
    const category = mockCategories.find((c) => c.id === id)
    if (!category) throw new Error("Category not found")
    Object.assign(category, data)
    return category
  },

  // Delete category
  // TODO: DELETE /api/admin/categories/:id
  delete: async (id: string): Promise<void> => {
    await mockDelay()
    mockCategories = mockCategories.filter((c) => c.id !== id)
  },
}

// ============================================
// CONTACT API
// ============================================

export const contactAPI = {
  // Submit contact form
  // TODO: POST /api/contact
  submit: async (data: { name: string; email: string; phone?: string; subject: string; message: string }): Promise<{
    success: boolean
  }> => {
    await mockDelay()

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      status: "new",
      createdAt: new Date().toISOString(),
    }
    mockContactMessages.push(newMessage)

    return { success: true }
  },

  // Get all contact messages (admin)
  // TODO: GET /api/admin/contacts
  getAll: async (): Promise<ContactMessage[]> => {
    await mockDelay()
    return mockContactMessages
  },

  // Update contact message status
  // TODO: PATCH /api/admin/contacts/:id/status
  updateStatus: async (id: string, status: ContactMessage["status"]): Promise<ContactMessage> => {
    await mockDelay()
    const message = mockContactMessages.find((m) => m.id === id)
    if (!message) throw new Error("Contact message not found")
    message.status = status
    return message
  },

  // Delete contact message
  // TODO: DELETE /api/admin/contacts/:id
  delete: async (id: string): Promise<void> => {
    await mockDelay()
    mockContactMessages = mockContactMessages.filter((m) => m.id !== id)
  },
}

// ============================================
// ADMIN STATISTICS API
// ============================================

export const adminStatsAPI = {
  // Get dashboard statistics
  // TODO: GET /api/admin/stats
  getStats: async (): Promise<{
    totalUsers: number
    totalBookings: number
    totalRevenue: number
    pendingTestimonials: number
    activeSubscribers: number
    recentBookings: Booking[]
    recentContacts: ContactMessage[]
  }> => {
    await mockDelay()

    const recentBookings = mockBookings.slice(-5).reverse()
    const recentContacts = mockContactMessages.filter((m) => m.status === "new").slice(-5).reverse()

    return {
      totalUsers: mockUsers.filter((u) => u.role === "user").length,
      totalBookings: mockBookings.length,
      totalRevenue: mockBookings
        .filter((b) => b.paymentStatus === "paid")
        .reduce((sum, b) => sum + b.amount, 0),
      pendingTestimonials: mockTestimonials.filter((t) => t.status === "pending").length,
      activeSubscribers: mockSubscribers.filter((s) => s.isActive).length,
      recentBookings,
      recentContacts,
    }
  },
}

// ============================================
// MAIN API SERVICE EXPORT
// ============================================

export const apiService = {
  auth: authAPI,
  bookings: bookingAPI,
  payments: paymentAPI,
  testimonials: testimonialAPI,
  subscribers: subscriberAPI,
  users: userAPI,
  contact: contactAPI,
  blog: blogAPI,
  services: servicesAPI,
  gallery: galleryAPI,
  categories: categoriesAPI,
  adminStats: adminStatsAPI,
}

// Default export for convenience
export default apiService

// ============================================
// HELPER FUNCTIONS
// ============================================

// Download CSV file
export const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Generate .ics file for calendar
export const generateICS = (booking: Booking): string => {
  const startDate = new Date(`${booking.date}T${booking.time}`)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Connected Hearts//Booking//EN
BEGIN:VEVENT
UID:${booking.id}@connectedhearts.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${booking.serviceName} - Connected Hearts
DESCRIPTION:Booking for ${booking.serviceName}
LOCATION:Connected Hearts
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}

// Download .ics file
export const downloadICS = (booking: Booking) => {
  const icsContent = generateICS(booking)
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `booking-${booking.id}.ics`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
