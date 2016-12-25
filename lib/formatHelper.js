"use strict";
const optionHelper_1 = require("./optionHelper");
function getFormatter(format) {
    switch (format) {
        case "json":
            return new JsonFormat();
        case "xml":
            return new XmlFormat();
    }
}
exports.getFormatter = getFormatter;
class JsonFormat {
    constructor() {
        this.format = "json";
        this.prettify = new optionHelper_1.OptionHelper("pretty");
    }
    set pretty(pretty) {
        this.prettify.option = pretty;
    }
    buildQueryParam(builder) {
        builder.format(this.format);
        this.prettify.buildQueryParam(builder);
    }
}
exports.JsonFormat = JsonFormat;
class XmlFormat {
    constructor() {
        this.format = "xml";
    }
    buildQueryParam(builder) {
        builder.format(this.format);
    }
}
exports.XmlFormat = XmlFormat;

//# sourceMappingURL=formatHelper.js.map
