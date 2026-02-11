import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Shield, Star, Clock, Award, Phone, MapPin, CheckCircle, Droplets, Sun, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Ceramic Coating Chantilly VA | 5 Year Protection | Skyline Customs",
  description: "Professional ceramic coating in Chantilly, VA. 5+ year protection, 99% UV resistance, hydrophobic finish. Lifetime warranty. Same-day service available. Call (703) 378-9222",
  keywords: "ceramic coating Chantilly VA, ceramic coating Fairfax County, paint protection Chantilly, ceramic coating Northern Virginia, automotive ceramic coating",
}

export default function CeramicCoating() {
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
            <Link href="/ppf" className="hover:text-blue-400 transition">PPF</Link>
            <Link href="/window-tint" className="hover:text-blue-400 transition">Tinting</Link>
          </nav>
          <a href="tel:+1-703-775-4383" className="hidden md:flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Phone size={16} />
            <span>(703) 378-9222</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-yellow-400 font-semibold">75+ Google Reviews</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ceramic Coating
              </span>
              <br />
              <span className="text-white">Chantilly, VA</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              5+ year protection with molecular-level bonding. The ultimate defense 
              against UV rays, contaminants, and environmental damage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                Get Free Quote
              </button>
              <a href="tel:+1-703-775-4383" className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center space-x-2">
                <Phone size={20} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our <span className="text-blue-400">Ceramic Coating?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">5+ Year Protection</h3>
              <p className="text-gray-300">
                Molecular bonding creates a permanent protective layer that lasts 5+ years 
                with proper maintenance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Hydrophobic Surface</h3>
              <p className="text-gray-300">
                Water beads and rolls off effortlessly, making washing easier 
                and keeping your car cleaner longer.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">UV Protection</h3>
              <p className="text-gray-300">
                Blocks 99% of harmful UV rays, preventing paint oxidation, 
                fading, and chalking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Scratch Resistance</h3>
              <p className="text-gray-300">
                Hardness rating of 9H provides superior protection against 
                minor scratches and swirl marks.
              </p>
            </div>
          </div>

          {/* Process */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-center mb-12">Our Professional Process</h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Paint Correction</h4>
                <p className="text-gray-300 text-sm">
                  Multi-stage correction removes swirls, scratches, and oxidation 
                  for a perfect base.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Surface Preparation</h4>
                <p className="text-gray-300 text-sm">
                  Clay bar decontamination and iron removal ensure perfect 
                  coating adhesion.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Coating Application</h4>
                <p className="text-gray-300 text-sm">
                  Professional-grade ceramic coating applied in controlled 
                  environment conditions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Curing & Inspection</h4>
                <p className="text-gray-300 text-sm">
                  24-hour curing process followed by thorough quality inspection 
                  and final delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ceramic Coating <span className="text-blue-400">Packages</span>
            </h2>
            <p className="text-xl text-gray-300">
              Professional-grade protection tailored to your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Essential Package */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Essential</h3>
                <div className="text-4xl font-bold text-blue-400 mb-4">$899</div>
                <p className="text-gray-400">Sedan/Coupe Starting Price</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Single-stage paint correction</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>5-year ceramic coating</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Full decontamination</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Wheels & trim coating</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Lifetime warranty</span>
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">
                Get Quote
              </button>
            </div>

            {/* Premium Package */}
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold text-blue-400 mb-4">$1,499</div>
                <p className="text-gray-400">Sedan/Coupe Starting Price</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Multi-stage paint correction</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>9H ceramic coating system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Interior protection package</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Glass & wheels coating</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>10-year warranty</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Annual maintenance kit</span>
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg font-semibold transition">
                Get Quote
              </button>
            </div>

            {/* Elite Package */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Elite</h3>
                <div className="text-4xl font-bold text-blue-400 mb-4">$2,299</div>
                <p className="text-gray-400">Sedan/Coupe Starting Price</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Complete paint correction</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Multi-layer coating system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>PPF on high-impact areas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Complete interior protection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Lifetime warranty</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Quarterly maintenance</span>
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Protect Your Paint?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 75+ satisfied customers who trust Skyline Customs for ceramic coating 
            in Chantilly, VA. Same-day consultation available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Schedule Consultation
            </button>
            <a href="tel:+1-703-775-4383" className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>(703) 378-9222</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Ceramic Coating <span className="text-blue-400">FAQ</span>
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">How long does ceramic coating last?</h3>
              <p className="text-gray-300">
                Our professional-grade ceramic coatings last 5-10 years depending on the package chosen. 
                With proper maintenance, some coatings can last even longer while maintaining their protective properties.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Is ceramic coating worth it in Virginia?</h3>
              <p className="text-gray-300">
                Absolutely! Virginia's climate with hot summers, road salt in winter, and UV exposure makes 
                ceramic coating an excellent investment. It protects against all these elements while maintaining 
                your car's appearance and value.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">How much does ceramic coating cost in Chantilly, VA?</h3>
              <p className="text-gray-300">
                Our ceramic coating packages start at $899 for sedans/coupes. Pricing varies based on vehicle size, 
                paint condition, and package level. We provide transparent, upfront pricing with no hidden fees.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer same-day ceramic coating?</h3>
              <p className="text-gray-300">
                While the ceramic coating process typically takes 2-3 days for proper paint correction and curing, 
                we can often accommodate urgent requests. Contact us to discuss your timeline needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">S</span>
            </div>
            <span className="text-xl font-bold">Skyline Customs</span>
          </Link>
          <p className="text-gray-400 mb-4">
            Premier Ceramic Coating Specialists | Chantilly, VA | Fairfax County
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>75+ Google Reviews</span>
            <span>•</span>
            <span>Same-Day Service Available</span>
            <span>•</span>
            <span>(703) 378-9222</span>
          </div>
        </div>
      </footer>
    </div>
  )
}