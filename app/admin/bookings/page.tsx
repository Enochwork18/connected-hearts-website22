"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Clock, User, Mail, Phone } from "lucide-react"
import { apiService } from "@/lib/services/api"
import type { Booking } from "@/lib/services/api"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    setLoading(true)
    const data = await apiService.bookings.getAll()
    setBookings(data)
    setLoading(false)
  }

  const handleStatusChange = async (id: string, status: string) => {
    await apiService.bookings.updateStatus(id, status)
    loadBookings()
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Bookings</h1>
        <p className="text-[#2C3E50] mt-2">Manage client bookings and appointments</p>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
              <Input
                placeholder="Search by name, email, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#A8D5BA]/30"
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-[#2A7F7F] hover:bg-[#2D5F4F]" : "border-[#A8D5BA]/30"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A8D5BA]/30">
        <CardHeader>
          <CardTitle className="text-[#2D5F4F]">All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#2C3E50] text-center py-8">Loading bookings...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="text-[#2C3E50] text-center py-8">No bookings found</p>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-[#A8D5BA]/20 rounded-lg p-4 hover:border-[#2A7F7F]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[#2D5F4F] text-lg">{booking.service}</h3>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(booking.id, "confirmed")}
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(booking.id, "cancelled")}
                        className="border-red-500 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <User className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{booking.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Mail className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{booking.clientEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Phone className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{booking.clientPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Calendar className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Clock className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mt-3 pt-3 border-t border-[#A8D5BA]/20">
                      <p className="text-sm text-[#2C3E50]">
                        <span className="font-medium">Notes:</span> {booking.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
