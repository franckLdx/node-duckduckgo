/// <reference types="request" />
import { allowedFormat, IFormatter } from "./formatHelper";
import { optionType } from "./optionHelper";
import * as request from "request";
export { IFormatter } from "./formatHelper";
export declare class Requester {
    private baseUrl;
    private _formatter;
    private noRedirect;
    private noHtml;
    private skipDisambig;
    format: allowedFormat;
    readonly formatter: IFormatter;
    no_redirect: optionType;
    no_html: optionType;
    skip_disambig: optionType;
    request(search: string, callBack?: request.RequestCallback): request.Request;
    private buildQueryOptions(builder);
}
