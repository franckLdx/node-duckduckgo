"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const optionHelper_1 = require("./optionHelper");
function getFormatter(format) {
    switch (format) {
        case 'json':
            return new JsonFormatter();
        case 'xml':
            return new XmlFormatter();
        default:
            throw new Error(`Unsupported format ${format}`);
    }
}
exports.getFormatter = getFormatter;
class JsonFormatter {
    constructor() {
        this.format = 'json';
        this.prettify = new optionHelper_1.OptionHelper('pretty');
    }
    set pretty(pretty) {
        this.prettify.option = pretty;
    }
    get pretty() {
        return this.prettify.option;
    }
    buildQueryParam(builder) {
        builder.format(this.format);
        this.prettify.buildQueryParam(builder);
    }
    getFormat() {
        return this.format;
    }
}
exports.JsonFormatter = JsonFormatter;
class XmlFormatter {
    constructor() {
        this.format = 'xml';
    }
    buildQueryParam(builder) {
        builder.format(this.format);
    }
    getFormat() {
        return this.format;
    }
}
exports.XmlFormatter = XmlFormatter;

//# sourceMappingURL=formatHelper.js.map
