"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Search, ImageIcon } from "lucide-react"
import Image from "next/image"

// Mock gallery images
const mockGalleryImages = [
  {
    id: "1",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HAPPY%20BIRTHDAY%20to%20our%20Recreational%20Therapist%E2%80%A6-57wXMhV5YoMKvUuw4lxYsRWJ6UmpTO.jpg",
    title: "Therapy Session",
    category: "Counseling",
  },
  {
    id: "2",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/664c7934-147b-4b8e-88e8-d03cabb2e59d-LJKJUpwkBFIeMb7K5EqaIC70NeKUeW.jpg",
    title: "Team Building",
    category: "Workshops",
  },
  {
    id: "3",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20Well%20Do%20You%20REALLY%20Know%20Your%20Team___Think%20your%E2%80%A6-k2RjB4ivTDqH4utWDS6pgZ98GhK2Hj.jpg",
    title: "Group Session",
    category: "Workshops",
  },
  {
    id: "4",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Discover%20a%20wide%20range%20of%20Team%20Building%20Activities%E2%80%A6-f6A8aJF2XiFruCkYEhClWDjzSdi0Lm.jpg",
    title: "Adventure Therapy",
    category: "Activities",
  },
  {
    id: "5",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/family%20reunion%20games%20%E2%80%93%2071toes-o0PoDvSBwmU0pPEi3OJ7MfdEzyyY3J.jpg",
    title: "Family Gathering",
    category: "Family",
  },
  {
    id: "6",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%8C%BF%20Unleash%20Your%20Team%E2%80%99s%20Potential%21%20Looking%20for%20fun%E2%80%A6-YpJmSWpPjnCzwRm08kZAUZjudg1PNx.jpg",
    title: "Outdoor Activities",
    category: "Team Building",
  },
]

export default function AdminGalleryPage() {
  const [images, setImages] = useState(mockGalleryImages)
  const [searchTerm, setSearchTerm] = useState("")

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((img) => img.id !== id))
    }
  }

  const filteredImages = images.filter(
    (img) =>
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Gallery</h1>
          <p className="text-[#2C3E50] mt-2">Manage gallery images</p>
        </div>
        <Button className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2C3E50]/50" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#A8D5BA]/30"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A8D5BA]/30">
        <CardHeader>
          <CardTitle className="text-[#2D5F4F]">Gallery Images ({filteredImages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-[#2C3E50]/30 mx-auto mb-4" />
              <p className="text-[#2C3E50]">No images found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-[#A8D5BA]/30"
                >
                  <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                    <p className="text-white font-medium text-sm text-center">{image.title}</p>
                    <p className="text-white/80 text-xs">{image.category}</p>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)} className="mt-2">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
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
