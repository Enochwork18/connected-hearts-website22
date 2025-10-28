"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/mock-data"
import { Star } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiService } from "@/lib/services/api"

export default function TestimonialsPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    rating: 5,
    testimonial: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Extract unique service types
  const serviceTypes = useMemo(() => {
    const types = new Set(testimonials.map((t) => t.service))
    return Array.from(types)
  }, [])

  // Filter testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      const matchesService = selectedService === null || testimonial.service === selectedService
      const matchesRating = selectedRating === null || testimonial.rating === selectedRating
      return matchesService && matchesRating
    })
  }, [selectedService, selectedRating])

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await apiService.testimonials.submit({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        rating: formData.rating,
        text: formData.testimonial,
      })

      setSubmitStatus("success")
      setFormData({ name: "", email: "", service: "", rating: 5, testimonial: "" })
      setTimeout(() => {
        setShowSubmitForm(false)
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("[v0] Testimonial submission error:", error)
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/664c7934-147b-4b8e-88e8-d03cabb2e59d-LJKJUpwkBFIeMb7K5EqaIC70NeKUeW.jpg"
            alt="Team unity and connection"
            fill
            className="object-cover"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/85 via-[#2A7F7F]/80 to-[#A8D5BA]/75" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl text-balance">Client Testimonials</h1>
            <p className="text-lg leading-relaxed text-white/95 text-pretty">
              Hear from those whose lives have been transformed through our faith-based coaching services.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-background py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-forest">Filter by:</span>

            {/* Service Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedService === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedService(null)}
                className={selectedService === null ? "bg-teal hover:bg-teal/90" : ""}
              >
                All Services
              </Button>
              {serviceTypes.map((service) => (
                <Button
                  key={service}
                  variant={selectedService === service ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedService(service)}
                  className={selectedService === service ? "bg-teal hover:bg-teal/90" : ""}
                >
                  {service}
                </Button>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rating:</span>
              <Button
                variant={selectedRating === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRating(null)}
                className={selectedRating === null ? "bg-teal hover:bg-teal/90" : ""}
              >
                All
              </Button>
              <Button
                variant={selectedRating === 5 ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRating(5)}
                className={selectedRating === 5 ? "bg-teal hover:bg-teal/90" : ""}
              >
                5 ★
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredTestimonials.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTestimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="border-teal/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex gap-1" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-teal text-teal" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-teal"
                        aria-hidden="true"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-forest">{testimonial.name}</p>
                        <p className="text-xs text-teal">{testimonial.service}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(testimonial.date).toLocaleDateString("en-GB", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">No testimonials match your filters. Try adjusting your selection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Submission Section */}
      <section className="py-16 lg:py-24 bg-[#F5F3EE]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {!showSubmitForm ? (
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-heading font-bold text-[#2D5F4F]">Share Your Experience</h2>
                <p className="mb-8 text-[#2C3E50] leading-relaxed">
                  Have you worked with us? We'd love to hear about your journey and how our services have helped you.
                </p>
                <Button
                  size="lg"
                  onClick={() => setShowSubmitForm(true)}
                  className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white transition-all duration-300"
                >
                  Submit Your Testimonial
                </Button>
              </div>
            ) : (
              <Card className="border-[#A8D5BA]/30">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-heading font-bold text-[#2D5F4F]">Submit Your Testimonial</h2>

                  {submitStatus === "success" ? (
                    <div className="text-center py-8">
                      <div className="mb-4 text-5xl">✓</div>
                      <h3 className="text-xl font-semibold text-[#2A7F7F] mb-2">Thank You!</h3>
                      <p className="text-[#2C3E50]">
                        Your testimonial has been submitted and is pending approval. We appreciate you sharing your
                        experience!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitTestimonial} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            disabled={isSubmitting}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={isSubmitting}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Received *</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => setFormData({ ...formData, service: value })}
                            disabled={isSubmitting}
                            required
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceTypes.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rating">Rating *</Label>
                          <Select
                            value={formData.rating.toString()}
                            onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger id="rating">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Stars - Excellent</SelectItem>
                              <SelectItem value="4">4 Stars - Very Good</SelectItem>
                              <SelectItem value="3">3 Stars - Good</SelectItem>
                              <SelectItem value="2">2 Stars - Fair</SelectItem>
                              <SelectItem value="1">1 Star - Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="testimonial">Your Testimonial *</Label>
                        <Textarea
                          id="testimonial"
                          value={formData.testimonial}
                          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                          required
                          disabled={isSubmitting}
                          placeholder="Share your experience with our services..."
                          rows={6}
                          className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          Please share specific details about how our services helped you.
                        </p>
                      </div>

                      {submitStatus === "error" && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                          Something went wrong. Please try again later.
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowSubmitForm(false)}
                          disabled={isSubmitting}
                          className="border-[#2A7F7F] text-[#2A7F7F] hover:bg-[#2A7F7F] hover:text-white"
                        >
                          Cancel
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        Your testimonial will be reviewed before being published on our website.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-teal py-16 text-white lg:py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl text-balance">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 text-pretty">
            Join the many clients who have transformed their relationships through our services.
          </p>
          <Button size="lg" variant="secondary" asChild className="transition-all duration-300 hover:-translate-y-1">
            <a href="/booking">Book a Session</a>
          </Button>
        </div>
      </section>
    </>
  )
}
