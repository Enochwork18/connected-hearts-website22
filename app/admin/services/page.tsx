"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { apiService } from "@/lib/services/api"
import type { Service } from "@/lib/services/api"

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    const data = await apiService.services.getAll()
    setServices(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await apiService.services.delete(id)
      loadServices()
    }
  }

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Services</h1>
          <p className="text-[#2C3E50] mt-2">Manage your service offerings</p>
        </div>
        <Button className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Button>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#A8D5BA]/30"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A8D5BA]/30">
        <CardHeader>
          <CardTitle className="text-[#2D5F4F]">All Services ({filteredServices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#2C3E50] text-center py-8">Loading services...</p>
          ) : filteredServices.length === 0 ? (
            <p className="text-[#2C3E50] text-center py-8">No services found</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredServices.map((service) => (
                <div key={service.id} className="border border-[#A8D5BA]/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2D5F4F] text-lg">{service.title}</h3>
                      <Badge className="mt-1 bg-[#A8D5BA]/20 text-[#2D5F4F]">{service.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#2A7F7F]">£{service.price}</p>
                      <p className="text-xs text-[#2C3E50]">{service.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#2C3E50] mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#2A7F7F] text-[#2A7F7F] hover:bg-[#2A7F7F] hover:text-white bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
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
