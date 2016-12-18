export type allowedFormat = "json"|"xml";

export interface IFormater {
  getFormatQueryParam(): string;
  toAllowedFormat(): allowedFormat;
}

export function getFormatter(format: allowedFormat): IFormater {
  switch (format) {
    case "json":
      return new JsonFormat();
    case "xml":
      return new XmlFormat();
  }
}

export class JsonFormat implements IFormater {
  private readonly format: allowedFormat = "json";
  private prettifyResult = 0 | 1;

  getFormatQueryParam() {
    return `$format&pretty=1`;
  }

  set pretty(pretty: 0 | 1) {
    this.prettifyResult = pretty;
  }

  toAllowedFormat() {
    return this.format;
  }
}


export class XmlFormat implements IFormater {
  private readonly format: allowedFormat = "xml";

  getFormatQueryParam() {
    return `$format`;
  }

  toAllowedFormat() {
    return this.format;
  }
}
