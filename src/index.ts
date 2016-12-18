import { allowedFormat, getFormatter, IFormater, JsonFormat } from "./formatHelper";

export class Requester {
  private baseUrl = "http://api.duckduckgo.com/";
  private formater: IFormater = new JsonFormat();

  constructor(private appName = "node-duckduckgo") {

  }

  get serverUrl() {
    return this.baseUrl;
  }

  set serverUrl(newUrl) {
    this.baseUrl = newUrl;
  }

  set format(format: allowedFormat) {
    this.formater = getFormatter(format);
  }

  get format() {
    return this.formater.toAllowedFormat();
  }

  request(request: string) {
    const uri = `${this.baseUrl}`;
  }
}
