import { services, blogPosts, testimonials } from "@/lib/mock-data"
import { AnimatedHome } from "@/components/animated-home"

export default function HomePage() {
  // Get featured services and blog posts
  const featuredServices = services.filter((s) => s.featured).slice(0, 6)
  const recentPosts = blogPosts.slice(0, 3)
  const featuredTestimonials = testimonials.slice(0, 3)

  return (
    <AnimatedHome
      featuredServices={featuredServices}
      recentPosts={recentPosts}
      featuredTestimonials={featuredTestimonials}
    />
  )
}
