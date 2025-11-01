"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { blogPosts } from "@/lib/mock-data"
import { Calendar, User, Tag, Search } from "lucide-react"
import { useState, useMemo } from "react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Extract unique categories from blog posts
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map((post) => post.category))
    return Array.from(cats)
  }, [])

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === null || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Discover%20a%20wide%20range%20of%20Team%20Building%20Activities%E2%80%A6-f6A8aJF2XiFruCkYEhClWDjzSdi0Lm.jpg"
            alt="Adventure activities"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/85 via-[#2A7F7F]/80 to-[#A8D5BA]/75" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-h2 font-heading font-bold text-white">Our Blog</h1>
            <p className="text-lg leading-relaxed text-white/95">
              Insights, tips, and inspiration for building stronger relationships through faith.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                      <CardContent className="p-0">
                        {post.image && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(post.publishDate).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="h-4 w-4" />
                              <span className="text-teal">{post.category}</span>
                            </div>
                            <span>{post.readTime} read</span>
                          </div>
                          <h2 className="mb-3 text-2xl font-bold text-forest">
                            <Link href={`/blog/${post.slug}`} className="hover:text-teal">
                              {post.title}
                            </Link>
                          </h2>
                          <p className="mb-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                          <Button variant="link" asChild className="px-0 text-teal">
                            <Link href={`/blog/${post.slug}`}>Read More →</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">No articles found. Try adjusting your search or filter.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold text-forest">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`text-sm transition-colors hover:text-teal ${
                          selectedCategory === null ? "font-semibold text-teal" : "text-muted-foreground"
                        }`}
                      >
                        All Articles
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`text-sm transition-colors hover:text-teal ${
                            selectedCategory === category ? "font-semibold text-teal" : "text-muted-foreground"
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-primary text-white">
                <CardContent className="pt-6">
                  <h3 className="mb-3 text-lg font-semibold">Subscribe to Our Newsletter</h3>
                  <p className="mb-4 text-sm text-white/90">
                    Get the latest insights and updates delivered to your inbox.
                  </p>
                  <Button variant="secondary" asChild className="w-full">
                    <Link href="/contact">Subscribe Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
