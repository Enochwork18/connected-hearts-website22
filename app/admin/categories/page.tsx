"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react"

// Mock categories data
const mockCategories = [
  { id: "1", name: "Marriage Counseling", type: "service", count: 3, color: "#2A7F7F" },
  { id: "2", name: "Family Therapy", type: "service", count: 2, color: "#2D5F4F" },
  { id: "3", name: "Personal Development", type: "service", count: 4, color: "#A8D5BA" },
  { id: "4", name: "Relationships", type: "blog", count: 8, color: "#2A7F7F" },
  { id: "5", name: "Faith & Spirituality", type: "blog", count: 6, color: "#2D5F4F" },
  { id: "6", name: "Parenting", type: "blog", count: 5, color: "#A8D5BA" },
  { id: "7", name: "Mental Health", type: "blog", count: 7, color: "#2A7F7F" },
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id))
    }
  }

  const filteredCategories = categories.filter((cat) => typeFilter === "all" || cat.type === typeFilter)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Categories</h1>
          <p className="text-[#2C3E50] mt-2">Manage blog and service categories</p>
        </div>
        <Button className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      <Card className="border-[#A8D5BA]/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            {["all", "service", "blog"].map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className={typeFilter === type ? "bg-[#2A7F7F] hover:bg-[#2D5F4F]" : "border-[#A8D5BA]/30"}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="border-[#A8D5BA]/30">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <FolderOpen className="h-5 w-5" style={{ color: category.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-[#2D5F4F] text-lg">{category.name}</CardTitle>
                    <Badge className="mt-1 bg-[#A8D5BA]/20 text-[#2D5F4F]">{category.type}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#2C3E50]">
                  {category.count} {category.type === "service" ? "services" : "posts"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2A7F7F] text-[#2A7F7F] hover:bg-[#2A7F7F] hover:text-white bg-transparent"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card className="border-[#A8D5BA]/30">
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 text-[#2C3E50]/30 mx-auto mb-4" />
            <p className="text-[#2C3E50]">No categories found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
