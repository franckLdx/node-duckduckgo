"use strict";
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
        this.prettifyResult = 0;
    }
    set pretty(pretty) {
        this.prettifyResult = pretty;
    }
    buildQueryParam(builder) {
        builder.format(this.format);
        builder.pretty(this.prettifyResult);
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
