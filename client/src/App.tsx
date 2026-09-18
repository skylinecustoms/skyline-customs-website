import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookingProvider, useBooking } from "./contexts/BookingContext";
import BookingModal from "./components/BookingModal";
import { lazy, Suspense, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { X } from "lucide-react";

// ─── Announcement Banner (controlled via Telegram bot /announce command) ─────
function AnnouncementBanner() {
  const { data: settings } = trpc.site.settings.useQuery();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (!settings) return null;
  if (settings.announcementActive !== "1") return null;
  if (!settings.announcement) return null;

  return (
    <div className="relative z-50 bg-orange-500 text-white text-center text-sm font-semibold py-2.5 px-10">
      <span>{settings.announcement}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}
import Home from "./pages/Home";
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ServicePPF = lazy(() => import("./pages/ServicePPF"));
const ServiceCeramic = lazy(() => import("./pages/ServiceCeramic"));
const ServiceTint = lazy(() => import("./pages/ServiceTint"));
const ServiceWrap = lazy(() => import("./pages/ServiceWrap"));
const GetAQuote = lazy(() => import("./pages/GetAQuote"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
import QuoteAssistant from "./components/QuoteAssistant";
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const JuneSpecial = lazy(() => import("./pages/JuneSpecial"));
const PromoArchive = lazy(() => import("./pages/PromoArchive"));
// import Pricing from "./pages/Pricing"; // temporarily hidden from nav
const Pricing = lazy(() => import("./pages/Pricing"));
// City × service landing pages (lazy-loaded; content in lib/localSeo.ts)
const ChantillyPPF = lazy(() => import("./pages/ChantillyPPF"));
const ChantillyCeramic = lazy(() => import("./pages/ChantillyCeramic"));
const ChantillyTint = lazy(() => import("./pages/ChantillyTint"));
const ChantillyWrap = lazy(() => import("./pages/ChantillyWrap"));
const CentrevillePPF = lazy(() => import("./pages/CentrevillePPF"));
const CentrevilleCeramic = lazy(() => import("./pages/CentrevilleCeramic"));
const CentrevilleTint = lazy(() => import("./pages/CentrevilleTint"));
const CentrevilleWrap = lazy(() => import("./pages/CentrevilleWrap"));
const HerndonPPF = lazy(() => import("./pages/HerndonPPF"));
const HerndonCeramic = lazy(() => import("./pages/HerndonCeramic"));
const HerndonTint = lazy(() => import("./pages/HerndonTint"));
const HerndonWrap = lazy(() => import("./pages/HerndonWrap"));
const SterlingPPF = lazy(() => import("./pages/SterlingPPF"));
const SterlingCeramic = lazy(() => import("./pages/SterlingCeramic"));
const SterlingTint = lazy(() => import("./pages/SterlingTint"));
const SterlingWrap = lazy(() => import("./pages/SterlingWrap"));
const AshburnPPF = lazy(() => import("./pages/AshburnPPF"));
const AshburnCeramic = lazy(() => import("./pages/AshburnCeramic"));
const AshburnTint = lazy(() => import("./pages/AshburnTint"));
const AshburnWrap = lazy(() => import("./pages/AshburnWrap"));
const RestonPPF = lazy(() => import("./pages/RestonPPF"));
const RestonCeramic = lazy(() => import("./pages/RestonCeramic"));
const RestonTint = lazy(() => import("./pages/RestonTint"));
const RestonWrap = lazy(() => import("./pages/RestonWrap"));
const FairfaxPPF = lazy(() => import("./pages/FairfaxPPF"));
const FairfaxCeramic = lazy(() => import("./pages/FairfaxCeramic"));
const FairfaxTint = lazy(() => import("./pages/FairfaxTint"));
const FairfaxWrap = lazy(() => import("./pages/FairfaxWrap"));
const OaktonPPF = lazy(() => import("./pages/OaktonPPF"));
const OaktonCeramic = lazy(() => import("./pages/OaktonCeramic"));
const OaktonTint = lazy(() => import("./pages/OaktonTint"));
const OaktonWrap = lazy(() => import("./pages/OaktonWrap"));
const ViennaPPF = lazy(() => import("./pages/ViennaPPF"));
const ViennaCeramic = lazy(() => import("./pages/ViennaCeramic"));
const ViennaTint = lazy(() => import("./pages/ViennaTint"));
const ViennaWrap = lazy(() => import("./pages/ViennaWrap"));
const McLeanPPF = lazy(() => import("./pages/McLeanPPF"));
const McLeanCeramic = lazy(() => import("./pages/McLeanCeramic"));
const McLeanTint = lazy(() => import("./pages/McLeanTint"));
const McLeanWrap = lazy(() => import("./pages/McLeanWrap"));
const TysonsPPF = lazy(() => import("./pages/TysonsPPF"));
const TysonsCeramic = lazy(() => import("./pages/TysonsCeramic"));
const TysonsTint = lazy(() => import("./pages/TysonsTint"));
const TysonsWrap = lazy(() => import("./pages/TysonsWrap"));
const FallsChurchPPF = lazy(() => import("./pages/FallsChurchPPF"));
const FallsChurchCeramic = lazy(() => import("./pages/FallsChurchCeramic"));
const FallsChurchTint = lazy(() => import("./pages/FallsChurchTint"));
const FallsChurchWrap = lazy(() => import("./pages/FallsChurchWrap"));
const ArlingtonPPF = lazy(() => import("./pages/ArlingtonPPF"));
const ArlingtonCeramic = lazy(() => import("./pages/ArlingtonCeramic"));
const ArlingtonTint = lazy(() => import("./pages/ArlingtonTint"));
const ArlingtonWrap = lazy(() => import("./pages/ArlingtonWrap"));
const AlexandriaPPF = lazy(() => import("./pages/AlexandriaPPF"));
const AlexandriaCeramic = lazy(() => import("./pages/AlexandriaCeramic"));
const AlexandriaTint = lazy(() => import("./pages/AlexandriaTint"));
const AlexandriaWrap = lazy(() => import("./pages/AlexandriaWrap"));
const BurkePPF = lazy(() => import("./pages/BurkePPF"));
const BurkeCeramic = lazy(() => import("./pages/BurkeCeramic"));
const BurkeTint = lazy(() => import("./pages/BurkeTint"));
const BurkeWrap = lazy(() => import("./pages/BurkeWrap"));
const SpringfieldPPF = lazy(() => import("./pages/SpringfieldPPF"));
const SpringfieldCeramic = lazy(() => import("./pages/SpringfieldCeramic"));
const SpringfieldTint = lazy(() => import("./pages/SpringfieldTint"));
const SpringfieldWrap = lazy(() => import("./pages/SpringfieldWrap"));
const ManassasPPF = lazy(() => import("./pages/ManassasPPF"));
const ManassasCeramic = lazy(() => import("./pages/ManassasCeramic"));
const ManassasTint = lazy(() => import("./pages/ManassasTint"));
const ManassasWrap = lazy(() => import("./pages/ManassasWrap"));
const GainesvillePPF = lazy(() => import("./pages/GainesvillePPF"));
const GainesvilleCeramic = lazy(() => import("./pages/GainesvilleCeramic"));
const GainesvilleTint = lazy(() => import("./pages/GainesvilleTint"));
const GainesvilleWrap = lazy(() => import("./pages/GainesvilleWrap"));
const LeesburgPPF = lazy(() => import("./pages/LeesburgPPF"));
const LeesburgCeramic = lazy(() => import("./pages/LeesburgCeramic"));
const LeesburgTint = lazy(() => import("./pages/LeesburgTint"));
const LeesburgWrap = lazy(() => import("./pages/LeesburgWrap"));
const WoodbridgePPF = lazy(() => import("./pages/WoodbridgePPF"));
const WoodbridgeCeramic = lazy(() => import("./pages/WoodbridgeCeramic"));
const WoodbridgeTint = lazy(() => import("./pages/WoodbridgeTint"));
const WoodbridgeWrap = lazy(() => import("./pages/WoodbridgeWrap"));
const StaffordPPF = lazy(() => import("./pages/StaffordPPF"));
const StaffordCeramic = lazy(() => import("./pages/StaffordCeramic"));
const StaffordTint = lazy(() => import("./pages/StaffordTint"));
const StaffordWrap = lazy(() => import("./pages/StaffordWrap"));
const FredericksburgPPF = lazy(() => import("./pages/FredericksburgPPF"));
const FredericksburgCeramic = lazy(() => import("./pages/FredericksburgCeramic"));
const FredericksburgTint = lazy(() => import("./pages/FredericksburgTint"));
const FredericksburgWrap = lazy(() => import("./pages/FredericksburgWrap"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Current pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />

      {/* Individual service pages */}
      <Route path={"/services/ppf"} component={ServicePPF} />
      <Route path={"/services/ceramic-coating"} component={ServiceCeramic} />
      <Route path={"/services/window-tinting"} component={ServiceTint} />
      <Route path={"/services/vinyl-wraps"} component={ServiceWrap} />
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

      {/* Chantilly local SEO landing pages */}
      <Route path={"/ppf-chantilly-va"} component={ChantillyPPF} />
      <Route path={"/ceramic-coating-chantilly-va"} component={ChantillyCeramic} />
      <Route path={"/window-tinting-chantilly-va"} component={ChantillyTint} />
      <Route path={"/vinyl-wraps-chantilly-va"} component={ChantillyWrap} />

      {/* Centreville local SEO landing pages */}
      <Route path={"/ppf-centreville-va"} component={CentrevillePPF} />
      <Route path={"/ceramic-coating-centreville-va"} component={CentrevilleCeramic} />
      <Route path={"/window-tinting-centreville-va"} component={CentrevilleTint} />
      <Route path={"/vinyl-wraps-centreville-va"} component={CentrevilleWrap} />

      {/* Herndon local SEO landing pages */}
      <Route path={"/ppf-herndon-va"} component={HerndonPPF} />
      <Route path={"/ceramic-coating-herndon-va"} component={HerndonCeramic} />
      <Route path={"/window-tinting-herndon-va"} component={HerndonTint} />
      <Route path={"/vinyl-wraps-herndon-va"} component={HerndonWrap} />

      {/* Sterling local SEO landing pages */}
      <Route path={"/ppf-sterling-va"} component={SterlingPPF} />
      <Route path={"/ceramic-coating-sterling-va"} component={SterlingCeramic} />
      <Route path={"/window-tinting-sterling-va"} component={SterlingTint} />
      <Route path={"/vinyl-wraps-sterling-va"} component={SterlingWrap} />

      {/* Ashburn local SEO landing pages */}
      <Route path={"/ppf-ashburn-va"} component={AshburnPPF} />
      <Route path={"/ceramic-coating-ashburn-va"} component={AshburnCeramic} />
      <Route path={"/window-tinting-ashburn-va"} component={AshburnTint} />
      <Route path={"/vinyl-wraps-ashburn-va"} component={AshburnWrap} />

      {/* Reston local SEO landing pages */}
      <Route path={"/ppf-reston-va"} component={RestonPPF} />
      <Route path={"/ceramic-coating-reston-va"} component={RestonCeramic} />
      <Route path={"/window-tinting-reston-va"} component={RestonTint} />
      <Route path={"/vinyl-wraps-reston-va"} component={RestonWrap} />

      {/* Fairfax local SEO landing pages */}
      <Route path={"/ppf-fairfax-va"} component={FairfaxPPF} />
      <Route path={"/ceramic-coating-fairfax-va"} component={FairfaxCeramic} />
      <Route path={"/window-tinting-fairfax-va"} component={FairfaxTint} />
      <Route path={"/vinyl-wraps-fairfax-va"} component={FairfaxWrap} />

      {/* Oakton local SEO landing pages */}
      <Route path={"/ppf-oakton-va"} component={OaktonPPF} />
      <Route path={"/ceramic-coating-oakton-va"} component={OaktonCeramic} />
      <Route path={"/window-tinting-oakton-va"} component={OaktonTint} />
      <Route path={"/vinyl-wraps-oakton-va"} component={OaktonWrap} />

      {/* Vienna local SEO landing pages */}
      <Route path={"/ppf-vienna-va"} component={ViennaPPF} />
      <Route path={"/ceramic-coating-vienna-va"} component={ViennaCeramic} />
      <Route path={"/window-tinting-vienna-va"} component={ViennaTint} />
      <Route path={"/vinyl-wraps-vienna-va"} component={ViennaWrap} />

      {/* McLean local SEO landing pages */}
      <Route path={"/ppf-mclean-va"} component={McLeanPPF} />
      <Route path={"/ceramic-coating-mclean-va"} component={McLeanCeramic} />
      <Route path={"/window-tinting-mclean-va"} component={McLeanTint} />
      <Route path={"/vinyl-wraps-mclean-va"} component={McLeanWrap} />

      {/* Tysons local SEO landing pages */}
      <Route path={"/ppf-tysons-va"} component={TysonsPPF} />
      <Route path={"/ceramic-coating-tysons-va"} component={TysonsCeramic} />
      <Route path={"/window-tinting-tysons-va"} component={TysonsTint} />
      <Route path={"/vinyl-wraps-tysons-va"} component={TysonsWrap} />

      {/* Falls Church local SEO landing pages */}
      <Route path={"/ppf-falls-church-va"} component={FallsChurchPPF} />
      <Route path={"/ceramic-coating-falls-church-va"} component={FallsChurchCeramic} />
      <Route path={"/window-tinting-falls-church-va"} component={FallsChurchTint} />
      <Route path={"/vinyl-wraps-falls-church-va"} component={FallsChurchWrap} />

      {/* Arlington local SEO landing pages */}
      <Route path={"/ppf-arlington-va"} component={ArlingtonPPF} />
      <Route path={"/ceramic-coating-arlington-va"} component={ArlingtonCeramic} />
      <Route path={"/window-tinting-arlington-va"} component={ArlingtonTint} />
      <Route path={"/vinyl-wraps-arlington-va"} component={ArlingtonWrap} />

      {/* Alexandria local SEO landing pages */}
      <Route path={"/ppf-alexandria-va"} component={AlexandriaPPF} />
      <Route path={"/ceramic-coating-alexandria-va"} component={AlexandriaCeramic} />
      <Route path={"/window-tinting-alexandria-va"} component={AlexandriaTint} />
      <Route path={"/vinyl-wraps-alexandria-va"} component={AlexandriaWrap} />

      {/* Burke local SEO landing pages */}
      <Route path={"/ppf-burke-va"} component={BurkePPF} />
      <Route path={"/ceramic-coating-burke-va"} component={BurkeCeramic} />
      <Route path={"/window-tinting-burke-va"} component={BurkeTint} />
      <Route path={"/vinyl-wraps-burke-va"} component={BurkeWrap} />

      {/* Springfield local SEO landing pages */}
      <Route path={"/ppf-springfield-va"} component={SpringfieldPPF} />
      <Route path={"/ceramic-coating-springfield-va"} component={SpringfieldCeramic} />
      <Route path={"/window-tinting-springfield-va"} component={SpringfieldTint} />
      <Route path={"/vinyl-wraps-springfield-va"} component={SpringfieldWrap} />

      {/* Manassas local SEO landing pages */}
      <Route path={"/ppf-manassas-va"} component={ManassasPPF} />
      <Route path={"/ceramic-coating-manassas-va"} component={ManassasCeramic} />
      <Route path={"/window-tinting-manassas-va"} component={ManassasTint} />
      <Route path={"/vinyl-wraps-manassas-va"} component={ManassasWrap} />

      {/* Gainesville local SEO landing pages */}
      <Route path={"/ppf-gainesville-va"} component={GainesvillePPF} />
      <Route path={"/ceramic-coating-gainesville-va"} component={GainesvilleCeramic} />
      <Route path={"/window-tinting-gainesville-va"} component={GainesvilleTint} />
      <Route path={"/vinyl-wraps-gainesville-va"} component={GainesvilleWrap} />

      {/* Leesburg local SEO landing pages */}
      <Route path={"/ppf-leesburg-va"} component={LeesburgPPF} />
      <Route path={"/ceramic-coating-leesburg-va"} component={LeesburgCeramic} />
      <Route path={"/window-tinting-leesburg-va"} component={LeesburgTint} />
      <Route path={"/vinyl-wraps-leesburg-va"} component={LeesburgWrap} />

      {/* Woodbridge local SEO landing pages */}
      <Route path={"/ppf-woodbridge-va"} component={WoodbridgePPF} />
      <Route path={"/ceramic-coating-woodbridge-va"} component={WoodbridgeCeramic} />
      <Route path={"/window-tinting-woodbridge-va"} component={WoodbridgeTint} />
      <Route path={"/vinyl-wraps-woodbridge-va"} component={WoodbridgeWrap} />

      {/* Stafford local SEO landing pages */}
      <Route path={"/ppf-stafford-va"} component={StaffordPPF} />
      <Route path={"/ceramic-coating-stafford-va"} component={StaffordCeramic} />
      <Route path={"/window-tinting-stafford-va"} component={StaffordTint} />
      <Route path={"/vinyl-wraps-stafford-va"} component={StaffordWrap} />

      {/* Fredericksburg local SEO landing pages */}
      <Route path={"/ppf-fredericksburg-va"} component={FredericksburgPPF} />
      <Route path={"/ceramic-coating-fredericksburg-va"} component={FredericksburgCeramic} />
      <Route path={"/window-tinting-fredericksburg-va"} component={FredericksburgTint} />
      <Route path={"/vinyl-wraps-fredericksburg-va"} component={FredericksburgWrap} />

      {/* Service Areas hub */}
      <Route path={'/service-areas'} component={ServiceAreas} />

      {/* Monthly promo -- single permanent URL, always shows the active promo */}
      <Route path={'/promo'} component={JuneSpecial} />

      {/* Pricing page - temporarily hidden from nav/sitemap; redirects public /pricing to quote form */}
      <Route path="/pricing">
        <Redirect to="/get-a-quote" />
      </Route>

      {/* Internal-only price sheet reference — not in navbar, sitemap, or robots.txt */}
      <Route path="/price-sheet" component={Pricing} />

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
  return (
    <>
      <AnnouncementBanner />
      <ScrollToTop />
      <Toaster />
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <Router />
      </Suspense>
      <BookingModal isOpen={isOpen} service={service} onClose={closeBooking} />
      <QuoteAssistant />
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
