export declare type ParentalFilter = 'Activated' | 'Moderate' | 'Deactivated';
export interface SearchOption {
    appName?: string;
    format?: string;
    noRedirect?: boolean;
    noHtml?: boolean;
    skipDisambig?: boolean;
    parentalFilter?: ParentalFilter;
}
export declare function duckIt(searchQuery: string, searchOption?: SearchOption): Promise<import("axios").AxiosResponse<any>>;
