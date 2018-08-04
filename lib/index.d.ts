import * as request from 'request';
import { allowedFormat, IFormatter } from './formatHelper';
import { optionType } from './optionHelper';
export { IFormatter, JsonFormatter } from './formatHelper';
export { RequestCallback } from 'request';
export declare class Requester {
    private appName;
    private baseUrl;
    private _formatter;
    private noRedirect;
    private noHtml;
    private skipDisambig;
    constructor(appName?: string);
    request(search: string, callBack?: request.RequestCallback): request.Request;
    private buildQueryOptions;
    format: allowedFormat;
    readonly formatter: IFormatter;
    no_redirect: optionType;
    no_html: optionType;
    skip_disambig: optionType;
}
