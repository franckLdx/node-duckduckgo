import * as qsb from "query-string-builder";

export function getBuilder(): any {
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
};
