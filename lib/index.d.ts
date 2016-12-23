import { allowedFormat } from "./formatHelper";
import { allowedOptionValue } from "./optionHelper";
export declare class Requester {
    private baseUrl;
    private formater;
    private noRedirect;
    private noHtml;
    private skipDisambig;
    format: allowedFormat;
    no_redirect: allowedOptionValue;
    no_html: allowedOptionValue;
    skip_disambig: allowedOptionValue;
    request(request: string): void;
    private buildQueryOptions(builder);
}
