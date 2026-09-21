import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Privacy Policy"
        description="Skyline Custom Shop privacy policy. Learn how we collect, use, and protect your personal information."
        canonical="https://www.skylinecustomshop.com/privacy-policy"
      />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 bg-[oklch(0.10_0.005_285)]">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-brand-orange" />
            <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">
              Legal
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-[oklch(0.96_0.008_85)] leading-none mb-4">
            PRIVACY<br />
            <span className="text-brand-orange">POLICY</span>
          </h1>
          <p className="text-[oklch(0.66_0.008_285)] text-sm">Last updated: February 2026</p>
        </div>
      </section>

      <div className="h-[2px] bg-brand-orange" />

      {/* Content */}
      <section className="py-16 bg-[oklch(0.10_0.005_285)]">
        <div className="container max-w-3xl">
          <div className="prose prose-invert prose-sm max-w-none space-y-10 text-[oklch(0.65_0.008_85)] leading-relaxed">

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">1. OVERVIEW</h2>
              <p>
                Skyline Custom Shop ("we," "us," or "our") operates the website at skylinecustomshop.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or contact us for services. By using our site, you agree to the terms of this policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">2. INFORMATION WE COLLECT</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="space-y-2 list-none pl-0">
                {[
                  "Personal identifiers such as your name, email address, and phone number when you submit a contact or quote form.",
                  "Vehicle information (make, model, year) that you provide when requesting a service quote.",
                  "Usage data including your IP address, browser type, pages visited, and time spent on the site, collected automatically through standard web server logs and analytics tools.",
                  "Communications you send us via the contact form or by phone.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-orange mt-1 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">3. HOW WE USE YOUR INFORMATION</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="space-y-2 list-none pl-0">
                {[
                  "Respond to your inquiries and provide service quotes.",
                  "Schedule appointments and deliver the services you request.",
                  "Send follow-up communications related to your service.",
                  "Improve our website and customer experience.",
                  "Comply with legal obligations.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-orange mt-1 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">4. SHARING YOUR INFORMATION</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business (such as our CRM platform, GoHighLevel), provided those parties agree to keep this information confidential. We may also disclose information when required by law or to protect our rights.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">5. COOKIES & ANALYTICS</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our site may not function properly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">6. DATA SECURITY</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">7. YOUR RIGHTS</h2>
              <p>
                You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, please contact us at the information below. We will respond to your request within a reasonable timeframe.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">8. THIRD-PARTY LINKS</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">9. CHANGES TO THIS POLICY</h2>
              <p>
                We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. Your continued use of our website after any changes constitutes your acceptance of the new policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">10. CONTACT US</h2>
              <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="border border-[oklch(0.20_0.006_285)] bg-[oklch(0.12_0.005_285)] p-6 space-y-2">
                <p className="text-[oklch(0.85_0.008_85)] font-semibold">Skyline Custom Shop</p>
                <p>4215 Walney Rd Suite 1A &amp; B, Chantilly, VA 20151</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+17037754383" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">
                    (703) 775-4383
                  </a>
                </p>
                <p>Website: skylinecustomshop.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
