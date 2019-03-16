import * as request from 'request';
import { RequestCallback, RequestResponse } from 'request';
import { allowedFormat, IFormatter, JsonFormatter } from './formatHelper';
import { SafeSearchValues, StdOptionValues } from './optionHelper';
export { JsonFormatter, RequestCallback, RequestResponse };
export declare const safeSearch_strict = 1;
export declare const safeSearch_moderate = -1;
export declare const safeSearch_off = -2;
export declare class Requester {
    private appName;
    private _baseUrl;
    private _formatter;
    private _noRedirect;
    private _noHtml;
    private _skipDisambig;
    private _safeSearch;
    constructor(appName?: string);
    requestP(search: string): Promise<RequestResponse>;
    request(search: string, callBack?: RequestCallback): request.Request;
    private buildQueryOptions;
    format: allowedFormat;
    readonly formatter: IFormatter;
    no_redirect: StdOptionValues;
    no_html: StdOptionValues;
    skip_disambig: StdOptionValues;
    safe_search: SafeSearchValues;
}
