import * as request from 'request';
import { RequestCallback, RequestResponse } from 'request';
import {
  allowedFormat,
  getFormatter,
  IFormatter,
  JsonFormatter
} from './formatHelper';
import { OptionHelper, SafeSearchValues, StdOptionValues } from './optionHelper';
import { getBuilder } from './queryBuilder';

export { JsonFormatter, RequestCallback, RequestResponse };

export const safeSearch_strict = 1;
export const safeSearch_moderate = -1;
export const safeSearch_off = -2;

// tslint:disable-next-line:min-class-cohesion
export class Requester {
  private _baseUrl = 'https://api.duckduckgo.com/';
  // tslint:disable-next-line:variable-name
  private _formatter = getFormatter('json');
  private _noRedirect = new OptionHelper<StdOptionValues>('no_redirect');
  private _noHtml = new OptionHelper<StdOptionValues>('no_html');
  private _skipDisambig = new OptionHelper<StdOptionValues>('skip_disambig');
  private _safeSearch = new OptionHelper<SafeSearchValues>('kp', safeSearch_strict);

  constructor(private appName = 'node-duckduckgo') { }

  public requestP(search: string): Promise<RequestResponse> {
    return new Promise<RequestResponse>((resolve, reject) => {
      const cb: RequestCallback = (error, response, body: any) => {
        if (error !== undefined && error !== null) {
          reject(error);
        }
        resolve(response);
      };
      this.request(search, cb);
    });
  }

  public request(search: string, callBack?: RequestCallback) {
    const builder = getBuilder();
    builder.q(search);
    builder.t(this.appName);
    this._formatter.buildQueryParam(builder);
    this.buildQueryOptions(builder);
    const queryString = builder.toString();

    return request(`${this._baseUrl}?${queryString}`, callBack);
  }

  private buildQueryOptions(builder: any) {
    this._noRedirect.buildQueryParam(builder);
    this._noHtml.buildQueryParam(builder);
    this._skipDisambig.buildQueryParam(builder);
    this._safeSearch.buildQueryParam(builder);
  }

  set format(format: allowedFormat) {
    this._formatter = getFormatter(format);
  }

  get format() {
    return this._formatter.getFormat();
  }

  get formatter() {
    return this._formatter;
  }

  set no_redirect(value: StdOptionValues) {
    this._noRedirect.option = value;
  }

  get no_redirect() {
    return this._noRedirect.option;
  }

  set no_html(value: StdOptionValues) {
    this._noHtml.option = value;
  }

  get no_html() {
    return this._noHtml.option;
  }

  set skip_disambig(value: StdOptionValues) {
    this._skipDisambig.option = value;
  }

  get skip_disambig() {
    return this._skipDisambig.option;
  }

  set safe_search(value: SafeSearchValues) {
    this._safeSearch.option = value;
  }

  get safe_search() {
    return this._safeSearch.option;
  }
}
