"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, User, Heart, BookOpen } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    console.log("[v0] Dashboard - Auth state:", { isAuthenticated, isLoading, user: user?.email })

    if (!isLoading && !isAuthenticated) {
      console.log("[v0] Dashboard - Not authenticated, redirecting to /login")
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router, user])

  if (isLoading) {
    console.log("[v0] Dashboard - Loading auth state...")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A7F7F]"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log("[v0] Dashboard - Not authenticated, showing nothing")
    return null
  }

  console.log("[v0] Dashboard - Rendering dashboard for user:", user?.email)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EE] to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F] mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Manage your bookings and account settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-lift">
            <CardHeader>
              <Calendar className="h-8 w-8 text-[#2A7F7F] mb-2" />
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and manage your session bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                <Link href="/dashboard/bookings">View Bookings</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <User className="h-8 w-8 text-[#2A7F7F] mb-2" />
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <Heart className="h-8 w-8 text-[#2A7F7F] mb-2" />
              <CardTitle>Share Testimonial</CardTitle>
              <CardDescription>Share your experience with us</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/testimonials#submit">Submit Testimonial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-[#2A7F7F] mb-2" />
              <CardTitle>Book New Session</CardTitle>
              <CardDescription>Schedule your next coaching session</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                <Link href="/booking">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
