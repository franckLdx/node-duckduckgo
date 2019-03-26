// tslint:no-console
const wrongValueError = (userKey: string, userValue: any) => new Error(`Unexpected value for parameter ${userKey}: ${userValue}`);

type Mapper = (userKey: string, userValue: any) => [string, string | number];

const appNameMapper: Mapper = (userKey: string, userValue: any) => {
  if (typeof userValue !== 'string' || !userValue || userValue.trim().length === 0) {
    throw wrongValueError(userKey, userValue);
  }
  return [userKey, userValue];
};

const accptedFormat = ['json', 'xml'];
const formatMapper: Mapper = (userKey: string, userValue: any) => {
  if (!accptedFormat.includes(userValue)) {
    throw wrongValueError(userKey, userValue);
  }
  return ['format', userValue];
};

const parentalFilter: Record<string, number> = {
  Activated: 1,
  Moderate: -1,
  Deactivated: -2
};
const parentalFilterMapper: Mapper = (userKey: string, userValue: any) => {
  const actualValue = parentalFilter[userValue];
  if (actualValue === undefined) {
    throw wrongValueError(userKey, userValue);
  }
  return ['kp', actualValue];
};

const booleanMapperHOF = (actualKey: string): Mapper => {
  return (userKey: string, userValue: any) => {
    if (userValue !== true && userValue !== false) {
      throw wrongValueError(userKey, userValue);
    }
    return [actualKey, Number(userValue)];
  };
};

const mappers: Record<string, Mapper> = {
  appName: appNameMapper,
  format: formatMapper,
  parentalFilter: parentalFilterMapper,
  noRedirect: booleanMapperHOF('no_redirect'),
  noHtml: booleanMapperHOF('no_html'),
  skipDisambig: booleanMapperHOF('skip_disambig')
};

export function mapParameters(userKey: string, userValue: any) {
  const mapper = mappers[userKey];
  if (!mapper) {
    throw new Error(`Unexpected parameter key: ${userKey}`);
  }
  return mapper(userKey, userValue);
}
