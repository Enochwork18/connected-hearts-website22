"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight } from "@/components/icons"
import NewsletterForm from "@/components/newsletter-form"
import { useMotionPreference } from "@/hooks/use-motion-preference"
import { useTypewriter } from "@/hooks/use-typewriter"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedHomeProps {
  featuredServices: any[]
  recentPosts: any[]
  featuredTestimonials: any[]
}

export function AnimatedHome({ featuredServices, recentPosts, featuredTestimonials }: AnimatedHomeProps) {
  const { shouldReduceMotion } = useMotionPreference()
  const heroText = useTypewriter({ text: "Connected Hearts, Healed Lives", speed: 80, delay: 500 })

  const MotionDiv = shouldReduceMotion ? "div" : motion.div
  const MotionH1 = shouldReduceMotion ? "h1" : motion.h1
  const MotionP = shouldReduceMotion ? "p" : motion.p

  // Section refs for in-view animations
  const servicesRef = useRef(null)
  const aboutRef = useRef(null)
  const testimonialsRef = useRef(null)
  const blogRef = useRef(null)

  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  const blogInView = useInView(blogRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

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
            <MotionH1
              className="mb-6 text-hero font-heading font-bold leading-tight text-balance text-white min-h-[1.2em]"
              {...(!shouldReduceMotion && {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              })}
            >
              {heroText}
              {!shouldReduceMotion && heroText !== "Connected Hearts, Healed Lives" && (
                <span className="animate-pulse">|</span>
              )}
            </MotionH1>
            <MotionP
              className="mb-8 text-xl text-white/95 leading-relaxed text-pretty"
              {...(!shouldReduceMotion && {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
            >
              Guiding families toward peace, purpose, and legacy through faith-based coaching and consultancy.
            </MotionP>
            <MotionDiv
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              {...(!shouldReduceMotion && {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
              })}
            >
              <Button
                size="lg"
                asChild
                className="bg-white text-[#2A7F7F] hover:bg-white/90 text-lg px-8 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-[#2A7F7F] text-lg px-8 bg-transparent transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Link href="/booking">Book Consultation</Link>
              </Button>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section ref={servicesRef} className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <MotionDiv
            className="mb-12 text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 20 },
              animate: servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
              transition: { duration: 0.6 },
            })}
          >
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#A8D5BA]">Our Services</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] dark:text-gray-300 leading-relaxed">
              Comprehensive support for every stage of your relationship journey
            </p>
          </MotionDiv>

          <MotionDiv
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            {...(!shouldReduceMotion && {
              variants: containerVariants,
              initial: "hidden",
              animate: servicesInView ? "visible" : "hidden",
            })}
          >
            {featuredServices.map((service, index) => (
              <MotionDiv
                key={service.id}
                {...(!shouldReduceMotion && { variants: itemVariants })}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-[#A8D5BA]/30 dark:border-gray-700 hover:-translate-y-2 h-full bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="mb-4 aspect-video relative overflow-hidden rounded-lg bg-[#CFEAFB]/20">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="mb-2 inline-block rounded-full bg-[#A8D5BA]/20 px-3 py-1 text-xs font-medium text-[#2A7F7F]">
                      {service.category}
                    </div>
                    <h3 className="mb-2 text-xl font-heading font-semibold text-[#2D5F4F] dark:text-[#A8D5BA]">{service.title}</h3>
                    <p className="mb-4 text-sm text-[#2C3E50] dark:text-gray-300 leading-relaxed">{service.excerpt}</p>
                    <Button
                      variant="link"
                      asChild
                      className="px-0 text-[#2A7F7F] hover:text-[#2D5F4F] transition-colors duration-200 group/link"
                    >
                      <Link href={`/services/${service.slug}`}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>

          <MotionDiv
            className="mt-12 text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0 },
              animate: servicesInView ? { opacity: 1 } : { opacity: 0 },
              transition: { duration: 0.6, delay: 0.6 },
            })}
          >
            <Button
              size="lg"
              asChild
              className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* About Snippet */}
      <section ref={aboutRef} className="py-16 lg:py-24 bg-[#F5F3EE] dark:bg-gray-800 relative transition-colors">
        <div className="absolute inset-0 opacity-5 pattern-bg" aria-hidden="true" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <MotionDiv
              className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
              {...(!shouldReduceMotion && {
                initial: { opacity: 0, x: -30 },
                animate: aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              })}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-24%20at%2005.27.40_e54ebbc5-KNYGipOraefKA4q3h1NLab6cZu6MXx.jpg"
                alt="Elizabeth Omolara - Faith-based coach and consultant"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </MotionDiv>
            <MotionDiv
              {...(!shouldReduceMotion && {
                initial: { opacity: 0, x: 30 },
                animate: aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 },
                transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
            >
              <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#A8D5BA]">Meet Elizabeth Omolara</h2>
              <p className="mb-4 text-[#2C3E50] dark:text-gray-300 leading-relaxed">
                Welcome to Ìbáṣepọ̀ Connected Hearts. I'm Elizabeth Omolara, and I'm passionate about helping
                individuals, couples, and families build stronger, more fulfilling relationships rooted in faith and
                purpose.
              </p>
              <p className="mb-6 text-[#2C3E50] dark:text-gray-300 leading-relaxed">
                With years of experience in faith-based coaching and a deep commitment to cultural wisdom, I blend
                biblical principles with practical strategies to guide you toward peace, purpose, and lasting
                transformation.
              </p>
              <Button
                asChild
                className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <Link href="/about">Read My Story</Link>
              </Button>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <MotionDiv
            className="mb-12 text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 20 },
              animate: testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
              transition: { duration: 0.6 },
            })}
          >
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F]">What Our Clients Say</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] leading-relaxed">
              Real stories of transformation and healing
            </p>
          </MotionDiv>

          <MotionDiv
            className="grid gap-8 md:grid-cols-3"
            {...(!shouldReduceMotion && {
              variants: containerVariants,
              initial: "hidden",
              animate: testimonialsInView ? "visible" : "hidden",
            })}
          >
            {featuredTestimonials.map((testimonial) => (
              <MotionDiv key={testimonial.id} {...(!shouldReduceMotion && { variants: itemVariants })}>
                <Card className="border-[#A8D5BA]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
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
              </MotionDiv>
            ))}
          </MotionDiv>

          <MotionDiv
            className="mt-12 text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0 },
              animate: testimonialsInView ? { opacity: 1 } : { opacity: 0 },
              transition: { duration: 0.6, delay: 0.4 },
            })}
          >
            <Button
              variant="outline"
              asChild
              className="border-[#2A7F7F] text-[#2A7F7F] hover:bg-[#2A7F7F] hover:text-white bg-transparent transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/testimonials">Read More Testimonials</Link>
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section ref={blogRef} className="py-16 lg:py-24 bg-[#F5F3EE]">
        <div className="container mx-auto px-4 lg:px-8">
          <MotionDiv
            className="mb-12 text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 20 },
              animate: blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
              transition: { duration: 0.6 },
            })}
          >
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F]">Latest from Our Blog</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] leading-relaxed">
              Insights and inspiration for your relationship journey
            </p>
          </MotionDiv>

          <MotionDiv
            className="grid gap-8 md:grid-cols-3"
            {...(!shouldReduceMotion && {
              variants: containerVariants,
              initial: "hidden",
              animate: blogInView ? "visible" : "hidden",
            })}
          >
            {recentPosts.map((post) => (
              <MotionDiv key={post.id} {...(!shouldReduceMotion && { variants: itemVariants })}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-[#A8D5BA]/30 hover:-translate-y-2 h-full">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg bg-[#CFEAFB]/20">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                        <Button variant="link" asChild className="px-0 text-[#2A7F7F] hover:text-[#2D5F4F] group/link">
                          <Link href={`/blog/${post.slug}`}>
                            Read More <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>

          <MotionDiv
            className="mt-12 text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0 },
              animate: blogInView ? { opacity: 1 } : { opacity: 0 },
              transition: { duration: 0.6, delay: 0.4 },
            })}
          >
            <Button
              asChild
              className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <Link href="/blog">View All Articles</Link>
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#2A7F7F] to-[#2D5F4F] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <MotionDiv
            className="mx-auto max-w-2xl text-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
            })}
          >
            <h2 className="mb-4 text-h2 font-heading font-bold text-balance">Join Our Community</h2>
            <p className="mb-8 text-white/90 leading-relaxed text-pretty">
              Subscribe to receive weekly insights, tips, and inspiration for building stronger relationships.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterForm />
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  )
}
