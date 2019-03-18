"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const formatHelper_1 = require("./formatHelper");
exports.JsonFormatter = formatHelper_1.JsonFormatter;
const optionHelper_1 = require("./optionHelper");
const queryBuilder_1 = require("./queryBuilder");
exports.safeSearch_strict = 1;
exports.safeSearch_moderate = -1;
exports.safeSearch_off = -2;
// tslint:disable-next-line:min-class-cohesion
class Requester {
    constructor(appName = 'node-duckduckgo') {
        this.appName = appName;
        this._baseUrl = 'https://api.duckduckgo.com/';
        // tslint:disable-next-line:variable-name
        this._formatter = formatHelper_1.getFormatter('json');
        this._noRedirect = new optionHelper_1.OptionHelper('no_redirect');
        this._noHtml = new optionHelper_1.OptionHelper('no_html');
        this._skipDisambig = new optionHelper_1.OptionHelper('skip_disambig');
        this._safeSearch = new optionHelper_1.OptionHelper('kp', exports.safeSearch_strict);
    }
    requestP(search) {
        return new Promise((resolve, reject) => {
            const cb = (error, response, body) => {
                if (error !== undefined && error !== null) {
                    reject(error);
                }
                resolve(response);
            };
            this.request(search, cb);
        });
    }
    request(search, callBack) {
        const builder = queryBuilder_1.getBuilder();
        builder.q(search);
        builder.t(this.appName);
        this._formatter.buildQueryParam(builder);
        this.buildQueryOptions(builder);
        const queryString = builder.toString();
        return request(`${this._baseUrl}?${queryString}`, callBack);
    }
    buildQueryOptions(builder) {
        this._noRedirect.buildQueryParam(builder);
        this._noHtml.buildQueryParam(builder);
        this._skipDisambig.buildQueryParam(builder);
        this._safeSearch.buildQueryParam(builder);
    }
    set format(format) {
        this._formatter = formatHelper_1.getFormatter(format);
    }
    get format() {
        return this._formatter.getFormat();
    }
    get formatter() {
        return this._formatter;
    }
    set no_redirect(value) {
        this._noRedirect.option = value;
    }
    get no_redirect() {
        return this._noRedirect.option;
    }
    set no_html(value) {
        this._noHtml.option = value;
    }
    get no_html() {
        return this._noHtml.option;
    }
    set skip_disambig(value) {
        this._skipDisambig.option = value;
    }
    get skip_disambig() {
        return this._skipDisambig.option;
    }
    set safe_search(value) {
        this._safeSearch.option = value;
    }
    get safe_search() {
        return this._safeSearch.option;
    }
}
exports.Requester = Requester;
//# sourceMappingURL=index.js.map