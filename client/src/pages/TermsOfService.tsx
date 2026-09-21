import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.005_285)]">
      <SEO
        title="Terms of Service"
        description="Skyline Custom Shop terms of service, work authorization, warranty summary, and aftercare guidelines for PPF, ceramic coating, and window tinting."
        canonical="https://www.skylinecustomshop.com/terms-of-service"
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
            TERMS OF<br />
            <span className="text-brand-orange">SERVICE</span>
          </h1>
          <p className="text-[oklch(0.45_0.008_285)] text-sm">Last updated: May 2026</p>
        </div>
      </section>

      <div className="h-[2px] bg-brand-orange" />

      {/* Content */}
      <section className="py-16 bg-[oklch(0.10_0.005_285)]">
        <div className="container max-w-3xl">
          <div className="space-y-10 text-[oklch(0.65_0.008_85)] leading-relaxed text-sm">

            {/* Work Authorization intro */}
            <div className="border border-[oklch(0.20_0.006_285)] bg-[oklch(0.12_0.005_285)] p-6">
              <p className="text-[oklch(0.85_0.008_85)]">
                <strong>WORK AUTHORIZATION, TERMS OF SERVICE &amp; WARRANTY</strong>
              </p>
              <p className="mt-2">
                By booking services and submitting payment, the Client authorizes Skyline Customs to perform the selected automotive services and agrees to the terms below.
              </p>
            </div>

            {/* Cure Time & Aftercare */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">CURE TIME &amp; AFTERCARE</h2>
              <p className="mb-4">
                All protective film and coating services require curing time after installation. Temporary visual irregularities — including small bubbles, haze, moisture pockets, or slight streaks — are normal during the curing period and will dissipate on their own. Do not press, pick at, or attempt to fix these areas during curing.
              </p>

              <div className="space-y-4">
                <div className="border-l-2 border-brand-orange pl-4">
                  <p className="text-[oklch(0.85_0.008_85)] font-semibold mb-1">Ceramic Window Tint</p>
                  <p>Initial cure 7–14 days. Do not roll windows down for 48–72 hours after installation. Temporary haze or moisture between film layers is normal and will clear during the curing period.</p>
                </div>

                <div className="border-l-2 border-brand-orange pl-4">
                  <p className="text-[oklch(0.85_0.008_85)] font-semibold mb-1">Ceramic Coating</p>
                  <p>Initial cure 24–48 hours. Full cure 7–14 days, depending on weather and vehicle use. Avoid washing, rain exposure, and automatic car washes during the full curing period.</p>
                </div>

                <div className="border-l-2 border-brand-orange pl-4">
                  <p className="text-[oklch(0.85_0.008_85)] font-semibold mb-1">Paint Protection Film (PPF)</p>
                  <p>Initial cure 24–48 hours. Full cure 1–2 weeks, depending on temperature and humidity. Do not wash the vehicle, apply wax, sealant, or any products to the film for a minimum of 7 days. Small bubbles or moisture beneath the film are part of the normal curing process and will dissipate within 2–3 weeks. Do not press or pick at bubbles — this may compromise the installation and adhesive bond. Avoid pressure washing near film edges. If possible, limit driving during the first week to allow optimal adhesion.</p>
                </div>
              </div>
            </div>

            {/* Aftercare Guidelines */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">AFTERCARE GUIDELINES</h2>
              <p className="mb-4">Proper maintenance is critical to the longevity of all services:</p>
              <ul className="space-y-2 list-none">
                {[
                  "Hand washes only using pH-neutral automotive shampoo and microfiber wash mitts. Use the two-bucket method to prevent contamination.",
                  "Do not use automatic car washes with brushes or harsh chemicals on any protected surface.",
                  "Touchless automatic washes are generally acceptable after full curing, but hand washing is always preferred.",
                  "Do not use traditional car wax on PPF or ceramic-coated surfaces. Use only PPF-safe or ceramic-safe detail sprays.",
                  "Remove bird droppings, tree sap, bug splatter, and water spots as soon as possible to prevent staining or damage.",
                  "PPF features self-healing properties for minor scratches — park in direct sunlight for 25–30 minutes or apply warm water (not exceeding 120°F) to activate.",
                  "When pressure washing, maintain a minimum distance of 24 inches, use a wide-angle spray, and never direct water under film edges.",
                  "Avoid washing the vehicle in direct sunlight or when surfaces are warm to the touch.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-brand-orange mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty Summary */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">WARRANTY SUMMARY</h2>
              <div className="border border-[oklch(0.20_0.006_285)] divide-y divide-[oklch(0.20_0.006_285)]">
                {[
                  { service: "Ceramic Window Tint (TintX Ceramic Series)", warranty: "Lifetime warranty for as long as the Client owns the vehicle (manufacturer defects — bubbling, peeling, fading only)" },
                  { service: "Ceramic Window Tint (GeoShield Pro Nano Ceramic)", warranty: "Lifetime warranty for as long as the Client owns the vehicle (manufacturer defects — bubbling, peeling, fading only)" },
                  { service: "Ceramic Coating — No Correction Package", warranty: "7-Year warranty" },
                  { service: "Ceramic Coating — Crystal Package (Gtechniq Crystal Serum)", warranty: "5-Year warranty" },
                  { service: "Ceramic Coating — Ultimate Package", warranty: "7-Year warranty" },
                  { service: "Paint Protection Film (Stek DYNOshield)", warranty: "12-Year manufacturer warranty against yellowing, cracking, peeling, and delamination" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 bg-[oklch(0.12_0.005_285)]">
                    <span className="text-[oklch(0.85_0.008_85)] font-semibold sm:w-1/2 flex-shrink-0">{row.service}</span>
                    <span className="sm:w-1/2">{row.warranty}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                Exact warranty details and the specific package selected are listed on the Client's invoice or receipt. Warranty coverage applies to manufacturer defects and workmanship only — not damage caused by accidents, improper washing (including automatic car washes with brushes), chemical exposure, neglect, or failure to follow aftercare guidelines. Failure to follow the aftercare procedures outlined above may void warranty coverage.
              </p>
            </div>

            {/* Estimated Service Times */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">ESTIMATED SERVICE TIMES</h2>
              <p className="mb-4">
                Service time estimates provided during the quoting process are approximate and may vary based on vehicle condition, size, and scope of work. Estimates are not guaranteed completion times. Skyline Customs will communicate any significant changes to the expected timeline.
              </p>
              <ul className="space-y-2 list-none">
                {[
                  "Window tinting: typically same-day (1–3 hours depending on package)",
                  "Ceramic coating: 1–3 days, depending on correction level",
                  "PPF: 1–5 days, depending on coverage area",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-brand-orange mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing & Estimates */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">PRICING &amp; ESTIMATES</h2>
              <p>
                All quotes provided through the Skyline Customs configurator, website, or verbal/written communication are preliminary estimates based on standard pricing for the selected vehicle type and services. Final pricing is confirmed after an in-person inspection (approximately 10–15 minutes). Pricing may be adjusted for vehicle condition, complexity, or factors not visible in the initial estimate. Bundle discounts are applied at the time of service and cannot be combined with other promotions unless explicitly stated.
              </p>
            </div>

            {/* Industry Standards */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">INDUSTRY STANDARDS</h2>
              <p>
                All services are hand-applied and performed to professional, industry-accepted standards. Absolute perfection, factory-new results, or showroom-level conditions are not guaranteed. Minor cosmetic characteristics (including small dust particles, light edges, or slight variations) are normal, acceptable, and do not affect performance or durability.
              </p>
            </div>

            {/* Acceptance & Expectations */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">ACCEPTANCE &amp; EXPECTATIONS</h2>
              <p>
                Services are evaluated based on industry standards, not personal preference, magnified inspection, or subjective expectations. Dissatisfaction based on personal taste does not constitute defective workmanship.
              </p>
            </div>

            {/* Show Vehicles & Prior Condition */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">SHOW VEHICLES &amp; PRIOR CONDITION</h2>
              <p>
                Exact cosmetic matching to prior paint, bodywork, factory finishes, or previous modifications is not guaranteed. Comparisons to prior condition, awards, competition results, or show-level expectations are not valid measures of workmanship.
              </p>
            </div>

            {/* Redo & Refund Policy */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">REDO &amp; REFUND POLICY</h2>
              <ul className="space-y-2 list-none">
                {[
                  "Cosmetic concerns within industry standards are not eligible for redo or refund.",
                  "Redo determinations are made solely by Skyline Customs.",
                  "No refunds for completed services.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-brand-orange mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pre-Existing Conditions */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">PRE-EXISTING CONDITIONS</h2>
              <p>
                Skyline Customs is not responsible for pre-existing damage or conditions. Removal of old tint, PPF, or other materials may expose or worsen existing imperfections, including but not limited to scratches, defroster line damage, seal degradation, or paint defects.
              </p>
            </div>

            {/* Military & Law Enforcement Discount */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">MILITARY &amp; LAW ENFORCEMENT DISCOUNT</h2>
              <p>
                A 5% discount is available with a valid military ID or law enforcement credentials, presented at the time of service. This discount cannot be applied retroactively or combined with bundle pricing unless explicitly stated.
              </p>
            </div>

            {/* Appointments & Cancellations */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">APPOINTMENTS &amp; CANCELLATIONS</h2>
              <p className="mb-3">
                Appointments may be scheduled through our website, by phone, or in person. We ask that you provide at least 24 hours notice if you need to cancel or reschedule an appointment. Failure to provide adequate notice may result in a cancellation fee.
              </p>
              <p>
                We reserve the right to reschedule appointments due to unforeseen circumstances. We will make every effort to notify you as early as possible in such cases.
              </p>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">PAYMENT</h2>
              <p className="mb-3">
                Payment is due upon completion of services unless otherwise agreed in writing. We accept major credit cards, cash, and other payment methods as posted at our facility. All prices are in US dollars.
              </p>
              <p>
                For large projects, we may require a deposit at the time of booking. Deposits are non-refundable unless the Company cancels the appointment.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">LIMITATION OF LIABILITY</h2>
              <p>
                To the fullest extent permitted by law, Skyline Custom Shop shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services or Site. Our total liability to you for any claim shall not exceed the amount you paid for the specific service giving rise to the claim.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">INTELLECTUAL PROPERTY</h2>
              <p>
                All content on this Site, including text, graphics, logos, images, and software, is the property of Skyline Custom Shop or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </div>

            {/* Legal / Governing Law */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">LEGAL</h2>
              <p className="mb-3">
                By agreeing to these terms, the Client waives claims based solely on cosmetic dissatisfaction within industry standards. All disputes are governed by the laws of the Commonwealth of Virginia. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Fairfax County, Virginia.
              </p>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of our Site or services after any changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider mb-4">CONTACT US</h2>
              <p className="mb-4">If you have any questions about these Terms, please contact us:</p>
              <div className="border border-[oklch(0.20_0.006_285)] bg-[oklch(0.12_0.005_285)] p-6 space-y-2">
                <p className="text-[oklch(0.85_0.008_85)] font-semibold">Skyline Customs</p>
                <p>4215 Walney Rd. Suite 1A &amp; B, Chantilly, VA 20151</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+17037754383" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">
                    (703) 775-4383
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@skylinecustomshop.com" className="text-brand-orange underline underline-offset-2 decoration-1 hover:decoration-2">
                    info@skylinecustomshop.com
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
