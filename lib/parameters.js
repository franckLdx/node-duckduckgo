"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:no-console
const wrongValueError = (userKey, userValue) => new Error(`Unexpected value for parameter ${userKey}: ${userValue}`);
const appNameMapper = (userKey, userValue) => {
    if (typeof userValue !== 'string' || !userValue || userValue.trim().length === 0) {
        throw wrongValueError(userKey, userValue);
    }
    return [userKey, userValue];
};
const accptedFormat = ['json', 'xml'];
const formatMapper = (userKey, userValue) => {
    if (!accptedFormat.includes(userValue)) {
        throw wrongValueError(userKey, userValue);
    }
    return ['format', userValue];
};
const parentalFilter = {
    Activated: 1,
    Moderate: -1,
    Deactivated: -2
};
const parentalFilterMapper = (userKey, userValue) => {
    const actualValue = parentalFilter[userValue];
    if (actualValue === undefined) {
        throw wrongValueError(userKey, userValue);
    }
    return ['kp', actualValue];
};
const booleanMapperHOF = (actualKey) => {
    return (userKey, userValue) => {
        if (userValue !== true && userValue !== false) {
            throw wrongValueError(userKey, userValue);
        }
        return [actualKey, Number(userValue)];
    };
};
const mappers = {
    appName: appNameMapper,
    format: formatMapper,
    parentalFilter: parentalFilterMapper,
    noRedirect: booleanMapperHOF('no_redirect'),
    noHtml: booleanMapperHOF('no_html'),
    skipDisambig: booleanMapperHOF('skip_disambig')
};
function mapParameters(userKey, userValue) {
    const mapper = mappers[userKey];
    if (!mapper) {
        throw new Error(`Unexpected parameter key: ${userKey}`);
    }
    return mapper(userKey, userValue);
}
exports.mapParameters = mapParameters;
//# sourceMappingURL=parameters.js.map