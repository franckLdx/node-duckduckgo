/// <reference types="request" />
import { allowedFormat } from "./formatHelper";
import { optionType } from "./optionHelper";
import * as request from "request";
export declare class Requester {
    private baseUrl;
    private formater;
    private noRedirect;
    private noHtml;
    private skipDisambig;
    format: allowedFormat;
    no_redirect: optionType;
    no_html: optionType;
    skip_disambig: optionType;
    request(search: string): request.Request;
    private buildQueryOptions(builder);
}
