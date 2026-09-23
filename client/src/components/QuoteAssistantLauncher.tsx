/**
 * Floating "Get a Quick Quote" button that loads the AI chat widget only
 * when someone clicks it (or after the page has been idle for a while),
 * keeping the chat code out of the initial bundle.
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { MessageSquare } from "lucide-react";

const QuoteAssistant = lazy(() => import("./QuoteAssistant"));
const preload = () => import("./QuoteAssistant");

export default function QuoteAssistantLauncher() {
  const [loaded, setLoaded] = useState(false);

  // Warm the chunk once the page is idle so the first click feels instant.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const t = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(() => { preload(); }, { timeout: 4000 }) : preload()), 6000);
    return () => window.clearTimeout(t);
  }, []);

  if (loaded) {
    return (
      <Suspense fallback={null}>
        <QuoteAssistant autoOpen />
      </Suspense>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        onClick={() => { setLoaded(true); track("chat_open"); }}
        onMouseEnter={() => { preload(); }}
        aria-label="Get a Quick Quote with the AI assistant"
        className="group flex items-center gap-3 bg-[#E85D04] hover:bg-[#d14e00] text-black shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 rounded-full px-5 py-4"
      >
        <MessageSquare className="w-5 h-5 flex-shrink-0" />
        <span className="font-bold tracking-wide text-sm whitespace-nowrap">Get a Quick Quote</span>
      </button>
    </div>
  );
}
