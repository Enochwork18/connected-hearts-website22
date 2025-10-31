"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Star, Search, Check, X } from "lucide-react"
import { apiService } from "@/lib/services/api"
import type { Testimonial } from "@/lib/services/api"

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setLoading(true)
    const data = await apiService.testimonials.getAll()
    setTestimonials(data)
    setLoading(false)
  }

  const handleApprove = async (id: string) => {
    await apiService.testimonials.approve(id)
    loadTestimonials()
  }

  const handleReject = async (id: string) => {
    await apiService.testimonials.reject(id)
    loadTestimonials()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await apiService.testimonials.delete(id)
      loadTestimonials()
    }
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || testimonial.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Testimonials</h1>
        <p className="text-[#2C3E50] mt-2">Manage client testimonials and reviews</p>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#A8D5BA]/30"
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending", "approved", "rejected"].map((status) => (
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
          <CardTitle className="text-[#2D5F4F]">All Testimonials ({filteredTestimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#2C3E50] text-center py-8">Loading testimonials...</p>
          ) : filteredTestimonials.length === 0 ? (
            <p className="text-[#2C3E50] text-center py-8">No testimonials found</p>
          ) : (
            <div className="space-y-4">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="border border-[#A8D5BA]/20 rounded-lg p-4 hover:border-[#2A7F7F]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#2D5F4F]">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#2A7F7F] text-[#2A7F7F]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#2A7F7F]">{testimonial.service}</p>
                    </div>
                    <Badge className={getStatusColor(testimonial.status)}>{testimonial.status}</Badge>
                  </div>
                  <p className="text-sm text-[#2C3E50] mb-3">{testimonial.text}</p>
                  <div className="flex gap-2">
                    {testimonial.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(testimonial.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(testimonial.id)}
                          className="border-red-500 text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(testimonial.id)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
