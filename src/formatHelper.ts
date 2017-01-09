
import { OptionHelper, optionType } from "./optionHelper";
export type allowedFormat = "json"|"xml";

export interface IFormatter {
  buildQueryParam(builder: any): void;
  getFormat(): allowedFormat;
}

export function getFormatter(format: allowedFormat): IFormatter {
  switch (format) {
    case "json":
      return new JsonFormatter();
    case "xml":
      return new XmlFormatter();
  }
}

export class JsonFormatter implements IFormatter {
  private readonly format: allowedFormat = "json";
  private prettify: OptionHelper = new OptionHelper("pretty");

  set pretty(pretty: optionType) {
    this.prettify.option = pretty;
  }

  get pretty() {
    return this.prettify.option;
  }

  buildQueryParam(builder: any) {
    builder.format(this.format);
    this.prettify.buildQueryParam(builder);
  }

  getFormat() { return this.format; }
}

export class XmlFormatter implements IFormatter {
  private readonly format: allowedFormat = "xml";

  buildQueryParam(builder: any) {
    builder.format(this.format);
  }

  getFormat() { return this.format; }
}
