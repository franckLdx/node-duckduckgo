export type allowedFormat = "json"|"xml";

export interface IQueryFormat {
  format: string;
  pretty?: number;
}

export interface IFormater {
  buildQueryParam(builder: any): void;
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
  private prettifyResult: 0 | 1 = 0;

  set pretty(pretty: 0 | 1) {
    this.prettifyResult = pretty;
  }

  buildQueryParam(builder: any) {
    builder.format(this.format);
    builder.pretty(this.prettifyResult);
  }
}

export class XmlFormat implements IFormater {
  private readonly format: allowedFormat = "xml";

  buildQueryParam(builder: any) {
    builder.format(this.format);
  }
}
