import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    await delay(800) // Simulate network delay
    const { email, password } = await request.json() as { email: string; password: string }
    
    if (email === 'admin@ibasepo.org' && password === 'admin123') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: 'admin@ibasepo.org',
          name: 'Admin User',
          role: 'admin'
        },
        token: 'mock-jwt-token-admin'
      })
    }
    
    if (email && password) {
      return HttpResponse.json({
        user: {
          id: '2',
          email,
          name: 'Client User',
          role: 'client'
        },
        token: 'mock-jwt-token-client'
      })
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    await delay(1000)
    const data = await request.json() as Record<string, unknown>
    
    return HttpResponse.json({
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: 'client'
      },
      token: 'mock-jwt-token-new'
    })
  }),

  http.post('/api/auth/logout', async () => {
    await delay(300)
    return HttpResponse.json({ success: true })
  }),

  http.get('/api/auth/session', async () => {
    await delay(200)
    // Check localStorage for mock session
    return HttpResponse.json({
      user: {
        id: '2',
        email: 'client@example.com',
        name: 'Client User',
        role: 'client'
      }
    })
  }),

  // Testimonials endpoints
  http.get('/api/testimonials', async () => {
    await delay(500)
    return HttpResponse.json({
      testimonials: [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          service: 'Marriage Counseling',
          rating: 5,
          text: 'Life-changing experience. Highly recommend!',
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      ]
    })
  }),

  http.post('/api/testimonials', async ({ request }) => {
    await delay(1000)
    const data = await request.json() as Record<string, unknown>
    
    return HttpResponse.json({
      testimonial: {
        id: Date.now().toString(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    })
  }),

  http.patch('/api/testimonials/:id/approve', async ({ params }) => {
    await delay(500)
    return HttpResponse.json({
      testimonial: {
        id: params.id,
        status: 'approved'
      }
    })
  }),

  // Blog endpoints
  http.get('/api/blog', async () => {
    await delay(400)
    return HttpResponse.json({
      posts: [
        {
          id: '1',
          title: 'Building Stronger Families',
          slug: 'building-stronger-families',
          excerpt: 'Discover the keys to family harmony...',
          content: '<p>Full content here...</p>',
          author: 'Elizabeth Omolara',
          publishedAt: new Date().toISOString()
        }
      ]
    })
  }),

  http.post('/api/blog', async ({ request }) => {
    await delay(1200)
    const data = await request.json() as Record<string, unknown>
    
    return HttpResponse.json({
      post: {
        id: Date.now().toString(),
        ...data,
        publishedAt: new Date().toISOString()
      }
    })
  }),

  // Bookings endpoints
  http.post('/api/bookings', async ({ request }) => {
    await delay(1500)
    const data = await request.json() as Record<string, unknown>
    
    return HttpResponse.json({
      booking: {
        id: Date.now().toString(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    })
  }),

  http.get('/api/bookings', async () => {
    await delay(600)
    return HttpResponse.json({
      bookings: [
        {
          id: '1',
          service: 'Marriage Counseling',
          date: new Date().toISOString(),
          status: 'confirmed'
        }
      ]
    })
  }),

  // Newsletter endpoint
  http.post('/api/newsletter', async ({ request }) => {
    await delay(800)
    const { email } = await request.json() as { email: string }
    
    return HttpResponse.json({
      success: true,
      message: `Subscribed: ${email}`
    })
  }),

  // Contact endpoint
  http.post('/api/contact', async ({ request }) => {
    await delay(1000)
    const data = await request.json() as Record<string, unknown>
    
    return HttpResponse.json({
      success: true,
      message: 'Message sent successfully',
      submissionId: Date.now().toString()
    })
  }),

  // Upload endpoint (with progress simulation)
  http.post('/api/uploads', async ({ request }) => {
    await delay(2000) // Simulate upload time
    
    return HttpResponse.json({
      url: 'https://example.com/uploaded-file.jpg',
      filename: 'file.jpg',
      size: 1024000
    })
  }),

  // Admin stats endpoint
  http.get('/api/admin/stats', async () => {
    await delay(700)
    return HttpResponse.json({
      stats: {
        totalUsers: 150,
        totalBookings: 45,
        pendingTestimonials: 8,
        totalRevenue: 15000
      }
    })
  }),

  // Gallery endpoints
  http.get('/api/gallery', async () => {
    await delay(500)
    return HttpResponse.json({
      images: [
        {
          id: '1',
          url: '/placeholder.svg',
          title: 'Workshop Session',
          description: 'Community workshop',
          uploadedAt: new Date().toISOString()
        }
      ]
    })
  }),

  http.post('/api/gallery', async ({ request }) => {
    await delay(1800)
    const data = await request.json() as Record<string, unknown>
    
    return HttpResponse.json({
      image: {
        id: Date.now().toString(),
        ...data,
        uploadedAt: new Date().toISOString()
      }
    })
  })
]
