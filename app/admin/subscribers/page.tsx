"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Calendar, Download, Trash2 } from "lucide-react"
import { apiService } from "@/lib/services/api"
import type { Subscriber } from "@/lib/services/api"

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubscribers()
  }, [])

  const loadSubscribers = async () => {
    setLoading(true)
    const data = await apiService.subscribers.getAll()
    setSubscribers(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this subscriber?")) {
      await apiService.subscribers.delete(id)
      loadSubscribers()
    }
  }

  const handleExport = () => {
    const csv = [
      ["Email", "Subscribed Date", "Status"],
      ...filteredSubscribers.map((sub) => [sub.email, sub.subscribedAt, sub.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const filteredSubscribers = subscribers.filter((sub) => sub.email.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Subscribers</h1>
          <p className="text-[#2C3E50] mt-2">Manage newsletter subscribers</p>
        </div>
        <Button onClick={handleExport} className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
            <Input
              placeholder="Search subscribers by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#A8D5BA]/30"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A8D5BA]/30">
        <CardHeader>
          <CardTitle className="text-[#2D5F4F]">All Subscribers ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#2C3E50] text-center py-8">Loading subscribers...</p>
          ) : filteredSubscribers.length === 0 ? (
            <p className="text-[#2C3E50] text-center py-8">No subscribers found</p>
          ) : (
            <div className="space-y-3">
              {filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between border-b border-[#A8D5BA]/20 pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Mail className="h-5 w-5 text-[#2A7F7F]" />
                    <div>
                      <p className="font-medium text-[#2D5F4F]">{subscriber.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-[#2C3E50]/50" />
                        <p className="text-xs text-[#2C3E50]">Subscribed: {subscriber.subscribedAt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        subscriber.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {subscriber.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                      onClick={() => handleDelete(subscriber.id)}
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
