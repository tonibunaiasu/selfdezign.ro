import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { setMetaConsent } from "@/lib/metaPixel";

const CONSENT_KEY = "sd-consent";

type ConsentState = "unknown" | "granted" | "denied";

function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return "unknown";
}

function persistConsent(value: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
}

export default function ConsentBanner() {
  const [location] = useLocation();
  const [consent, setConsent] = useState<ConsentState>("unknown");

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored === "granted") {
      initAnalytics();
      trackPageView(location);
      setMetaConsent(true);
    } else if (stored === "denied") {
      setMetaConsent(false);
    }
    if (stored !== "unknown") return;

    const onScroll = () => {
      persistConsent("granted");
      setConsent("granted");
      initAnalytics();
      trackPageView(location);
      setMetaConsent(true);
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  if (consent !== "unknown") return null;

  const accept = () => {
    persistConsent("granted");
    setConsent("granted");
    initAnalytics();
    trackPageView(location);
    setMetaConsent(true);
  };

  const decline = () => {
    persistConsent("denied");
    setConsent("denied");
    setMetaConsent(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-4 md:max-w-sm">
      <div className="rounded-2xl border border-black/10 bg-white/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur">
        <p className="text-xs text-gray-600">
          Folosim cookie-uri pentru masurare si marketing. Poti accepta sau refuza.{" "}
          <a className="underline" href="/cookies">
            Politica de Cookies
          </a>
          .
        </p>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={decline}
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
          >
            Refuza
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-[var(--color-brand-yellow)] px-3 py-1 text-xs font-semibold text-black hover:opacity-90"
          >
            Accepta
          </button>
        </div>
      </div>
    </div>
  );
}
