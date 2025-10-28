export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-forest lg:text-5xl">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none space-y-8 leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-forest">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using the services of Ìbáṣepọ̀ Connected Hearts, you accept and agree to be bound by
                  these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">2. Services</h2>
                <p className="text-muted-foreground">
                  We provide faith-based coaching and consultancy services for marriages, relationships, and families.
                  Our services are provided for informational and educational purposes and should not replace
                  professional medical or psychological treatment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">3. Booking and Cancellation</h2>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Bookings must be made through our official booking system</li>
                  <li>Cancellations must be made at least 24 hours in advance</li>
                  <li>Late cancellations may be subject to a cancellation fee</li>
                  <li>We reserve the right to cancel or reschedule appointments when necessary</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">4. Payment Terms</h2>
                <p className="text-muted-foreground">
                  Payment is required at the time of booking unless otherwise agreed. We accept various payment methods
                  as indicated on our website. All fees are non-refundable except as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">5. Confidentiality</h2>
                <p className="text-muted-foreground">
                  We maintain strict confidentiality of all client information shared during coaching sessions, except
                  where disclosure is required by law or necessary to prevent harm.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">6. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Our services are provided "as is" without warranties of any kind. We are not liable for any indirect,
                  incidental, or consequential damages arising from the use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">7. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Continued use of our services after changes
                  constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">8. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:info@ibaseponnectedhearts.com" className="text-teal hover:underline">
                    info@ibaseponnectedhearts.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
