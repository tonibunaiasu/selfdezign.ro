declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function setMetaConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("consent", granted ? "grant" : "revoke");
}

