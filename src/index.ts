import { allowedFormat, getFormatter, IFormater, JsonFormat } from "./formatHelper";
import { getBuilder } from "./queryBuilder";
import { OptionHelper, optionType } from "./optionHelper";
import  * as request from "request";

export class Requester {
  private baseUrl = "http://api.duckduckgo.com/";
  private formater = getFormatter("json");
  private noRedirect = new OptionHelper("no_redirect");
  private noHtml = new OptionHelper("no_html");
  private skipDisambig = new OptionHelper("skip_disambig");

  set format(format: allowedFormat) {
    this.formater = getFormatter(format);
  }

  set no_redirect(value: optionType) {
    this.noRedirect.option = value;
  }

  set no_html(value: optionType) {
    this.noHtml.option = value;
  }

  set skip_disambig(value: optionType) {
    this.skipDisambig.option = value;
  }

  request(search: string) {
    const foo: JsonFormat = this.formater as JsonFormat;
    foo.pretty = 1;
    const builder: any = getBuilder();
    builder.q(search);
    this.formater.buildQueryParam(builder);
    this.buildQueryOptions(builder);
    const queryString = builder.toString();
    console.log("*******", queryString);
    return request(`${this.baseUrl}?${queryString}`);
  }

  private buildQueryOptions(builder: any) {
    this.noRedirect.buildQueryParam(builder);
    this.noHtml.buildQueryParam(builder);
    this.skipDisambig.buildQueryParam(builder);
  }
}

const r = new Requester();
r.request("typsecript");
r.request("yellow stone");
r.skip_disambig = 1;
r.no_redirect = 1;
r.no_html = 0;
r.request("yellow stone").on("data", (data) => {
  console.log("Data", data.toString());
});
