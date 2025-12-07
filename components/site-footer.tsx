import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin } from "@/components/icons"
import { NewsletterForm } from "@/components/newsletter-form"

export function SiteFooter() {
  return (
    <footer className="border-t bg-[#F5F3EE]">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              {/* LOGO PLACEHOLDER */}
              <Image
                src="/placeholder-logo.svg"
                alt="Connected Hearts Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-[#2D5F4F] dark:text-[#A8D5BA]">Ìbáṣepọ̀</span>
                <span className="text-sm text-[#2A7F7F]">Connected Hearts</span>
              </div>
            </div>
            <p className="text-sm text-[#2C3E50] leading-relaxed">
              Guiding families toward peace, purpose, and legacy through faith-based coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-heading font-semibold text-[#2D5F4F]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#2C3E50] hover:text-[#2A7F7F] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#2C3E50] hover:text-[#2A7F7F] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#2C3E50] hover:text-[#2A7F7F] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-[#2C3E50] hover:text-[#2A7F7F] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-[#2C3E50] hover:text-[#2A7F7F] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#2C3E50] hover:text-[#2A7F7F] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-heading font-semibold text-[#2D5F4F]">Contact Us</h3>
            <ul className="space-y-2 text-sm text-[#2C3E50]">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#2A7F7F]" />
                <div className="flex flex-col">
                  <a href="mailto:enquiries@ibasepo.org.uk" className="hover:text-[#2A7F7F] transition-colors">
                    enquiries@ibasepo.org.uk
                  </a>
                  <a href="mailto:eo.bismark@ibasepo.org.uk" className="hover:text-[#2A7F7F] transition-colors">
                    eo.bismark@ibasepo.org.uk
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#2A7F7F]" />
                <div className="flex flex-col">
                  <a href="tel:+447958709238" className="hover:text-[#2A7F7F] transition-colors">
                    +44 7958 709238
                  </a>
                  <a
                    href="https://wa.me/447958709238"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#2C3E50]/80 hover:text-[#2A7F7F] transition-colors"
                  >
                    (WhatsApp)
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#2A7F7F]" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Living+Room+14+Brunswick+Street+Stretford+M32+8NJ+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2A7F7F] transition-colors"
                >
                  The Living Room, 14 Brunswick Street, Stretford, M32 8NJ, UK
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-heading font-semibold text-[#2D5F4F]">Stay Connected</h3>
            <p className="mb-4 text-sm text-[#2C3E50]">Subscribe to our newsletter for updates and insights.</p>
            <NewsletterForm />
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100002866323294"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2A7F7F] hover:text-[#2D5F4F] transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/adukelara?igsh=MWQ0cWx1eGtpaXdxcw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2A7F7F] hover:text-[#2D5F4F] transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.8!2d-2.3!3d53.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI3JzAwLjAiTiAywrAxOCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>

        <div className="mt-8 border-t border-[#2A7F7F]/20 pt-8 text-center text-sm text-[#2C3E50]">
          <p>&copy; {new Date().getFullYear()} Ìbáṣepọ̀ Connected Hearts. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/legal/privacy" className="hover:text-[#2A7F7F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-[#2A7F7F] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
