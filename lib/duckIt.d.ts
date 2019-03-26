export declare type ParentalFilter = 'Activated' | 'Moderate' | 'Deactivated';
export declare type Format = 'json' | 'xml';
export interface SearchOption {
    appName?: string;
    format?: Format;
    noRedirect?: boolean;
    noHtml?: boolean;
    skipDisambig?: boolean;
    parentalFilter?: ParentalFilter;
}
export declare function duckIt(searchQuery: string, searchOption?: SearchOption): Promise<import("axios").AxiosResponse<any>>;
