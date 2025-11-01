"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, Calendar, Trash2, Check } from "lucide-react"
import { apiService } from "@/lib/services/api"
import type { ContactSubmission } from "@/lib/services/api"

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    setLoading(true)
    const data = await apiService.contacts.getAll()
    setContacts(data)
    setLoading(false)
  }

  const handleMarkAsRead = async (id: string) => {
    await apiService.contacts.markAsRead(id)
    loadContacts()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      await apiService.contacts.delete(id)
      loadContacts()
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Contact Submissions</h1>
        <p className="text-[#2C3E50] mt-2">View and manage contact form submissions</p>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
              <Input
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#A8D5BA]/30"
              />
            </div>
            <div className="flex gap-2">
              {["all", "unread", "read"].map((status) => (
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
          <CardTitle className="text-[#2D5F4F]">All Submissions ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#2C3E50] text-center py-8">Loading submissions...</p>
          ) : filteredContacts.length === 0 ? (
            <p className="text-[#2C3E50] text-center py-8">No submissions found</p>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="border border-[#A8D5BA]/20 rounded-lg p-4 hover:border-[#2A7F7F]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#2D5F4F]">{contact.name}</h3>
                      <Badge
                        className={
                          contact.status === "unread" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {contact.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#2C3E50]">
                      <Calendar className="h-3 w-3" />
                      {contact.submittedAt}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Mail className="h-4 w-4 text-[#2A7F7F]" />
                      <a href={`mailto:${contact.email}`} className="hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-[#2C3E50]">
                        <Phone className="h-4 w-4 text-[#2A7F7F]" />
                        <a href={`tel:${contact.phone}`} className="hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="bg-[#F5F3EE] rounded p-3 mb-3">
                    <p className="text-sm text-[#2C3E50]">{contact.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {contact.status === "unread" && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkAsRead(contact.id)}
                        className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(contact.id)}
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
