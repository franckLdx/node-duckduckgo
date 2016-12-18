"use strict";
const formatHelper_1 = require("./formatHelper");
class Requester {
    constructor(appName = "node-duckduckgo") {
        this.appName = appName;
        this.baseUrl = "http://api.duckduckgo.com/";
        this.formater = new formatHelper_1.JsonFormat();
    }
    get serverUrl() {
        return this.baseUrl;
    }
    set serverUrl(newUrl) {
        this.baseUrl = newUrl;
    }
    set format(format) {
        this.formater = formatHelper_1.getFormatter(format);
    }
    get format() {
        return this.formater.toAllowedFormat();
    }
    request(request) {
        const uri = `${this.baseUrl}`;
    }
}
exports.Requester = Requester;

//# sourceMappingURL=index.js.map
