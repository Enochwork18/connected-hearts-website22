import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight } from "@/components/icons"
import { services, blogPosts, testimonials } from "@/lib/mock-data"
import NewsletterForm from "@/components/newsletter-form"

export default function HomePage() {
  // Get featured services and blog posts
  const featuredServices = services.filter((s) => s.featured).slice(0, 6)
  const recentPosts = blogPosts.slice(0, 3)
  const featuredTestimonials = testimonials.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/family%20reunion%20games%20%E2%80%93%2071toes-o0PoDvSBwmU0pPEi3OJ7MfdEzyyY3J.jpg"
            alt="Family gathering together in unity and love"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/90 via-[#2A7F7F]/85 to-[#A8D5BA]/80" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-hero font-heading font-bold leading-tight text-balance text-white">
              Connected Hearts, Healed Lives
            </h1>
            <p className="mb-8 text-xl text-white/95 leading-relaxed text-pretty">
              Guiding families toward peace, purpose, and legacy through faith-based coaching and consultancy.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-[#2A7F7F] hover:bg-white/90 text-lg px-8 transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-[#2A7F7F] text-lg px-8 bg-transparent transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/booking">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F]">Our Services</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] leading-relaxed">
              Comprehensive support for every stage of your relationship journey
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 border-[#A8D5BA]/30 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="mb-4 aspect-video relative overflow-hidden rounded-lg bg-[#CFEAFB]/20">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="mb-2 inline-block rounded-full bg-[#A8D5BA]/20 px-3 py-1 text-xs font-medium text-[#2A7F7F]">
                    {service.category}
                  </div>
                  <h3 className="mb-2 text-xl font-heading font-semibold text-[#2D5F4F]">{service.title}</h3>
                  <p className="mb-4 text-sm text-[#2C3E50] leading-relaxed">{service.excerpt}</p>
                  <Button
                    variant="link"
                    asChild
                    className="px-0 text-[#2A7F7F] hover:text-[#2D5F4F] transition-colors duration-200"
                  >
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              asChild
              className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 lg:py-24 bg-[#F5F3EE] relative">
        <div className="absolute inset-0 opacity-5 pattern-bg" aria-hidden="true" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-24%20at%2005.27.40_e54ebbc5-KNYGipOraefKA4q3h1NLab6cZu6MXx.jpg"
                alt="Elizabeth Omolara - Faith-based coach and consultant"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F]">Meet Elizabeth Omolara</h2>
              <p className="mb-4 text-[#2C3E50] leading-relaxed">
                Welcome to Ìbáṣepọ̀ Connected Hearts. I'm Elizabeth Omolara, and I'm passionate about helping
                individuals, couples, and families build stronger, more fulfilling relationships rooted in faith and
                purpose.
              </p>
              <p className="mb-6 text-[#2C3E50] leading-relaxed">
                With years of experience in faith-based coaching and a deep commitment to cultural wisdom, I blend
                biblical principles with practical strategies to guide you toward peace, purpose, and lasting
                transformation.
              </p>
              <Button
                asChild
                className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/about">Read My Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F]">What Our Clients Say</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] leading-relaxed">
              Real stories of transformation and healing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-[#A8D5BA]/30">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#2A7F7F] text-[#2A7F7F]" />
                    ))}
                  </div>
                  <p className="mb-4 text-[#2C3E50] leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="border-t border-[#A8D5BA]/30 pt-4">
                    <p className="font-semibold text-[#2D5F4F]">{testimonial.name}</p>
                    <p className="text-sm text-[#2A7F7F]">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              asChild
              className="border-[#2A7F7F] text-[#2A7F7F] hover:bg-[#2A7F7F] hover:text-white bg-transparent"
            >
              <Link href="/testimonials">Read More Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 lg:py-24 bg-[#F5F3EE]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F]">Latest from Our Blog</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] leading-relaxed">
              Insights and inspiration for your relationship journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {recentPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-[#A8D5BA]/30">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg bg-[#CFEAFB]/20">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 inline-block rounded-full bg-[#A8D5BA]/20 px-3 py-1 text-xs font-medium text-[#2A7F7F]">
                      {post.category}
                    </div>
                    <h3 className="mb-2 text-xl font-heading font-semibold text-[#2D5F4F] line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-sm text-[#2C3E50] leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-[#2C3E50]/70">
                      <span>{post.readTime} read</span>
                      <Button variant="link" asChild className="px-0 text-[#2A7F7F] hover:text-[#2D5F4F]">
                        <Link href={`/blog/${post.slug}`}>
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#2A7F7F] to-[#2D5F4F] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-h2 font-heading font-bold text-balance">Join Our Community</h2>
            <p className="mb-8 text-white/90 leading-relaxed text-pretty">
              Subscribe to receive weekly insights, tips, and inspiration for building stronger relationships.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
