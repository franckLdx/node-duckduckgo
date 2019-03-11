"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const formatHelper_1 = require("./formatHelper");
const optionHelper_1 = require("./optionHelper");
const queryBuilder_1 = require("./queryBuilder");
class Requester {
    constructor(appName = 'node-duckduckgo') {
        this.appName = appName;
        this.baseUrl = 'http://api.duckduckgo.com/';
        // tslint:disable-next-line:variable-name
        this._formatter = formatHelper_1.getFormatter('json');
        this.noRedirect = new optionHelper_1.OptionHelper('no_redirect');
        this.noHtml = new optionHelper_1.OptionHelper('no_html');
        this.skipDisambig = new optionHelper_1.OptionHelper('skip_disambig');
    }
    request(search, callBack) {
        const builder = queryBuilder_1.getBuilder();
        builder.q(search);
        builder.t(this.appName);
        this._formatter.buildQueryParam(builder);
        this.buildQueryOptions(builder);
        const queryString = builder.toString();
        return request(`${this.baseUrl}?${queryString}`, callBack);
    }
    buildQueryOptions(builder) {
        this.noRedirect.buildQueryParam(builder);
        this.noHtml.buildQueryParam(builder);
        this.skipDisambig.buildQueryParam(builder);
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
        this.noRedirect.option = value;
    }
    get no_redirect() {
        return this.noRedirect.option;
    }
    set no_html(value) {
        this.noHtml.option = value;
    }
    get no_html() {
        return this.noHtml.option;
    }
    set skip_disambig(value) {
        this.skipDisambig.option = value;
    }
    get skip_disambig() {
        return this.skipDisambig.option;
    }
}
exports.Requester = Requester;

//# sourceMappingURL=index.js.map
