declare global {
  interface Window {
    plausible?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }
}

export function trackCTA(name: string, props?: Record<string, string>) {
  trackEvent(name, props);
}
