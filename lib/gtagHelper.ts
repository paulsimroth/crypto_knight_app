import { ConsentState } from '@/types/GoogleAnalytics';
import 'client-only';

/**
 * HELPER FUNCTIONS FO HANDLING COOKIE CONSENT
 * 
 * install "client-only" and "@types/gtag.js" npm packages for using Google Analytics
*/

export function getLocalStorage(key: string, defaultValue: ConsentState | boolean | undefined) {
    const stickyValue = localStorage.getItem(key);

    return (stickyValue !== null && stickyValue !== 'undefined')
        ? JSON.parse(stickyValue)
        : defaultValue;
};

export function setLocalStorage(key: string, value: ConsentState | boolean | undefined) {
    localStorage.setItem(key, JSON.stringify(value));
};