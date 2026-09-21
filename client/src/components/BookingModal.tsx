import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, ArrowLeft, Shield, Droplets, Sun } from "lucide-react";

/*
 * SKYLINE CUSTOMS — BookingModal
 * Philosophy: Industrial Brutalism meets Automotive Precision
 * Two-step flow:
 *   Step 1 — Service selector: customer picks their service
 *   Step 2 — GHL calendar: the matching calendar loads in an iframe
 */

export type BookingService = "ppf" | "ceramic" | "tint" | "general";

interface ServiceOption {
  key: BookingService;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  calendarUrl: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    key: "ppf",
    number: "01",
    title: "Paint Protection Film",
    subtitle: "Self-Healing PPF",
    description: "Invisible film that absorbs rock chips and road debris. Self-heals minor scratches.",
    icon: <Shield size={22} />,
    calendarUrl: "https://api.leadconnectorhq.com/widget/booking/u1sGaixcCehuGKXeQocH",
  },
  {
    key: "ceramic",
    number: "02",
    title: "Ceramic Coating",
    subtitle: "Permanent Paint Defense",
    description: "Permanent hydrophobic molecular bond. Deep gloss, scratch resistance, UV protection.",
    icon: <Droplets size={22} />,
    calendarUrl: "https://api.leadconnectorhq.com/widget/booking/7RyCN9siJiafICVIuqBH",
  },
  {
    key: "tint",
    number: "03",
    title: "Window Tinting",
    subtitle: "Pro Nano Ceramic Film",
    description: "Blocks 99% UV, reduces heat by 60%. No signal interference. Lifetime warranty.",
    icon: <Sun size={22} />,
    calendarUrl: "https://api.leadconnectorhq.com/widget/booking/ljUVbagdBufV6aInp4Lc",
  },
];

interface BookingModalProps {
  isOpen: boolean;
  service: BookingService;
  onClose: () => void;
}

export default function BookingModal({ isOpen, service, onClose }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  // If opened from a specific service button, skip selector and go straight to calendar
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);

  // When modal opens, pre-select if a specific service was passed
  useEffect(() => {
    if (!isOpen) return;
    if (service !== "general") {
      const found = SERVICE_OPTIONS.find((s) => s.key === service) ?? null;
      setSelectedService(found);
    } else {
      setSelectedService(null); // show selector
    }
  }, [isOpen, service]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedService && service === "general") {
          setSelectedService(null); // go back to selector
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, selectedService, service, onClose]);

  // The GoHighLevel embed helper (iframe sizing) is only needed once the calendar is shown.
  useEffect(() => {
    if (!isOpen || document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-[oklch(0.11_0.005_285)] border border-[oklch(0.22_0.006_285)] shadow-2xl overflow-hidden">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.22_0.006_285)] shrink-0">
          <div className="flex items-center gap-3">
            {selectedService && service === "general" && (
              <button
                onClick={() => setSelectedService(null)}
                className="text-[oklch(0.66_0.008_285)] hover:text-brand-orange transition-colors mr-1"
                aria-label="Back to service selection"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="w-1 h-8 bg-brand-orange shrink-0" />
            <div>
              <p className="font-mono-brand text-[10px] text-brand-orange tracking-[0.2em] uppercase mb-0.5">
                {selectedService ? "Schedule Your Service" : "Select a Service"}
              </p>
              <h2 className="font-display text-2xl text-[oklch(0.96_0.008_85)] tracking-wider leading-none">
                {selectedService ? selectedService.title.toUpperCase() : "BOOK AN APPOINTMENT"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[oklch(0.45_0.008_285)] hover:text-[oklch(0.96_0.008_85)] transition-colors p-1"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* ── STEP 1: SERVICE SELECTOR ── */}
        {!selectedService && (
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-[oklch(0.66_0.01_285)] text-sm mb-6 font-mono-brand tracking-wide">
              Choose the service you'd like to schedule — you'll be taken directly to the right calendar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedService(opt)}
                  className="group text-left border border-[oklch(0.22_0.006_285)] hover:border-brand-orange bg-[oklch(0.13_0.005_285)] hover:bg-[oklch(0.15_0.005_285)] transition-all duration-200 p-5 flex flex-col gap-3"
                >
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-brand text-[10px] text-[oklch(0.40_0.008_285)] tracking-widest">
                      {opt.number}
                    </span>
                    <span className="text-[oklch(0.40_0.008_285)] group-hover:text-brand-orange transition-colors">
                      {opt.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <p className="font-mono-brand text-[10px] text-brand-orange uppercase tracking-widest mb-1">
                      {opt.subtitle}
                    </p>
                    <h3 className="font-display text-xl text-[oklch(0.96_0.008_85)] tracking-wider leading-none group-hover:text-brand-orange transition-colors">
                      {opt.title.toUpperCase()}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[oklch(0.66_0.01_285)] text-xs leading-relaxed">
                    {opt.description}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center gap-2 text-brand-orange font-display text-xs tracking-wider mt-auto pt-1">
                    SCHEDULE NOW
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: CALENDAR IFRAME ── */}
        {selectedService && (
          <div className="flex-1 overflow-hidden min-h-[520px]">
            <iframe
              key={selectedService.key}
              src={selectedService.calendarUrl}
              title={`Book ${selectedService.title}`}
              className="w-full h-full min-h-[520px] border-0"
              style={{ background: "transparent" }}
              allow="payment"
            />
          </div>
        )}
      </div>
    </div>
  );
}
