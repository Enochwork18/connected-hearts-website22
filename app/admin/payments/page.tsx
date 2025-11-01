"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CreditCard, Calendar, User, Download } from "lucide-react"
import { apiService } from "@/lib/services/api"
import type { Payment } from "@/lib/services/api"

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    setLoading(true)
    const data = await apiService.payments.getAll()
    setPayments(data)
    setLoading(false)
  }

  const handleExport = () => {
    const csv = [
      ["Transaction ID", "Client", "Amount", "Method", "Status", "Date"],
      ...filteredPayments.map((payment) => [
        payment.transactionId,
        payment.clientName,
        `£${payment.amount}`,
        payment.method,
        payment.status,
        payment.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `payments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalRevenue = filteredPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Payments</h1>
          <p className="text-[#2C3E50] mt-2">Track payments and transactions</p>
        </div>
        <Button onClick={handleExport} className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="border-[#A8D5BA]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#2C3E50]">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2D5F4F]">£{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="border-[#A8D5BA]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#2C3E50]">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {payments.filter((p) => p.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#A8D5BA]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#2C3E50]">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {payments.filter((p) => p.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
              <Input
                placeholder="Search by client, transaction ID, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#A8D5BA]/30"
              />
            </div>
            <div className="flex gap-2">
              {["all", "completed", "pending", "failed", "refunded"].map((status) => (
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
          <CardTitle className="text-[#2D5F4F]">Payment History ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#2C3E50] text-center py-8">Loading payments...</p>
          ) : filteredPayments.length === 0 ? (
            <p className="text-[#2C3E50] text-center py-8">No payments found</p>
          ) : (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="border border-[#A8D5BA]/20 rounded-lg p-4 hover:border-[#2A7F7F]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[#2D5F4F] text-lg">{payment.service}</h3>
                      <p className="text-sm text-[#2C3E50] mt-1">Transaction ID: {payment.transactionId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#2A7F7F]">£{payment.amount.toFixed(2)}</p>
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <User className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{payment.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <CreditCard className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{payment.method}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Calendar className="h-4 w-4 text-[#2A7F7F]" />
                      <span>{payment.date}</span>
                    </div>
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
