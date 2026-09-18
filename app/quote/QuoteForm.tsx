"use client"

import { useState, type FormEvent } from "react"
import { useSearchParams } from "next/navigation"
import { Send, CheckCircle } from "lucide-react"

const SERVICES = [
  { value: "ceramic-coating", label: "Ceramic Coating" },
  { value: "ppf", label: "Paint Protection Film (PPF)" },
  { value: "window-tint", label: "Ceramic Window Tint" },
  { value: "wraps", label: "Custom Vinyl Wrap" },
  { value: "paint-correction", label: "Paint Correction" },
  { value: "not-sure", label: "Not sure yet, help me choose" },
] as const

const PACKAGES = ["Essential", "Premium", "Elite"] as const

const QUOTE_EMAIL = "info@skylinecustomshop.com"

type ServiceValue = (typeof SERVICES)[number]["value"]

function isService(value: string | null): value is ServiceValue {
  return SERVICES.some((s) => s.value === value)
}

function isPackage(value: string | null): value is (typeof PACKAGES)[number] {
  return PACKAGES.some((p) => p === value)
}

const inputClass =
  "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"

const labelClass = "block text-sm font-medium text-gray-300 mb-2"

export default function QuoteForm() {
  const params = useSearchParams()
  const initialService = params.get("service")
  const initialPackage = params.get("package")

  const [service, setService] = useState<ServiceValue | "">(
    isService(initialService) ? initialService : ""
  )
  const [pkg, setPkg] = useState<string>(isPackage(initialPackage) ? initialPackage : "")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const get = (key: string) => String(data.get(key) ?? "").trim()
    const serviceLabel = SERVICES.find((s) => s.value === get("service"))?.label ?? get("service")

    const lines = [
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Email: ${get("email")}`,
      `Vehicle: ${get("vehicle")}`,
      `Service: ${serviceLabel}${get("package") ? ` (${get("package")} package)` : ""}`,
      `Preferred date: ${get("date") || "Flexible"}`,
      "",
      "Notes:",
      get("notes") || "(none)",
    ]

    const subject = `Quote request: ${serviceLabel}${get("vehicle") ? ` for ${get("vehicle")}` : ""}`
    const href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`

    window.location.href = href
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} className="mx-auto text-green-400 mb-6" />
        <h2 className="text-2xl font-bold mb-3">Almost done</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-6">
          Your email app should have opened with your quote request filled in. Hit send and
          we&apos;ll get back to you shortly.
        </p>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
          If nothing opened, email us directly at{" "}
          <a href={`mailto:${QUOTE_EMAIL}`} className="text-blue-400 hover:underline">
            {QUOTE_EMAIL}
          </a>{" "}
          or call{" "}
          <a href="tel:+1-703-775-4383" className="text-blue-400 hover:underline">
            (703) 378-9222
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition"
        >
          Back to form
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Request a quote</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>Full name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(703) 555-0123" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
      </div>

      <div>
        <label htmlFor="vehicle" className={labelClass}>Vehicle (year, make, model) *</label>
        <input id="vehicle" name="vehicle" type="text" required placeholder="2024 Tesla Model 3" className={inputClass} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className={labelClass}>Service *</label>
          <select
            id="service"
            name="service"
            required
            value={service}
            onChange={(e) => {
              setService(e.target.value as ServiceValue | "")
              if (e.target.value !== "ceramic-coating") setPkg("")
            }}
            className={inputClass}
          >
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>Preferred date</label>
          <input id="date" name="date" type="date" className={inputClass} />
        </div>
      </div>

      {service === "ceramic-coating" && (
        <div>
          <span className={labelClass}>Ceramic coating package</span>
          <div className="grid grid-cols-3 gap-3">
            {PACKAGES.map((p) => (
              <label
                key={p}
                className={`cursor-pointer text-center rounded-lg border px-3 py-3 font-semibold transition ${
                  pkg === p
                    ? "border-blue-500 bg-blue-600/20 text-white"
                    : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="package"
                  value={p}
                  checked={pkg === p}
                  onChange={() => setPkg(p)}
                  className="sr-only"
                />
                {p}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="notes" className={labelClass}>Anything else we should know?</label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Paint condition, coverage areas, tint darkness, colors you're considering..."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
      >
        <Send size={20} />
        <span>Send Quote Request</span>
      </button>

      <p className="text-xs text-gray-500 text-center">
        Submitting opens your email app with this request addressed to {QUOTE_EMAIL}. We never share your information.
      </p>
    </form>
  )
}
