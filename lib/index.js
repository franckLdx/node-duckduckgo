"use strict";
const formatHelper_1 = require("./formatHelper");
const queryBuilder_1 = require("./queryBuilder");
const optionHelper_1 = require("./optionHelper");
class Requester {
    constructor() {
        this.baseUrl = "http://api.duckduckgo.com/";
        this.formater = formatHelper_1.getFormatter("json");
        this.noRedirect = new optionHelper_1.OptionHelper("no_redirect");
        this.noHtml = new optionHelper_1.OptionHelper("no_html");
        this.skipDisambig = new optionHelper_1.OptionHelper("skip_disambig");
    }
    set format(format) {
        this.formater = formatHelper_1.getFormatter(format);
    }
    set no_redirect(value) {
        this.noRedirect.option = value;
    }
    set no_html(value) {
        this.noHtml.option = value;
    }
    set skip_disambig(value) {
        this.skipDisambig.option = value;
    }
    request(request) {
        const builder = queryBuilder_1.getBuilder();
        builder.q(request);
        this.formater.buildQueryParam(builder);
        this.buildQueryOptions(builder);
        const uri = builder.toString();
        console.log("**********************", uri);
    }
    buildQueryOptions(builder) {
        this.noRedirect.buildQueryParam(builder);
        this.noHtml.buildQueryParam(builder);
        this.skipDisambig.buildQueryParam(builder);
    }
}
exports.Requester = Requester;
const r = new Requester();
r.request("typsecript");
r.request("yellow stone");
r.skip_disambig = 1;
r.no_redirect = 1;
r.no_html = 0;
r.request("yellow stone");

//# sourceMappingURL=index.js.map
