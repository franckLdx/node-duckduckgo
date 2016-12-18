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
        this.prettifyResult = 0 | 1;
    }
    getFormatQueryParam() {
        return `$format&pretty=1`;
    }
    set pretty(pretty) {
        this.prettifyResult = pretty;
    }
    toAllowedFormat() {
        return this.format;
    }
}
exports.JsonFormat = JsonFormat;
class XmlFormat {
    constructor() {
        this.format = "xml";
    }
    getFormatQueryParam() {
        return `$format`;
    }
    toAllowedFormat() {
        return this.format;
    }
}
exports.XmlFormat = XmlFormat;

//# sourceMappingURL=formatHelper.js.map
