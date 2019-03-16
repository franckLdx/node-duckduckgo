import * as request from 'request';
import { RequestCallback, RequestResponse } from 'request';
import { allowedFormat, IFormatter, JsonFormatter } from './formatHelper';
import { optionType } from './optionHelper';
export { JsonFormatter, RequestCallback, RequestResponse };
export declare class Requester {
    private appName;
    private baseUrl;
    private _formatter;
    private noRedirect;
    private noHtml;
    private skipDisambig;
    constructor(appName?: string);
    requestP(search: string): Promise<RequestResponse>;
    request(search: string, callBack?: RequestCallback): request.Request;
    private buildQueryOptions;
    format: allowedFormat;
    readonly formatter: IFormatter;
    no_redirect: optionType;
    no_html: optionType;
    skip_disambig: optionType;
}
