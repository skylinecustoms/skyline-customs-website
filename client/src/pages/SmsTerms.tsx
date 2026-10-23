import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function SmsTerms() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Text Message Terms"
        description="What to expect when you get texts from Skyline Customs: what we send, how often, and how to stop. Reply STOP to opt out or HELP for help."
        canonical="https://www.skylinecustomshop.com/sms-terms"
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
            TEXT MESSAGE<br />
            <span className="text-brand-orange">TERMS</span>
          </h1>
          <p className="text-[oklch(0.66_0.008_285)] text-sm">Last updated: October 2026</p>
        </div>
      </section>

      <div className="h-[2px] bg-brand-orange" />

      {/* Content */}
      <section className="py-16 bg-[oklch(0.10_0.005_285)]">
        <div className="container max-w-3xl">
          <div className="prose prose-invert prose-sm max-w-none space-y-10 text-[oklch(0.65_0.008_85)] leading-relaxed">
            <p>These terms cover text messages (SMS) from Skyline Customs (Skyline Custom Shop), 4215 Walney Rd Suite 1A &amp; B, Chantilly, VA 20151.</p>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">HOW YOU SIGN UP</h2>
              <p>You agree to get texts when you send us your mobile number through a quote or contact form on this website and agree to the text message line under the button, or when you text us first. You don't have to agree to texts to buy anything from us.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">WHAT WE TEXT</h2>
              <p>Messages about your request: your quote, questions about your car, appointment confirmations and reminders, follow-ups about the service you asked about, and a review request after your job.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">HOW OFTEN</h2>
              <p>Message frequency varies: usually a few messages after you reach out and around your appointment, and fewer after that.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">COST</h2>
              <p>Message and data rates may apply, based on your mobile plan.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">HOW TO STOP</h2>
              <p>Reply <b>STOP</b> to any message to stop getting texts. We'll send one message to confirm, then no more. Reply <b>START</b> to sign up again.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">HELP</h2>
              <p>Reply <b>HELP</b> to any message, or call us at <a href="tel:+17037754383" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">(703) 775-4383</a>.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">CARRIERS</h2>
              <p>Carriers are not liable for delayed or undelivered messages.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">PRIVACY</h2>
              <p>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. See our <a href="/privacy-policy" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">privacy policy</a>.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
