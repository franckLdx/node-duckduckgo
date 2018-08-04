import { OptionHelper, optionType } from './optionHelper';
export type allowedFormat = 'json' | 'xml';

export interface IFormatter {

  buildQueryParam(builder: any): void;
  getFormat(): allowedFormat;
}

export function getFormatter(format: allowedFormat): IFormatter {
  switch (format) {
    case 'json':
      return new JsonFormatter();
    case 'xml':
      return new XmlFormatter();
    default:
      throw new Error(`Unsupported format ${format}`);
  }
}

export class JsonFormatter implements IFormatter {
  private readonly format: allowedFormat = 'json';
  private prettify: OptionHelper = new OptionHelper('pretty');

  set pretty(pretty: optionType) {
    this.prettify.option = pretty;
  }

  get pretty(): optionType {
    return this.prettify.option;
  }

  public buildQueryParam(builder: any) {
    builder.format(this.format);
    this.prettify.buildQueryParam(builder);
  }

  public getFormat() {
    return this.format;
  }
}

export class XmlFormatter implements IFormatter {
  private readonly format: allowedFormat = 'xml';

  public buildQueryParam(builder: any) {
    builder.format(this.format);
  }

  public getFormat() {
    return this.format;
  }
}
