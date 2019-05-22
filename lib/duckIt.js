"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const parameters_1 = require("./parameters");
const base_url = 'https://api.duckduckgo.com/';
async function duckIt(searchQuery, searchOption = {}) {
    const queryString = makeQueryString(searchQuery, searchOption);
    return axios_1.default.get(base_url, {
        params: queryString
    });
}
exports.duckIt = duckIt;
const defaultSearchOption = {
    appName: 'node-duckduckgo',
    format: 'json'
};
const booleanParameters = {
    noRedirect: 'no_redirect',
    noHtml: 'no_html',
    skipDisambig: 'skip_disambig'
};
function makeQueryString(searchQuery, userOption) {
    const option = { ...defaultSearchOption, ...userOption };
    return Object.entries(option).reduce((acc, [userKey, userValue]) => {
        const [actualKey, actualValue] = parameters_1.mapParameters(userKey, userValue);
        acc[actualKey] = actualValue;
        return acc;
    }, { q: searchQuery });
}
//# sourceMappingURL=duckIt.js.map