import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Target, BookOpen, Users, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Meet Elizabeth Omolara",
  description:
    "Learn about Elizabeth Omolara and Ìbáṣepọ̀ Connected Hearts. Faith-based coaching rooted in biblical principles and cultural wisdom for stronger relationships.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Faith Foundation",
      description:
        "We ground all our work in Christian values and biblical principles, believing that faith is the foundation of lasting transformation.",
    },
    {
      icon: Users,
      title: "Authentic Connection",
      description:
        "Building genuine, trust-based relationships with our clients through compassion, empathy, and understanding.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Committed to ongoing learning and development, both for ourselves and those we serve.",
    },
    {
      icon: Target,
      title: "Cultural Roots",
      description:
        "Honoring African heritage and cultural wisdom while embracing universal principles of love and connection.",
    },
    {
      icon: Heart,
      title: "Compassionate Support",
      description: "Creating a safe, non-judgmental space where healing and transformation can flourish.",
    },
    {
      icon: BookOpen,
      title: "Evidence-Based Practice",
      description: "Combining faith-based wisdom with proven psychological and coaching methodologies.",
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20Well%20Do%20You%20REALLY%20Know%20Your%20Team___Think%20your%E2%80%A6-k2RjB4ivTDqH4utWDS6pgZ98GhK2Hj.jpg"
            alt="Workshop session with participants"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F4F]/85 via-[#2A7F7F]/80 to-[#A8D5BA]/75" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-h1 font-heading font-bold text-white">About Ìbáṣepọ̀ Connected Hearts</h1>
            <p className="text-lg text-white/95 leading-relaxed">
              Empowering relationships through faith, compassion, and professional guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section with Photo */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors relative">
        <div className="absolute inset-0 opacity-5 pattern-bg" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-24%20at%2005.27.40_e54ebbc5-KNYGipOraefKA4q3h1NLab6cZu6MXx.jpg"
                alt="Elizabeth Omolara - Founder of Connected Hearts"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#8CC9A8]">Meet Elizabeth Omolara</h2>
              <p className="mb-6 text-lg font-medium text-[#2A7F7F] dark:text-[#8CC9A8]">Founder & Lead Coach</p>
              <div className="space-y-4 text-[#2C3E50] dark:text-gray-300 leading-relaxed">
                <p>
                  Welcome to Ìbáṣepọ̀ Connected Hearts. I'm Elizabeth Omolara, and I'm passionate about helping
                  individuals, couples, and families build stronger, more fulfilling relationships rooted in faith and
                  purpose.
                </p>
                <p>
                  With years of experience in faith-based coaching and a deep commitment to cultural wisdom, I blend
                  biblical principles with practical strategies to guide you toward peace, purpose, and lasting
                  transformation.
                </p>
                <p>
                  My approach combines evidence-based practices with faith-centered guidance, creating a safe space for
                  healing, growth, and transformation. Whether you're navigating relationship challenges, seeking
                  personal development, or looking to strengthen your family bonds, I'm here to walk alongside you on
                  your journey.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
                  <Link href="/booking">Work With Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 lg:py-24 bg-[#F5F3EE] dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="max-w-4xl mx-auto border-[#A8D5BA]/30 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="mb-6 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#8CC9A8]">Our Mission</h2>
              <p className="text-xl text-[#2C3E50] dark:text-gray-300 leading-relaxed">
                To guide families toward peace, purpose, and legacy through faith-based coaching that blends cultural
                wisdom with practical strategies for individuals, couples, and families.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#8CC9A8]">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-[#2C3E50] dark:text-gray-300 leading-relaxed">
              These principles guide everything we do at Connected Hearts.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-[#A8D5BA]/30 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A8D5BA]/20 dark:bg-[#8CC9A8]/20">
                      <Icon className="h-6 w-6 text-[#2A7F7F] dark:text-[#8CC9A8]" />
                    </div>
                    <h3 className="mb-3 text-xl font-heading font-semibold text-[#2D5F4F] dark:text-[#8CC9A8]">{value.title}</h3>
                    <p className="text-sm text-[#2C3E50] dark:text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 lg:py-24 bg-[#F5F3EE] dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-h2 font-heading font-bold text-[#2D5F4F] dark:text-[#8CC9A8] text-center">Credentials & Training</h2>
            <Card className="border-[#A8D5BA]/30 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardContent className="p-8">
                <ul className="space-y-4 text-[#2C3E50] dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#2A7F7F] dark:bg-[#8CC9A8] flex-shrink-0" />
                    <span>Certified Relationship Coach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#2A7F7F] flex-shrink-0" />
                    <span>Faith-Based Counseling Certification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#2A7F7F] flex-shrink-0" />
                    <span>Advanced Training in Marriage and Family Therapy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#2A7F7F] flex-shrink-0" />
                    <span>Parenting Coach Certification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#2A7F7F] flex-shrink-0" />
                    <span>Trauma-Informed Care Training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#2A7F7F] flex-shrink-0" />
                    <span>Member of Professional Coaching Association</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#2A7F7F] to-[#2D5F4F] text-white">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-h2 font-heading font-bold">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 leading-relaxed">
            Let's work together to build the relationships you've always dreamed of.
          </p>
          <Button size="lg" className="bg-white text-[#2A7F7F] hover:bg-white/90" asChild>
            <Link href="/booking">Book a Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
