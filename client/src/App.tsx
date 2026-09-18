import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookingProvider, useBooking } from "./contexts/BookingContext";
import BookingModal from "./components/BookingModal";
import { useEffect, useState } from "react";
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
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicePPF from "./pages/ServicePPF";
import ServiceCeramic from "./pages/ServiceCeramic";
import ServiceTint from "./pages/ServiceTint";
import ServiceWrap from "./pages/ServiceWrap";
import GetAQuote from "./pages/GetAQuote";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import QuoteAssistant from "./components/QuoteAssistant";
import LocalPPF from "./pages/LocalPPF";
import LocalCeramic from "./pages/LocalCeramic";
import LocalTint from "./pages/LocalTint";
import LocalWrap from "./pages/LocalWrap";
import CentrevillePPF from "./pages/CentrevillePPF";
import CentrevilleCeramic from "./pages/CentrevilleCeramic";
import CentrevilleTint from "./pages/CentrevilleTint";
import CentrevilleWrap from "./pages/CentrevilleWrap";
import HerndonPPF from "./pages/HerndonPPF";
import HerndonCeramic from "./pages/HerndonCeramic";
import HerndonTint from "./pages/HerndonTint";
import HerndonWrap from "./pages/HerndonWrap";
import FairfaxPPF from "./pages/FairfaxPPF";
import FairfaxCeramic from "./pages/FairfaxCeramic";
import FairfaxTint from "./pages/FairfaxTint";
import FairfaxWrap from "./pages/FairfaxWrap";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import ViennaPPF from "./pages/ViennaPPF";
import ViennaCeramic from "./pages/ViennaCeramic";
import ViennaTint from "./pages/ViennaTint";
import ViennaWrap from "./pages/ViennaWrap";
import RestonPPF from "./pages/RestonPPF";
import RestonCeramic from "./pages/RestonCeramic";
import RestonTint from "./pages/RestonTint";
import RestonWrap from "./pages/RestonWrap";
import McLeanPPF from "./pages/McLeanPPF";
import McLeanCeramic from "./pages/McLeanCeramic";
import McLeanTint from "./pages/McLeanTint";
import McLeanWrap from "./pages/McLeanWrap";
import TysonsPPF from "./pages/TysonsPPF";
import TysonsCeramic from "./pages/TysonsCeramic";
import TysonsTint from "./pages/TysonsTint";
import TysonsWrap from "./pages/TysonsWrap";
import AlexandriaPPF from "./pages/AlexandriaPPF";
import AlexandriaCeramic from "./pages/AlexandriaCeramic";
import AlexandriaTint from "./pages/AlexandriaTint";
import AlexandriaWrap from "./pages/AlexandriaWrap";
import ArlingtonPPF from "./pages/ArlingtonPPF";
import ArlingtonCeramic from "./pages/ArlingtonCeramic";
import ArlingtonTint from "./pages/ArlingtonTint";
import ArlingtonWrap from "./pages/ArlingtonWrap";
import FallsChurchPPF from "./pages/FallsChurchPPF";
import FallsChurchCeramic from "./pages/FallsChurchCeramic";
import FallsChurchTint from "./pages/FallsChurchTint";
import FallsChurchWrap from "./pages/FallsChurchWrap";
import SpringfieldPPF from "./pages/SpringfieldPPF";
import SpringfieldCeramic from "./pages/SpringfieldCeramic";
import SpringfieldTint from "./pages/SpringfieldTint";
import SpringfieldWrap from "./pages/SpringfieldWrap";
import ManassasPPF from "./pages/ManassasPPF";
import ManassasCeramic from "./pages/ManassasCeramic";
import ManassasTint from "./pages/ManassasTint";
import ManassasWrap from "./pages/ManassasWrap";
import WoodbridgePPF from "./pages/WoodbridgePPF";
import WoodbridgeCeramic from "./pages/WoodbridgeCeramic";
import WoodbridgeTint from "./pages/WoodbridgeTint";
import WoodbridgeWrap from "./pages/WoodbridgeWrap";
import StaffordPPF from "./pages/StaffordPPF";
import StaffordCeramic from "./pages/StaffordCeramic";
import StaffordTint from "./pages/StaffordTint";
import StaffordWrap from "./pages/StaffordWrap";
import FredericksburgPPF from "./pages/FredericksburgPPF";
import FredericksburgCeramic from "./pages/FredericksburgCeramic";
import FredericksburgTint from "./pages/FredericksburgTint";
import FredericksburgWrap from "./pages/FredericksburgWrap";
import ChantillyPPF from "./pages/ChantillyPPF";
import ChantillyCeramic from "./pages/ChantillyCeramic";
import ChantillyTint from "./pages/ChantillyTint";
import ChantillyWrap from "./pages/ChantillyWrap";
import ServiceAreas from "./pages/ServiceAreas";
import JuneSpecial from "./pages/JuneSpecial";
import PromoArchive from "./pages/PromoArchive";
// import Pricing from "./pages/Pricing"; // temporarily hidden from nav
import Pricing from "./pages/Pricing"; // accessible via /price-sheet for internal reference
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

      {/* Chantilly local SEO landing pages — home city */}
      <Route path={'/ppf-chantilly-va'} component={ChantillyPPF} />
      <Route path={'/ceramic-coating-chantilly-va'} component={ChantillyCeramic} />
      <Route path={'/window-tinting-chantilly-va'} component={ChantillyTint} />
      <Route path={'/vinyl-wraps-chantilly-va'} component={ChantillyWrap} />

      {/* Centreville local SEO landing pages */}
      <Route path={'/ppf-centreville-va'} component={CentrevillePPF} />
      <Route path={'/ceramic-coating-centreville-va'} component={CentrevilleCeramic} />
      <Route path={'/window-tinting-centreville-va'} component={CentrevilleTint} />
      <Route path={'/vinyl-wraps-centreville-va'} component={CentrevilleWrap} />

      {/* Herndon local SEO landing pages */}
      <Route path={'/ppf-herndon-va'} component={HerndonPPF} />
      <Route path={'/ceramic-coating-herndon-va'} component={HerndonCeramic} />
      <Route path={'/window-tinting-herndon-va'} component={HerndonTint} />
      <Route path={'/vinyl-wraps-herndon-va'} component={HerndonWrap} />

      {/* Fairfax local SEO landing pages */}
      <Route path={'/ppf-fairfax-va'} component={FairfaxPPF} />
      <Route path={'/ceramic-coating-fairfax-va'} component={FairfaxCeramic} />
      <Route path={'/window-tinting-fairfax-va'} component={FairfaxTint} />
      <Route path={'/vinyl-wraps-fairfax-va'} component={FairfaxWrap} />

      {/* Vienna local SEO landing pages */}
      <Route path={'/ppf-vienna-va'} component={ViennaPPF} />
      <Route path={'/ceramic-coating-vienna-va'} component={ViennaCeramic} />
      <Route path={'/window-tinting-vienna-va'} component={ViennaTint} />
      <Route path={'/vinyl-wraps-vienna-va'} component={ViennaWrap} />

      {/* Reston local SEO landing pages */}
      <Route path={'/ppf-reston-va'} component={RestonPPF} />
      <Route path={'/ceramic-coating-reston-va'} component={RestonCeramic} />
      <Route path={'/window-tinting-reston-va'} component={RestonTint} />
      <Route path={'/vinyl-wraps-reston-va'} component={RestonWrap} />

      {/* McLean local SEO landing pages */}
      <Route path={'/ppf-mclean-va'} component={McLeanPPF} />
      <Route path={'/ceramic-coating-mclean-va'} component={McLeanCeramic} />
      <Route path={'/window-tinting-mclean-va'} component={McLeanTint} />
      <Route path={'/vinyl-wraps-mclean-va'} component={McLeanWrap} />

      {/* Tysons local SEO landing pages */}
      <Route path={'/ppf-tysons-va'} component={TysonsPPF} />
      <Route path={'/ceramic-coating-tysons-va'} component={TysonsCeramic} />
      <Route path={'/window-tinting-tysons-va'} component={TysonsTint} />
      <Route path={'/vinyl-wraps-tysons-va'} component={TysonsWrap} />

      {/* Alexandria local SEO landing pages */}
      <Route path={'/ppf-alexandria-va'} component={AlexandriaPPF} />
      <Route path={'/ceramic-coating-alexandria-va'} component={AlexandriaCeramic} />
      <Route path={'/window-tinting-alexandria-va'} component={AlexandriaTint} />
      <Route path={'/vinyl-wraps-alexandria-va'} component={AlexandriaWrap} />

      {/* Arlington local SEO landing pages */}
      <Route path={'/ppf-arlington-va'} component={ArlingtonPPF} />
      <Route path={'/ceramic-coating-arlington-va'} component={ArlingtonCeramic} />
      <Route path={'/window-tinting-arlington-va'} component={ArlingtonTint} />
      <Route path={'/vinyl-wraps-arlington-va'} component={ArlingtonWrap} />

      {/* Falls Church local SEO landing pages */}
      <Route path={'/ppf-falls-church-va'} component={FallsChurchPPF} />
      <Route path={'/ceramic-coating-falls-church-va'} component={FallsChurchCeramic} />
      <Route path={'/window-tinting-falls-church-va'} component={FallsChurchTint} />
      <Route path={'/vinyl-wraps-falls-church-va'} component={FallsChurchWrap} />

      {/* Springfield local SEO landing pages */}
      <Route path={'/ppf-springfield-va'} component={SpringfieldPPF} />
      <Route path={'/ceramic-coating-springfield-va'} component={SpringfieldCeramic} />
      <Route path={'/window-tinting-springfield-va'} component={SpringfieldTint} />
      <Route path={'/vinyl-wraps-springfield-va'} component={SpringfieldWrap} />

      {/* Manassas local SEO landing pages */}
      <Route path={'/ppf-manassas-va'} component={ManassasPPF} />
      <Route path={'/ceramic-coating-manassas-va'} component={ManassasCeramic} />
      <Route path={'/window-tinting-manassas-va'} component={ManassasTint} />
      <Route path={'/vinyl-wraps-manassas-va'} component={ManassasWrap} />

      {/* Woodbridge local SEO landing pages */}
      <Route path={'/ppf-woodbridge-va'} component={WoodbridgePPF} />
      <Route path={'/ceramic-coating-woodbridge-va'} component={WoodbridgeCeramic} />
      <Route path={'/window-tinting-woodbridge-va'} component={WoodbridgeTint} />
      <Route path={'/vinyl-wraps-woodbridge-va'} component={WoodbridgeWrap} />

      {/* Stafford local SEO landing pages */}
      <Route path={'/ppf-stafford-va'} component={StaffordPPF} />
      <Route path={'/ceramic-coating-stafford-va'} component={StaffordCeramic} />
      <Route path={'/window-tinting-stafford-va'} component={StaffordTint} />
      <Route path={'/vinyl-wraps-stafford-va'} component={StaffordWrap} />

      {/* Fredericksburg local SEO landing pages */}
      <Route path={'/ppf-fredericksburg-va'} component={FredericksburgPPF} />
      <Route path={'/ceramic-coating-fredericksburg-va'} component={FredericksburgCeramic} />
      <Route path={'/window-tinting-fredericksburg-va'} component={FredericksburgTint} />
      <Route path={'/vinyl-wraps-fredericksburg-va'} component={FredericksburgWrap} />

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
      <Router />
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
