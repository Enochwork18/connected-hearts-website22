"use client"

import type React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "", // Spam protection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      console.log("[Security] Bot detected via honeypot")
      setSubmitStatus("success") // Fake success to fool bots
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("[v0] Contact form submitted (mock):", formData)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" })
    } catch (error) {
      console.error("[v0] Contact form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20Well%20Do%20You%20REALLY%20Know%20Your%20Team___Think%20your%E2%80%A6-k2RjB4ivTDqH4utWDS6pgZ98GhK2Hj.jpg"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/85 via-[#2A7F7F]/80 to-[#A8D5BA]/75" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-h2 font-heading font-bold text-white">Get in Touch</h1>
            <p className="text-lg leading-relaxed text-white/95">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-[#A8D5BA]/30">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A8D5BA]/20">
                    <Mail className="h-6 w-6 text-[#2A7F7F]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[#2D5F4F]">Email Us</h3>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:enquiries@ibasepo.org.uk" className="text-sm text-[#2A7F7F] hover:underline">
                      enquiries@ibasepo.org.uk
                    </a>
                    <a href="mailto:eo.bismark@ibasepo.org.uk" className="text-sm text-[#2A7F7F] hover:underline">
                      eo.bismark@ibasepo.org.uk
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#A8D5BA]/30">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A8D5BA]/20">
                    <Phone className="h-6 w-6 text-[#2A7F7F]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[#2D5F4F]">Call or WhatsApp</h3>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+447958709238" className="text-sm text-[#2A7F7F] hover:underline">
                      +44 7958 709238
                    </a>
                    <a
                      href="https://wa.me/447958709238"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#2C3E50] hover:text-[#2A7F7F]"
                    >
                      (WhatsApp)
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#A8D5BA]/30">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A8D5BA]/20">
                    <MapPin className="h-6 w-6 text-[#2A7F7F]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[#2D5F4F]">Visit Us</h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=The+Living+Room+14+Brunswick+Street+Stretford+M32+8NJ+UK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2C3E50] hover:text-[#2A7F7F] transition-colors"
                  >
                    The Living Room, 14 Brunswick Street, Stretford, M32 8NJ, UK
                  </a>
                </CardContent>
              </Card>

              {/* Google Maps Embed */}
              <Card className="border-[#A8D5BA]/30">
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.8!2d-2.3!3d53.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI3JzAwLjAiTiAywrAxOCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Our Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-[#A8D5BA]/30">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users, visible to bots */}
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="rounded-lg bg-[#A8D5BA]/20 p-4 text-sm text-[#2A7F7F]">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white sm:w-auto"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
