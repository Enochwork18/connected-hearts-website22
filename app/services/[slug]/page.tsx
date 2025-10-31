import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { services, testimonials } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { Check, Clock, DollarSign } from "lucide-react"

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  // Get testimonials related to this service (by matching service title)
  const serviceTestimonials = testimonials
    .filter((t) => t.service.toLowerCase().includes(service.category.toLowerCase()))
    .slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-block rounded-full bg-teal/10 px-4 py-1 text-sm font-medium text-teal">
              {service.category}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-forest lg:text-5xl text-balance">{service.title}</h1>
            <p className="mb-8 text-xl leading-relaxed text-muted-foreground">{service.excerpt}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="bg-teal hover:bg-teal/90">
                <Link href="/booking">Book This Service</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-teal text-teal hover:bg-teal/10 bg-transparent"
              >
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {service.image && (
                  <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-forest">About This Service</h2>
                  <p className="leading-relaxed">{service.description}</p>

                  {service.whatsIncluded && (
                    <>
                      <h3 className="text-forest">What's Included</h3>
                      <ul className="space-y-2">
                        {service.whatsIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-teal" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {service.whoItsFor && (
                    <>
                      <h3 className="text-forest">Who It's For</h3>
                      <p className="leading-relaxed">{service.whoItsFor}</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <Card className="sticky top-24 border-teal/20">
                  <CardContent className="pt-6">
                    <h3 className="mb-6 text-xl font-semibold text-forest">Service Details</h3>
                    <div className="space-y-6">
                      {service.duration && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Clock className="h-5 w-5 text-teal" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold text-forest">{service.duration}</p>
                          </div>
                        </div>
                      )}
                      {service.price && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <DollarSign className="h-5 w-5 text-teal" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Investment</p>
                            <p className="font-semibold text-forest">{service.price}</p>
                          </div>
                        </div>
                      )}
                      <div className="pt-4">
                        <Button asChild className="w-full bg-teal hover:bg-teal/90">
                          <Link href="/booking">Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {serviceTestimonials.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-forest">What Our Clients Say</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {serviceTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-teal/20">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <svg key={i} className="h-5 w-5 fill-teal text-teal" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{testimonial.text}</p>
                      <div>
                        <p className="font-semibold text-forest">{testimonial.name}</p>
                        <p className="text-xs text-teal">{testimonial.service}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
