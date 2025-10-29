"use client"

import { galleryItems } from "@/lib/mock-data"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(galleryItems.map((item) => item.category))
    return Array.from(cats)
  }, [])

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (selectedCategory === null) return galleryItems
    return galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/664c7934-147b-4b8e-88e8-d03cabb2e59d-LJKJUpwkBFIeMb7K5EqaIC70NeKUeW.jpg"
            alt="Team collaboration and unity"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/85 via-[#2A7F7F]/80 to-[#A8D5BA]/75" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">Gallery</h1>
            <p className="text-lg leading-relaxed text-white/95">
              Moments from our workshops, events, and client success stories.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border dark:border-slate-700 bg-background dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-teal hover:bg-teal/90" : ""}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-teal hover:bg-teal/90 dark:bg-teal-600 dark:hover:bg-teal-700" : "dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Layout */}
      <section className="py-16 lg:py-24 bg-background dark:bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative mb-6 break-inside-avoid overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setLightboxImage(item.image)}
                >
                  <div className="overflow-hidden bg-muted dark:bg-slate-800">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.description && <p className="text-sm text-white/90">{item.description}</p>}
                      <p className="mt-1 text-xs text-teal dark:text-teal-400">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">No gallery items in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxImage || "/placeholder.svg"}
            alt="Gallery image"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
