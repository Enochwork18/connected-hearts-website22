import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { blogPosts } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts from the same category
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#A8D5BA]/20 via-[#CFEAFB]/10 to-[#F5F3EE] py-16 lg:py-24">
        <div className="absolute inset-0 opacity-5 pattern-bg" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl">
            <Button variant="ghost" asChild className="mb-6 text-[#2A7F7F] hover:text-[#2D5F4F] hover:bg-[#A8D5BA]/10">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <h1 className="mb-6 text-h1 font-heading font-bold text-[#2D5F4F] text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.publishDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
              <span className="text-sm">{post.readTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {post.image && (
              <div className="mb-12 aspect-video overflow-hidden rounded-lg">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:text-forest prose-a:text-teal prose-a:no-underline hover:prose-a:underline">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-forest">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-forest">Related Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    {relatedPost.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="mb-2 text-xs font-medium text-teal">{relatedPost.category}</div>
                      <h3 className="mb-2 text-lg font-semibold text-forest">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-teal">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                      <div className="mt-4 text-xs text-muted-foreground">{relatedPost.readTime} read</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
