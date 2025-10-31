"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/auth-context"
import { bookingAPI, type Booking } from "@/lib/services/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Download } from "lucide-react"
import { downloadICS } from "@/lib/services/api"

export default function UserBookingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    const loadBookings = async () => {
      if (user) {
        try {
          const data = await bookingAPI.getUserBookings(user.id)
          setBookings(data)
        } catch (error) {
          console.error("Failed to load bookings:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadBookings()
  }, [user])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A7F7F]"></div>
      </div>
    )
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EE] to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F] mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your session bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
              <p className="text-muted-foreground mb-4">Book your first session to get started</p>
              <Button asChild className="bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                <a href="/booking">Book a Session</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{booking.serviceName}</CardTitle>
                      <CardDescription>Booking ID: {booking.id}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Connected Hearts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">£{booking.amount}</span>
                      <Badge variant="outline">{booking.paymentStatus}</Badge>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground">{booking.notes}</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    {booking.status === "confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadICS(booking)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Add to Calendar
                      </Button>
                    )}
                    {booking.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          if (confirm("Are you sure you want to cancel this booking?")) {
                            await bookingAPI.cancel(booking.id)
                            setBookings(bookings.filter((b) => b.id !== booking.id))
                          }
                        }}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
