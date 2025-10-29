"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { services } from "@/lib/mock-data"

export default function ServicesClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Marriage & Relationships", "Parenting & Family", "Personal Growth", "Workshops"]

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%8C%BF%20Unleash%20Your%20Team%E2%80%99s%20Potential%21%20Looking%20for%20fun%E2%80%A6-YpJmSWpPjnCzwRm08kZAUZjudg1PNx.jpg"
            alt="Outdoor team activities"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/85 via-[#2A7F7F]/80 to-[#A8D5BA]/75" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-h1 font-heading font-bold text-white">Our Services</h1>
            <p className="text-lg text-white/95 leading-relaxed">
              Comprehensive faith-based coaching and consultancy services designed to strengthen your relationships and
              transform your life.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2C3E50]/50 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-[#A8D5BA]/30 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#2A7F7F] text-white"
                    : "bg-[#F5F3EE] dark:bg-gray-800 text-[#2C3E50] dark:text-gray-300 hover:bg-[#A8D5BA]/20 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-[#F5F3EE] dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredServices.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="group hover:shadow-lg transition-all duration-300 border-[#A8D5BA]/30 dark:border-gray-700 bg-white dark:bg-gray-900"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg bg-[#CFEAFB]/20">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 inline-block rounded-full bg-[#A8D5BA]/20 dark:bg-[#8CC9A8]/20 px-3 py-1 text-xs font-medium text-[#2A7F7F] dark:text-[#8CC9A8]">
                        {service.category}
                      </div>
                      <h3 className="mb-2 text-xl font-heading font-semibold text-[#2D5F4F] dark:text-[#8CC9A8]">{service.title}</h3>
                      <p className="mb-4 text-sm text-[#2C3E50] dark:text-gray-300 leading-relaxed">{service.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-[#2C3E50]/70 dark:text-gray-400">
                          <span className="font-medium">{service.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{service.price}</span>
                        </div>
                      </div>
                      <Button variant="link" asChild className="mt-4 px-0 text-[#2A7F7F] dark:text-[#8CC9A8] hover:text-[#2D5F4F] dark:hover:text-[#A5D4F3]">
                        <Link href={`/services/${service.slug}`}>
                          Learn More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#2C3E50] dark:text-gray-300">No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#8CC9A8]">
            Not Sure Which Service Is Right for You?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[#2C3E50] dark:text-gray-300 leading-relaxed">
            Book a free consultation call and we'll help you find the perfect service for your needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
              <Link href="/booking">Book Free Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-[#2A7F7F] text-[#2A7F7F] hover:bg-[#2A7F7F] hover:text-white bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
