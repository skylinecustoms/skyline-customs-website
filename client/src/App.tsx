import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Link, Route, Switch, Redirect, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookingProvider, useBooking } from "./contexts/BookingContext";
import { lazy, Suspense, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { X } from "lucide-react";
import { installEngagementTracking, pageViewSent, trackPageView } from "@/lib/analytics";
import { CITIES, CITY_ORDER, cityPath, cityServices } from "@/lib/localSeo";
import { MODEL_PAGES } from "@/lib/modelPages";
import { AUDIENCE_PAGES } from "@/lib/audiencePages";
import { ES_PAGES } from "@/lib/es";
import { COMPARISON_PAGES } from "@/lib/comparisons";
import { BODY_TYPE_PAGES } from "@/lib/bodyTypePages";

// ─── Announcement Banner (controlled via Telegram bot /announce command) ─────
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

/**
 * GA4 page_view for client-side navigation. Each page's <SEO> reports the view
 * as soon as it mounts with the right title; this is the fallback for pages
 * without one (404, lazy chunks that fail), sent after the route has settled.
 */
function PageViewTracker() {
  const [location] = useLocation();
  useEffect(() => {
    const t = setTimeout(() => { if (!pageViewSent()) trackPageView(); }, 1500);
    return () => clearTimeout(t);
  }, [location]);
  return null;
}
import Home from "./pages/Home";
const Toaster = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
const BookingModal = lazy(() => import("./components/BookingModal"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const GalleryJob = lazy(() => import("./pages/GalleryJob"));
const Videos = lazy(() => import("./pages/Videos"));
const Faq = lazy(() => import("./pages/Faq"));
const Reviews = lazy(() => import("./pages/Reviews"));
const TeslaPPF = lazy(() => import("./pages/TeslaPPF"));
const ModelPPF = lazy(() => import("./pages/ModelPPF"));
const BmwPPF = lazy(() => import("./pages/BmwPPF"));
const PorschePPF = lazy(() => import("./pages/PorschePPF"));
const CorvettePPF = lazy(() => import("./pages/CorvettePPF"));
const RivianPPF = lazy(() => import("./pages/RivianPPF"));
const BroncoPPF = lazy(() => import("./pages/BroncoPPF"));
const PpfVsCeramic = lazy(() => import("./pages/PpfVsCeramic"));
const PpfCost = lazy(() => import("./pages/PpfCost"));
const TintComparison = lazy(() => import("./pages/TintComparison"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ServicePPF = lazy(() => import("./pages/ServicePPF"));
const ServiceCeramic = lazy(() => import("./pages/ServiceCeramic"));
const ServiceTint = lazy(() => import("./pages/ServiceTint"));
const GetAQuote = lazy(() => import("./pages/GetAQuote"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const JuneSpecial = lazy(() => import("./pages/JuneSpecial"));
const PromoArchive = lazy(() => import("./pages/PromoArchive"));
// City × service landing pages: one route per city per service, generated from lib/localSeo.ts
const LocalServicePage = lazy(() => import("./components/LocalServicePage"));
const AudiencePage = lazy(() => import("./components/AudiencePage"));
const SpanishServicePage = lazy(() => import("./components/SpanishServicePage"));
const EsPromo = lazy(() => import("./pages/EsPromo"));
const FleetPPF = lazy(() => import("./pages/FleetPPF"));
const ComparisonPageLazy = lazy(() => import("./components/ComparisonPage"));
const VehiclePPFPageLazy = lazy(() => import("./components/VehiclePPFPage"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Current pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/gallery/:slug"} component={GalleryJob} />
      <Route path={"/videos"} component={Videos} />
      <Route path={"/faq"} component={Faq} />
      <Route path={"/reviews"} component={Reviews} />
      <Route path={"/tesla-ppf"} component={TeslaPPF} />
      {MODEL_PAGES.map((m) => (
        <Route key={m.slug} path={`/${m.slug}-ppf`}>{() => <ModelPPF slug={m.slug} />}</Route>
      ))}
      {/* PPF by body type (/truck-ppf, /ev-ppf, /suv-ppf) */}
      {BODY_TYPE_PAGES.map((b) => (
        <Route key={b.slug} path={`/${b.slug}-ppf`}>{() => <VehiclePPFPageLazy brand={b} />}</Route>
      ))}
      {/* Bases, federal workplaces, and dealer-delivery areas */}
      {AUDIENCE_PAGES.map((a) => (
        <Route key={a.path} path={a.path}>{() => <AudiencePage data={a} />}</Route>
      ))}
      {/* Comparison guides */}
      {COMPARISON_PAGES.map((c) => (
        <Route key={c.path} path={c.path}>{() => <ComparisonPageLazy data={c} />}</Route>
      ))}
      {/* Spanish pages */}
      {ES_PAGES.map((p) => (
        <Route key={p.path} path={p.path}>{() => <SpanishServicePage data={p} />}</Route>
      ))}
      <Route path={"/es/promo"} component={EsPromo} />
      <Route path={"/fleet-ppf"} component={FleetPPF} />
      <Route path={"/es"}><Redirect to="/es/ppf" /></Route>
      <Route path={"/bmw-ppf"} component={BmwPPF} />
      <Route path={"/porsche-ppf"} component={PorschePPF} />
      <Route path={"/corvette-ppf"} component={CorvettePPF} />
      <Route path={"/rivian-ppf"} component={RivianPPF} />
      <Route path={"/bronco-ppf"} component={BroncoPPF} />
      <Route path={"/ppf-cost"} component={PpfCost} />
      <Route path={"/ppf-vs-ceramic-coating"} component={PpfVsCeramic} />
      <Route path={"/ceramic-vs-carbon-vs-dyed-tint"} component={TintComparison} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />

      {/* Individual service pages */}
      <Route path={"/services/ppf"} component={ServicePPF} />
      <Route path={"/services/ceramic-coating"} component={ServiceCeramic} />
      <Route path={"/services/window-tinting"} component={ServiceTint} />
       <Route path={"/get-a-quote"} component={GetAQuote} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/404"} component={NotFound} />
      {/* 301 Redirects — preserving Google-indexed URLs from old site */}
      <Route path="/contact-us">
        <Redirect to="/contact" />
      </Route>

      <Route path="/booking-page">
        <Redirect to="/" />
      </Route>

      <Route path="/home">
        <Redirect to="/" />
      </Route>

      {/* City × service local SEO landing pages (VA, MD, DC), generated from lib/localSeo.ts */}
      {CITY_ORDER.flatMap((city) =>
        cityServices(CITIES[city]).map((svc) => (
          <Route key={cityPath(svc, city)} path={cityPath(svc, city)}>
            {() => <LocalServicePage city={city} service={svc} />}
          </Route>
        ))
      )}

      {/* Service Areas hub */}
      <Route path={'/service-areas'} component={ServiceAreas} />

      {/* Monthly promo -- single permanent URL, always shows the active promo */}
      <Route path={'/promo'} component={JuneSpecial} />

      {/* Pricing page - temporarily hidden from nav/sitemap; redirects public /pricing to quote form */}
      <Route path="/pricing">
        <Redirect to="/get-a-quote" />
      </Route>

      {/* /configure redirects to quote form */}
      <Route path="/configure">
        <Redirect to="/get-a-quote" />
      </Route>

      {/* Blog */}
      <Route path={'/blog'} component={BlogIndex} />
      <Route path={'/blog/:slug'} component={BlogPost} />

      {/* Legal pages -- MUST stay above /:archivedSlug catch-all */}
      <Route path={'/privacy-policy'} component={PrivacyPolicy} />
      <Route path={'/privacy-policy-112467'} component={PrivacyPolicy} />
      <Route path={'/terms-of-service'} component={TermsOfService} />

      {/* Promo archive pages -- e.g. /june-special, /july-special, /august-special */}
      {/* MUST stay BELOW all static named routes so it doesn't swallow them */}
      <Route path={'/:archivedSlug'}>
        {(params) => {
          const slug = params.archivedSlug ?? '';
          // Match month-special slugs (e.g. june-special) AND month-year slugs (e.g. june-2026, july-2026)
          if (/^[a-z]+-special$/.test(slug) || /^[a-z]+-\d{4}$/.test(slug)) {
            return <PromoArchive archivedSlug={slug} />;
          }
          return <NotFound />;
        }}
      </Route>

      {/* Final fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isOpen, service, closeBooking } = useBooking();
  useEffect(() => installEngagementTracking(), []);
  return (
    <>
      <ScrollToTop />
      <PageViewTracker />
      <Suspense fallback={null}><Toaster /></Suspense>
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <Router />
      </Suspense>
      {isOpen && <Suspense fallback={null}><BookingModal isOpen={isOpen} service={service} onClose={closeBooking} /></Suspense>}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <BookingProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </BookingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
