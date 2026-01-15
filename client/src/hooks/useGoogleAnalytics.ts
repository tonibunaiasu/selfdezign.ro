import { useEffect } from 'react';

/**
 * Hook pentru initializarea si track-ul Google Analytics 4
 * Asigura ca GA4 script-ul este incarcat si configurat corect
 */
export function useGoogleAnalytics() {
  useEffect(() => {
    // Verifica daca GA4 e deja incarcat
    if (typeof window !== 'undefined' && window.gtag) {
      // GA4 e deja disponibil din HTML script
      console.log('[GA4] Google Analytics 4 is initialized');
    }
  }, []);
}

/**
 * Functie pentru track-ul evenimentelor custom pe GA4
 * @param eventName - Numele evenimentului (e.g., 'contact_form_submit')
 * @param eventData - Date suplimentare despre eveniment
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData || {});
  } else {
    console.warn(`[GA4] Cannot track event "${eventName}": gtag not available`);
  }
}

/**
 * Functie pentru track-ul page view pe GA4
 * @param pageTitle - Titlul paginii
 * @param pagePath - Path-ul paginii
 */
export function trackPageView(pageTitle: string, pagePath: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', (window as any).GA_MEASUREMENT_ID, {
      'page_title': pageTitle,
      'page_path': pagePath,
    });
  }
}

/**
 * Declare gtag pentru TypeScript
 */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    GA_MEASUREMENT_ID: string;
  }
}
