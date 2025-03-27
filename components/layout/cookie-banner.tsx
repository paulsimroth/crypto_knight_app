'use client';
import { getLocalStorage, setLocalStorage } from '@/lib/gtagHelper';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { event } from '@/lib/gtag';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

/**
 * COOKIE BANNER FOR GOOGLE ANALYTICS
 * @returns CookieBanner component
 */
type ConsentState = {
    adStorage: boolean
    analyticsStorage: boolean
}

export default function CookieBanner() {

    const [cookieConsent, setCookieConsent] = useState<ConsentState>();
    const [ruleState, setRuleState] = useState<boolean>(false);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        setCookieConsent(storedCookieConsent);
    }, []);

    useEffect(() => {
        const adStorage = cookieConsent?.adStorage ? 'granted' : 'denied'
        const analyticsStorage = cookieConsent?.analyticsStorage ? 'granted' : 'denied'

        if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
            window.gtag("consent", 'update', {
                'analytics_storage': analyticsStorage,
                'ad_user_data': adStorage,
            });
        } else {
            console.warn("gtag is not defined, cannot update consent.")
        };

        setLocalStorage("cookie_consent", cookieConsent);

    }, [cookieConsent]);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("gamerules_accepted", null);
        setRuleState(storedCookieConsent);
    }, []);

    useEffect(() => {
        setLocalStorage("gamerules_accepted", ruleState);
    }, [ruleState]);

    return (
        <>
            <Card className={`z-[90] fixed mx-auto top-[35%] right-0 left-0 max-w-[90%] text-[17px] md:max-w-screen-sm ${ruleState ? "hidden" : "flex"} flex-col`}>
                <CardHeader>
                    <CardTitle>
                        Crypto Knights
                    </CardTitle>
                    <CardDescription>
                        Welcome to this Web3 Game!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className='text-2xl font-bold'>
                        Rules
                    </h2>
                    <p className='my-1'>
                        The rules are simple. start the game and collect as many coins as you can. Once the Time is over you will get the Tokens straight to your wallet.
                    </p>
                    <p className='my-1'>
                        In the future you will be able to trade your coins for special items, which will enhance the knights abilities.
                    </p>
                    <p className='my-1'>
                        You can control the Knight with the <strong>Arrow Keys</strong> or <strong>Spacebar</strong>
                    </p>
                    <p className='my-1 text-lime-500'>
                        Feel free to suggest your own ideas for this game. Please use the contact form or contribute on the github repo!
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => setRuleState(true)}>
                        Close
                    </Button>
                </CardFooter>
            </Card>
            <div
                className={`my-10 mx-auto max-w-[90%] md:max-w-screen-sm
                        fixed bottom-1 left-0 right-0 
                        ${cookieConsent != null ? "hidden" : "flex"} px-3 md:px-4 py-3 justify-between items-center gap-4 text-[17px]  
                        bg-secondary rounded-lg shadow-secondary-foreground shadow z-[90]`}
            >
                <div>
                    <p className='text-justify'>
                        <Link href={`${process.env.NEXT_PUBLIC_EXTERNAL_URL}/datapolicy`} aria-label='Link to Data Policy'>This site uses <span className='font-bold text-primary hover:underline duration-1000'>Cookies.</span> </Link>
                        By clicking &quot;Accept All&quot; you help me with improving this website and its performance better. It helps me understand where the website is visited from and by how many people.
                        &quot;Accept (required only)&quot; only tracks the performance of the website. Visit the <Link href="/datapolicy" aria-label='Link to Data Policy' className='font-bold text-primary hover:underline duration-1000'>Data Policy</Link> for more information!
                    </p>
                </div>
                <div className='flex flex-col gap-4 items-center justify-center w-fit'>
                    <Button onClick={() => { setCookieConsent({ adStorage: true, analyticsStorage: true }), event('cookieConsent', 'user_interaction', 'all') }} className='p-5' aria-label='Allow All Cookies'>
                        Accept All
                    </Button>
                    <Button onClick={() => { setCookieConsent({ adStorage: false, analyticsStorage: true }), event('cookieConsent', 'user_interaction', 'required') }} variant="outline" className='flex flex-col items-center justify-center p-5' aria-label='Allow required Cookies'>
                        Accept
                        <span className='text-[10px]'>(required only)</span>
                    </Button>
                </div>
            </div>
        </>
    )
};