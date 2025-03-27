/**
 * GOOGLE ANALYTICS functions
 * 
 * install "client-only" and "@types/gtag.js" npm packages for using Google Analytics
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn('Google Analytics (gtag) is not available');
  }
};