import Image from "next/image"
import Link from "next/link"
import { Star, Shield, Clock, Award, Phone, MapPin, Calendar } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold">Skyline Customs</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#services" className="hover:text-blue-400 transition">Services</Link>
            <Link href="#process" className="hover:text-blue-400 transition">Process</Link>
            <Link href="#reviews" className="hover:text-blue-400 transition">Reviews</Link>
            <Link href="#contact" className="hover:text-blue-400 transition">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="tel:+1-703-775-4383" className="hidden md:flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Phone size={16} />
              <span>(703) 378-9222</span>
            </a>
            <button className="md:hidden">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-yellow-400 font-semibold">75+ Google Reviews</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-400">Chantilly's #1 Rated</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Premier Automotive
              </span>
              <br />
              <span className="text-white">Protection</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Protect your investment with Northern Virginia's most trusted ceramic coating, 
              paint protection film, and precision window tinting specialists.
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

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <Shield className="mx-auto text-blue-400" size={32} />
                <div className="text-2xl font-bold text-blue-400">5+</div>
                <div className="text-sm text-gray-400">Years Warranty</div>
              </div>
              <div className="space-y-2">
                <Clock className="mx-auto text-green-400" size={32} />
                <div className="text-2xl font-bold text-green-400">Same Day</div>
                <div className="text-sm text-gray-400">Service Available</div>
              </div>
              <div className="space-y-2">
                <Award className="mx-auto text-yellow-400" size={32} />
                <div className="text-2xl font-bold text-yellow-400">Certified</div>
                <div className="text-sm text-gray-400">Expert Installers</div>
              </div>
              <div className="space-y-2">
                <MapPin className="mx-auto text-purple-400" size={32} />
                <div className="text-2xl font-bold text-purple-400">Chantilly</div>
                <div className="text-sm text-gray-400">Local Experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Premium Protection
              </span>
              <br />
              <span className="text-white">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ceramic coatings to paint protection film, we offer comprehensive 
              solutions to keep your vehicle looking showroom fresh.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Ceramic Coating */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Ceramic Coating</h3>
              <p className="text-gray-300 mb-6">
                5+ year protection with molecular-level bonding. Hydrophobic, 
                UV-resistant, and scratch-resistant coating for ultimate paint protection.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">5+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">UV Protection:</span>
                  <span className="text-white">99%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white">Lifetime</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Paint Protection Film */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Paint Protection Film</h3>
              <p className="text-gray-300 mb-6">
                Self-healing PPF creates an invisible barrier against rock chips, 
                scratches, and road debris while maintaining factory finish.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Self-Healing:</span>
                  <span className="text-white">Heat Activated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Clarity:</span>
                  <span className="text-white">Crystal Clear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thickness:</span>
                  <span className="text-white">8.5 mil</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Window Tinting */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Ceramic Window Tint</h3>
              <p className="text-gray-300 mb-6">
                Premium ceramic film blocks 99% UV rays, reduces heat by 60%, 
                and provides superior comfort with lifetime warranty.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Heat Rejection:</span>
                  <span className="text-white">60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">UV Protection:</span>
                  <span className="text-white">99%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white">Lifetime</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Vehicle Wraps */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Custom Wraps</h3>
              <p className="text-gray-300 mb-6">
                Transform your vehicle with premium vinyl wraps. Unlimited colors, 
                full paint protection, and completely reversible.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Durability:</span>
                  <span className="text-white">7+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reversible:</span>
                  <span className="text-white">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Colors:</span>
                  <span className="text-white">Unlimited</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Protect Your Investment?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 75+ satisfied customers who trust Skyline Customs with their vehicles. 
            Get your free quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
              <Calendar size={20} />
              <span>Schedule Consultation</span>
            </button>
            <a href="tel:+1-703-775-4383" className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center space-x-2">
              <Phone size={20} />
              <span>(703) 378-9222</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">S</span>
                </div>
                <span className="text-xl font-bold">Skyline Customs</span>
              </div>
              <p className="text-gray-400 mb-4">
                Premier automotive protection specialists serving Northern Virginia.
              </p>
              <div className="flex space-x-4">
                <Star className="text-yellow-400 fill-current" size={20} />
                <span className="text-yellow-400">75+ Reviews</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ceramic-coating" className="hover:text-white transition">Ceramic Coating</Link></li>
                <li><Link href="/ppf" className="hover:text-white transition">Paint Protection Film</Link></li>
                <li><Link href="/window-tint" className="hover:text-white transition">Window Tinting</Link></li>
                <li><Link href="/wraps" className="hover:text-white transition">Vehicle Wraps</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Areas Served</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Chantilly, VA</li>
                <li>Fairfax County</li>
                <li>Northern Virginia</li>
                <li>Washington DC Metro</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>(703) 378-9222</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Chantilly, VA</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-400">●</span> Same-day service available
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Skyline Customs. All rights reserved. | Chantilly's Premier Automotive Protection Specialists</p>
          </div>
        </div>
      </footer>
    </div>
  )
}