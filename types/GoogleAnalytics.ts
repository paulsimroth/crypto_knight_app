export type ConsentState = {
    adStorage: boolean
    analyticsStorage: boolean
}

export type GAParams = {
    gaId: string;
    dataLayerName?: string;
};

export type GTagFunction = (...args: unknown[]) => void;