import { createContext, useContext, useState, ReactNode } from "react";
import type { BookingService } from "@/components/BookingModal";

interface BookingContextValue {
  isOpen: boolean;
  service: BookingService;
  openBooking: (service?: BookingService) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<BookingService>("general");

  const openBooking = (svc: BookingService = "general") => {
    setService(svc);
    setIsOpen(true);
    // Facebook Pixel: InitiateCheckout fires on every booking modal open
    if (typeof window !== "undefined" && (window as any).fbq) {
      const serviceLabels: Record<BookingService, string> = {
        ppf: "Paint Protection Film",
        ceramic: "Ceramic Coating",
        tint: "Window Tinting",
        general: "Auto Protection Service",
      };
      (window as any).fbq("track", "InitiateCheckout", {
        content_name: serviceLabels[svc],
        content_category: "Auto Protection",
        content_ids: [svc],
        content_type: "service",
      });
    }
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ isOpen, service, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
