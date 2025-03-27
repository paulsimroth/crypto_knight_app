'use client';
import { pageview } from '@/lib/gtag';
import { GAParams, GTagFunction } from '@/types/GoogleAnalytics';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

/**
 * @returns GoogleAnalytics component 
 * 
 * CookieBanner and gtag.ts also belong to GoogleAnalytics
 * pathname is only registered in this file
 * gtag events need to be added to every tracked interaction
 */
declare global {
    interface Window {
        gtag: GTagFunction;
        dataLayer?: object[];
    }
}

function GoogleAnalytics(gaId: Readonly<GAParams>) {

    const pathname = usePathname();

    useEffect(() => {
        const url = pathname

        pageview(url);
    }, [pathname])

    return (
        <>
            {/* HERE ADD GOOGLE ADSENSE SCRIPT TAG (OPTIONAL)*/}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('consent', 'default', {
                        'analytics_storage': 'denied',
                        'ad_user_data': 'denied',
                    });

                    gtag('config', '${gaId}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;