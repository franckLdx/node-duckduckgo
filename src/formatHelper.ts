
import { OptionHelper, optionType } from "./optionHelper";
export type allowedFormat = "json"|"xml";

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
  private prettify: OptionHelper = new OptionHelper("pretty");

  set pretty(pretty: optionType) {
    this.prettify.option = pretty;
  }

  buildQueryParam(builder: any) {
    builder.format(this.format);
    this.prettify.buildQueryParam(builder);
  }
}

export class XmlFormat implements IFormater {
  private readonly format: allowedFormat = "xml";

  buildQueryParam(builder: any) {
    builder.format(this.format);
  }
}
