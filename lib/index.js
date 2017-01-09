"use strict";
const formatHelper_1 = require("./formatHelper");
const queryBuilder_1 = require("./queryBuilder");
const optionHelper_1 = require("./optionHelper");
const request = require("request");
class Requester {
    constructor() {
        this.baseUrl = "http://api.duckduckgo.com/";
        this._formatter = formatHelper_1.getFormatter("json");
        this.noRedirect = new optionHelper_1.OptionHelper("no_redirect");
        this.noHtml = new optionHelper_1.OptionHelper("no_html");
        this.skipDisambig = new optionHelper_1.OptionHelper("skip_disambig");
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
    request(search, callBack) {
        const builder = queryBuilder_1.getBuilder();
        builder.q(search);
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
}
exports.Requester = Requester;
/*
import { parse } from "jsonstream";
const foo = parse("RelatedTopics.*.Results");
const r1 = new Requester();
r1.request("typescript").on("data", (data: Buffer) => {
  console.log("Data", data.toString());
});
/*r1.request("typescript", (err, result) => {
  console.log(result);
});*/
/*const r2 = new Requester();
r2.skip_disambig = 1;
r2.no_redirect = 1;
r2.no_html = 1;
r2.request("yellow stone").on("data", (data) => {
  console.log("*********Data", data.toString());
});*/

//# sourceMappingURL=index.js.map
