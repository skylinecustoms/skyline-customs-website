import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skyline Customs | Premier Automotive Protection | Chantilly, VA",
  description: "Northern Virginia's most trusted ceramic coating, paint protection film (PPF), and precision window tinting specialists. 75+ 5-star reviews. Same-day service available in Chantilly, Fairfax County.",
  keywords: [
    "ceramic coating Chantilly VA",
    "paint protection film Chantilly",
    "PPF Chantilly Virginia",
    "window tinting Chantilly",
    "automotive protection Fairfax County",
    "car detailing Northern Virginia",
    "vehicle wraps Chantilly",
    "ceramic coating Fairfax",
    "paint correction Chantilly VA",
    "automotive protection specialists"
  ].join(", "),
  authors: [{ name: "Skyline Customs" }],
  creator: "Skyline Customs",
  publisher: "Skyline Customs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skylinecustomshop.com",
    title: "Skyline Customs | Premier Automotive Protection | Chantilly, VA",
    description: "Northern Virginia's most trusted ceramic coating, paint protection film (PPF), and precision window tinting specialists. 75+ 5-star reviews.",
    siteName: "Skyline Customs",
    images: [
      {
        url: "https://skylinecustomshop.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skyline Customs - Premier Automotive Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyline Customs | Premier Automotive Protection | Chantilly, VA",
    description: "Northern Virginia's most trusted ceramic coating, paint protection film (PPF), and precision window tinting specialists. 75+ 5-star reviews.",
    images: ["https://skylinecustomshop.com/og-image.jpg"],
  },
  verification: {
    google: "your-google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://skylinecustomshop.com",
              "name": "Skyline Customs",
              "alternateName": "Skyline Customs Chantilly",
              "description": "Premier automotive protection specialists offering ceramic coating, paint protection film (PPF), window tinting, and vehicle wraps in Chantilly, VA.",
              "url": "https://skylinecustomshop.com",
              "telephone": "+1-703-378-9222",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Chantilly",
                "addressLocality": "Chantilly",
                "addressRegion": "VA",
                "postalCode": "20151",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.8938",
                "longitude": "-77.4311"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Chantilly"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Fairfax County"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Northern Virginia"
                }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "38.8938",
                  "longitude": "-77.4311"
                },
                "geoRadius": "25000"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "75",
                "bestRating": "5",
                "worstRating": "1"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Automotive Protection Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Ceramic Coating",
                      "description": "5+ year protection with molecular-level bonding. Hydrophobic, UV-resistant coating."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Paint Protection Film (PPF)",
                      "description": "Self-healing film creating invisible barrier against rock chips and scratches."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Window Tinting",
                      "description": "Premium ceramic window tinting with 99% UV protection and lifetime warranty."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Vehicle Wraps",
                      "description": "Custom vinyl wraps with unlimited colors and complete paint protection."
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.google.com/maps/place/Skyline+Customs"
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
              "currenciesAccepted": "USD"
            })
          }}
        />

        {/* Automotive Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutomotiveBusiness",
              "@id": "https://skylinecustomshop.com/services",
              "name": "Skyline Customs Automotive Services",
              "parentOrganization": {
                "@type": "LocalBusiness",
                "name": "Skyline Customs"
              },
              "serviceType": [
                "Ceramic Coating",
                "Paint Protection Film",
                "Window Tinting",
                "Vehicle Wraps",
                "Paint Correction"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}