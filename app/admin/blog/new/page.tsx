import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>
        <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Create New Blog Post</h1>
        <p className="text-[#2C3E50] mt-2">Add a new article to your blog</p>
      </div>

      <Card className="border-[#A8D5BA]/30">
        <CardHeader>
          <CardTitle className="text-[#2D5F4F]">Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter post title" className="border-[#A8D5BA]/30" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="post-url-slug" className="border-[#A8D5BA]/30" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" placeholder="Brief summary..." rows={3} className="border-[#A8D5BA]/30" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content..."
                rows={10}
                className="border-[#A8D5BA]/30"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Marriage, Parenting, etc." className="border-[#A8D5BA]/30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input id="readTime" placeholder="5 min read" className="border-[#A8D5BA]/30" />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
                Publish Post
              </Button>
              <Button type="button" variant="outline" className="border-[#A8D5BA]/30 bg-transparent">
                Save Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
