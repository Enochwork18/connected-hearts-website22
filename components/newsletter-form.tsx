"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiService } from "@/lib/services/api"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")

    try {
      await apiService.subscribers.subscribe(email)

      setStatus("success")
      setEmail("")

      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      console.error("[v0] Newsletter subscription error:", error)
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Newsletter subscription form">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1 bg-white text-[#2C3E50] focus:ring-2 focus:ring-white"
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-[#2A7F7F] hover:bg-white/90 transition-all duration-300 hover:-translate-y-1"
        >
          {isSubmitting ? "..." : "Subscribe"}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-white font-medium" role="status">
          ✓ Thank you for subscribing! Check your email for confirmation.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-200" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </div>
  )
}

export default NewsletterForm
