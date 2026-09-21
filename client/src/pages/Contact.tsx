import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trackLead } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";

// GHL field IDs (from the live form inspection)
// first_name, last_name, phone, email (standard)
// 2YNQZIRvWYEjqdJ2UGVw = Make
// DAjqA7njYRUfAh7t67Xb = Model
// n5O64Bp2FJvBK5GsVSnV = Year
// j9D2tGUUK4qUONagWL71 = Service (radio)

const SERVICE_OPTIONS = [
  { value: "Ceramic Coating", label: "Ceramic Coating" },
  { value: "Tints", label: "Window Tinting" },
  { value: "PPF", label: "Paint Protection Film (PPF)" },
  { value: "Multiple Services - Bundle & Save", label: "Multiple Services — Bundle & Save" },
  { value: "Not Sure Yet", label: "Not Sure Yet" },
];

const CONTACT_FAQS = [
  { q: "Do I need an appointment, or can I walk in?", a: "Quotes and questions are welcome any time during business hours, Monday to Friday, 9 AM to 6 PM. Installs are by appointment so the bay is ready for your car. Request a quote online or call (703) 775-4383 and we will book a slot, often within the same week." },
  { q: "How fast do you reply to a quote request?", a: "Usually within the hour during business hours and always the same business day. Tell us the year, make, model, and the coverage you want and the reply is a written quote, not a range." },
  { q: "Where do I park, and can I leave the car for the day?", a: "Free parking is on site at 4215 Walney Rd, Suite 1A and B. Most PPF and tint jobs are same-day: drop off at 9 AM and pick up in the afternoon. Ceramic coatings are two days, so we plan a next-day pickup with you." },
  { q: "What should I bring to the appointment?", a: "Just the car, washed or not. We decontaminate every vehicle before any film or coating goes on. If you have a medical tint exemption, bring the certificate so we install to the exempted limits." },
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    make: "",
    model: "",
    year: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMsg("");
      trackLead("contact_form", form.service);
    },
    onError: (err) => {
      setErrorMsg("Something went wrong. Please call us at (703) 775-4383 or try again.");
      console.error("[Contact form error]", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    submitContact.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      make: form.make || undefined,
      model: form.model || undefined,
      year: form.year || undefined,
      service: form.service || undefined,
      message: form.message || undefined,
    });
  };

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const inputClass =
    "w-full bg-[oklch(0.16_0.006_285)] border border-[oklch(0.25_0.006_285)] text-[oklch(0.85_0.008_85)] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors placeholder:text-[oklch(0.40_0.006_285)]";

  const labelClass =
    "font-mono-brand text-xs text-brand-orange uppercase tracking-widest block mb-2";

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Contact Us | Chantilly VA Auto Protection"
        description="Book a free consultation for PPF, ceramic coating, or window tinting. Call (703) 775-4383 or visit 4215 Walney Rd, Chantilly, VA."
        canonical="https://www.skylinecustomshop.com/contact"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AutoBodyShop",
            "name": "Skyline Custom Shop",
            "url": "https://www.skylinecustomshop.com/contact",
            "telephone": "+17037754383",
            "email": "info@skylinecustomshop.com",
            "address": { "@type": "PostalAddress", "streetAddress": "4215 Walney Rd Suite 1A & B", "addressLocality": "Chantilly", "addressRegion": "VA", "postalCode": "20151", "addressCountry": "US" },
            "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "18:00" }],
          },
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": CONTACT_FAQS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ]}
      />
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-brand-orange" />
            <span className="font-mono-brand text-xs text-brand-orange uppercase tracking-[0.2em]">
              Get In Touch
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-[oklch(0.96_0.008_85)] leading-none mb-6">
            CONTACT<br />
            <span className="text-brand-orange">US</span>
          </h1>
          <p className="text-[oklch(0.66_0.01_285)] text-lg max-w-2xl">
            Ready to protect your vehicle? Book an appointment online, give us a call, or send us a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[oklch(0.20_0.006_285)]">

            {/* ── Left: Contact Info ── */}
            <div className="bg-[oklch(0.10_0.005_285)] p-8 lg:p-10">
              <h2 className="font-display text-3xl text-[oklch(0.96_0.008_85)] tracking-wider mb-8">
                REACH US
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-brand-orange flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className={labelClass}>Phone</p>
                    <a href="tel:+17037754383" className="text-[oklch(0.75_0.008_85)] hover:text-brand-orange transition-colors">
                      (703) 775-4383
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-brand-orange flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className={labelClass}>Email</p>
                    <a href="mailto:info@skylinecustomshop.com" className="text-[oklch(0.75_0.008_85)] hover:text-brand-orange transition-colors text-sm">
                      info@skylinecustomshop.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-brand-orange flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className={labelClass}>Address</p>
                    <a
                      href="https://maps.google.com/?q=4215+Walney+Rd+Suite+1A+%26+B+Chantilly+VA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[oklch(0.75_0.008_85)] hover:text-brand-orange transition-colors text-sm"
                    >
                      4215 Walney Rd. Suite 1A &amp; B<br />Chantilly, VA 20151
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-brand-orange flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className={labelClass}>Hours</p>
                    <div className="space-y-1">
                      <p className="text-[oklch(0.75_0.008_85)] text-sm">Mon–Fri: 9:00 AM – 6:00 PM</p>
                      <p className="text-[oklch(0.45_0.008_285)] text-sm">Weekends: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[oklch(0.20_0.006_285)] pt-6">
                <p className="font-mono-brand text-xs text-[oklch(0.45_0.008_285)] uppercase tracking-widest mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/skylinecustomshop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[oklch(0.66_0.01_285)] hover:text-brand-orange transition-colors text-sm"
                  >
                    <Instagram size={16} />
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@SkylineCustomsOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[oklch(0.66_0.01_285)] hover:text-brand-orange transition-colors text-sm"
                  >
                    <Youtube size={16} />
                    YouTube
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="/get-a-quote"
                  className="flex items-center justify-center gap-2 bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-sm tracking-widest py-4 hover:bg-[oklch(0.72_0.21_40)] transition-colors group w-full"
                >
                  BOOK ONLINE NOW
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* ── Right: Send a Message Form ── */}
            <div className="lg:col-span-2 bg-[oklch(0.12_0.005_285)] p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-brand-orange flex items-center justify-center mb-6">
                    <span className="font-display text-3xl text-[oklch(0.10_0.005_285)]">✓</span>
                  </div>
                  <h3 className="font-display text-4xl text-[oklch(0.96_0.008_85)] mb-4">MESSAGE SENT</h3>
                  <p className="text-[oklch(0.66_0.01_285)] max-w-sm">
                    Thank you for reaching out. We'll get back to you within 24 hours. For faster service, give us a call at (703) 775-4383.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl text-[oklch(0.96_0.008_85)] tracking-wider mb-8">
                    SEND A MESSAGE
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Row 1: First Name + Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input
                          type="text"
                          required
                          value={form.firstName}
                          onChange={set("firstName")}
                          className={inputClass}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input
                          type="text"
                          required
                          value={form.lastName}
                          onChange={set("lastName")}
                          className={inputClass}
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone *</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={set("phone")}
                          className={inputClass}
                          placeholder="(703) 000-0000"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={set("email")}
                          className={inputClass}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Row 3: Make + Model + Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Make *</label>
                        <input
                          type="text"
                          required
                          value={form.make}
                          onChange={set("make")}
                          className={inputClass}
                          placeholder="Tesla"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Model *</label>
                        <input
                          type="text"
                          required
                          value={form.model}
                          onChange={set("model")}
                          className={inputClass}
                          placeholder="Model Y"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Year *</label>
                        <input
                          type="number"
                          required
                          min={1990}
                          max={2030}
                          value={form.year}
                          onChange={set("year")}
                          className={inputClass}
                          placeholder="2024"
                        />
                      </div>
                    </div>

                    {/* Service Radio Buttons */}
                    <div>
                      <label className={labelClass}>Service *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICE_OPTIONS.map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                              form.service === opt.value
                                ? "border-brand-orange bg-[oklch(0.16_0.006_285)]"
                                : "border-[oklch(0.25_0.006_285)] bg-[oklch(0.14_0.005_285)] hover:border-[oklch(0.35_0.008_285)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={opt.value}
                              checked={form.service === opt.value}
                              onChange={set("service")}
                              className="accent-brand-orange w-4 h-4 shrink-0"
                            />
                            <span className="text-[oklch(0.80_0.008_85)] text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea
                        value={form.message}
                        onChange={set("message")}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your vehicle and what you're looking for..."
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-red-400 text-sm">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full bg-brand-orange text-[oklch(0.10_0.005_285)] font-display text-base tracking-widest py-4 hover:bg-[oklch(0.72_0.21_40)] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitContact.isPending ? "SENDING..." : "SEND MESSAGE"}
                      {!submitContact.isPending && (
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Directions + FAQ */}
      <section className="pb-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-px bg-[oklch(0.20_0.006_285)]">
          <div className="bg-[oklch(0.12_0.005_285)] p-8 md:p-12">
            <h2 className="font-display text-3xl text-[oklch(0.96_0.008_85)] tracking-wider mb-6">HOW TO FIND US</h2>
            <p className="text-[oklch(0.65_0.008_85)] leading-relaxed mb-6">
              Skyline Custom Shop is at 4215 Walney Rd, Suite 1A and B, in Chantilly, VA 20151, just south of Route 28 between Westfields Blvd and Route 50, about five minutes from Dulles Airport. Look for the orange Skyline sign; the bay doors face the parking lot and there is free parking out front.
            </p>
            <ul className="space-y-3 text-[oklch(0.65_0.008_85)] text-sm leading-relaxed">
              <li><span className="text-brand-orange font-semibold">From I-66:</span> exit at Route 28 north toward Dulles, continue about three miles, then turn onto Walney Rd. We are on the right.</li>
              <li><span className="text-brand-orange font-semibold">From the Dulles Toll Road or Herndon:</span> take Route 28 south past the airport and Westfields Blvd, then turn onto Walney Rd.</li>
              <li><span className="text-brand-orange font-semibold">From Route 50 and Fairfax:</span> head west on Route 50, turn right on Walney Rd, and follow it north past the Ellanor C. Lawrence Park entrance.</li>
              <li><span className="text-brand-orange font-semibold">From Loudoun and Ashburn:</span> Route 28 south or the Greenway to Route 28, then Walney Rd. About twenty minutes from Broadlands.</li>
            </ul>
            <p className="text-[oklch(0.45_0.008_285)] text-sm mt-6">
              Serving Chantilly, Centreville, Herndon, Reston, Fairfax, Ashburn, Sterling, Manassas, and all of Northern Virginia. See our <Link href="/service-areas" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">service areas</Link> for directions from your city.
            </p>
          </div>
          <div className="bg-[oklch(0.12_0.005_285)] p-8 md:p-12">
            <h2 className="font-display text-3xl text-[oklch(0.96_0.008_85)] tracking-wider mb-6">BEFORE YOU VISIT</h2>
            <div className="divide-y divide-[oklch(0.20_0.006_285)]">
              {CONTACT_FAQS.map((f) => (
                <div key={f.q} className="py-4">
                  <h3 className="text-[oklch(0.96_0.008_85)] font-semibold mb-2">{f.q}</h3>
                  <p className="text-[oklch(0.65_0.008_85)] text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="container">
          <div className="relative overflow-hidden" style={{ height: "420px" }}>
            <iframe
              title="Skyline Customs Location — 4215 Walney Rd Suite 1A & B, Chantilly VA"
              src="https://maps.google.com/maps?q=Skyline+Customs%2C+4215+Walney+Rd+Suite+1A+%26+B%2C+Chantilly%2C+VA+20151&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(15%) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-0 left-0 bg-[oklch(0.08_0.005_285/0.90)] backdrop-blur-sm px-6 py-4 border-t border-r border-brand-orange/40">
              <p className="font-mono-brand text-xs text-brand-orange uppercase tracking-widest mb-1">Our Location</p>
              <p className="font-display text-base text-[oklch(0.96_0.008_85)] tracking-wider">
                4215 Walney Rd. Suite 1A &amp; B — Chantilly, VA 20151
              </p>
              <a
                href="https://maps.google.com/?q=Skyline+Customs+4215+Walney+Rd+Suite+1A+%26+B+Chantilly+VA+20151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-brand-orange font-mono-brand text-xs uppercase tracking-widest underline underline-offset-2 decoration-1 hover:decoration-2"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
