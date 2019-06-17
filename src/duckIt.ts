import axios from 'axios';
import { mapParameters } from './parameters';

const base_url = 'https://api.duckduckgo.com/';

export type ParentalFilter = 'Activated' | 'Moderate' | 'Deactivated';
export type Format = 'json' | 'xml';

export interface SearchOption {
  appName?: string;
  format?: Format;
  noRedirect?: boolean;
  noHtml?: boolean;
  skipDisambig?: boolean;
  parentalFilter?: ParentalFilter;
}

export async function duckIt(searchQuery: string, searchOption: SearchOption = {}) {
  const queryString = makeQueryString(searchQuery, searchOption);
  return axios.get(base_url, {
    params: queryString
  });
}

const defaultSearchOption: SearchOption = {
  appName: 'node-duckduckgo',
  format: 'json'
};

function makeQueryString(searchQuery: string, userOption: SearchOption) {
  const option = { ...defaultSearchOption, ...userOption };
  return Object.entries(option).reduce(
    (acc: any, [userKey, userValue]: [string, any]) => {
      const [actualKey, actualValue] = mapParameters(userKey, userValue);
      acc[actualKey] = actualValue;
      return acc;
    },
    { q: searchQuery }
  );
}
