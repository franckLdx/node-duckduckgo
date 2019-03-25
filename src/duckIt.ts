import axios from 'axios';
import { mapParameters } from './parameters';

const base_url = 'https://api.duckduckgo.com/';

export type ParentalFilter = 'Activated' | 'Moderate' | 'Deactivated';

export interface SearchOption {
  appName?: string;
  format?: string;
  noRedirect?: boolean;
  noHtml?: boolean;
  skipDisambig?: boolean;
  parentalFilter?: ParentalFilter;
}

export async function duckIt(searchQuery: string) {
  const queryString = makeQueryString(searchQuery, {});
  return axios.get(base_url, {
    params: queryString
  });
}

const defaultSearchOption: SearchOption = {
  appName: 'node-duckduckgo',
  format: 'json'
};

const booleanParameters: Record<string, string> = {
  noRedirect: 'no_redirect',
  noHtml: 'no_html',
  skipDisambig: 'skip_disambig'
};

function makeQueryString(searchQuery: string, userOption: SearchOption) {
  const option = { ...defaultSearchOption, userOption };
  return Object.entries(option).reduce(
    (acc: any, [userKey, userValue]: [string, any]) => {
      const [actualKey, actualValue] = mapParameters(userKey, userValue);
      acc[actualKey] = actualValue;
      return acc;
    },
    {}
  );
}
