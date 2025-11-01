export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-forest lg:text-5xl">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none space-y-8 leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-forest">1. Introduction</h2>
                <p className="text-muted-foreground">
                  Ìbáṣepọ̀ Connected Hearts ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                  website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">2. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Booking and appointment details</li>
                  <li>Payment information</li>
                  <li>Communication preferences</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">3. How We Use Your Information</h2>
                <p className="text-muted-foreground">We use the information we collect to:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your bookings and payments</li>
                  <li>Send you updates, newsletters, and marketing communications</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">5. Your Rights</h2>
                <p className="text-muted-foreground">You have the right to:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-forest">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
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
