import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Phone, MapPin, Clock, Star, Shield } from "lucide-react"
import QuoteForm from "./QuoteForm"

export const metadata: Metadata = {
  title: "Get a Free Quote | Ceramic Coating, PPF & Tint | Skyline Customs Chantilly, VA",
  description:
    "Request a free quote for ceramic coating, paint protection film, window tinting, or a custom wrap in Chantilly, VA. Fast response, same-day service available. Call (703) 378-9222.",
  keywords:
    "free quote ceramic coating Chantilly, PPF quote Northern Virginia, window tint quote Chantilly VA, vehicle wrap estimate Fairfax County",
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold">Skyline Customs</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/#services" className="hover:text-blue-400 transition">Services</Link>
            <Link href="/ceramic-coating" className="hover:text-blue-400 transition">Ceramic Coating</Link>
            <Link href="/#contact" className="hover:text-blue-400 transition">Contact</Link>
          </nav>
          <a href="tel:+1-703-775-4383" className="hidden md:flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Phone size={16} />
            <span>(703) 378-9222</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-yellow-400 font-semibold">75+ Google Reviews</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get Your Free
              </span>
              <br />
              <span className="text-white">Quote</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tell us about your vehicle and the service you want. We&apos;ll reply with
              pricing and availability, usually the same business day.
            </p>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 md:p-8 border border-gray-700">
              <Suspense fallback={null}>
                <QuoteForm />
              </Suspense>
            </div>

            <aside className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Prefer to talk?</h2>
                <a href="tel:+1-703-775-4383" className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition">
                  <Phone size={18} />
                  <span>(703) 378-9222</span>
                </a>
                <div className="mt-6 space-y-3 text-gray-300 text-sm">
                  <div className="flex items-start space-x-3">
                    <Clock size={18} className="text-green-400 mt-0.5 shrink-0" />
                    <span>Mon–Fri, 8:00 AM – 6:00 PM. Same-day service available.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin size={18} className="text-purple-400 mt-0.5 shrink-0" />
                    <span>Chantilly, VA. Serving Fairfax County and Northern Virginia.</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4">What happens next</h2>
                <ol className="space-y-3 text-gray-300 text-sm list-none">
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <span>We review your vehicle and service details.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <span>You get a written quote with package options.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <span>Pick a date that works and we&apos;ll get you scheduled.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield size={22} className="text-blue-400" />
                  <span className="font-semibold">No-pressure quotes</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Every quote is free and comes with no obligation. Lifetime warranty on ceramic coating and tint.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p>&copy; 2026 Skyline Customs. All rights reserved. | Chantilly&apos;s Premier Automotive Protection Specialists</p>
        </div>
      </footer>
    </div>
  )
}
