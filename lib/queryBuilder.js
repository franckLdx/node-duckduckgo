"use strict";
const qsb = require("query-string-builder");
function getBuilder() {
    return new qsb({
        "q": {
            "method": "set"
        },
        "format": {
            "method": "set",
        },
        "pretty": {
            "method": "set",
        },
        "no_redirect": {
            "method": "set",
        },
        "no_html": {
            "method": "set",
        },
        "skip_disambig": {
            "method": "set",
        },
    });
}
exports.getBuilder = getBuilder;
;

//# sourceMappingURL=queryBuilder.js.map
