declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let initialized = false;

export const hasAnalytics = Boolean(GA_MEASUREMENT_ID);

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", name, params);
}

export function trackScrollDepth(depth: number, path: string) {
  trackEvent("scroll_depth", {
    percent: depth,
    page_path: path,
  });
}
