import { allowedFormat, getFormatter, IFormatter, JsonFormat } from "./formatHelper";
import { getBuilder } from "./queryBuilder";
import { OptionHelper, optionType } from "./optionHelper";
import  * as request from "request";

export { IFormatter } from "./formatHelper";

export class Requester {
  private baseUrl = "http://api.duckduckgo.com/";
  private _formatter = getFormatter("json");
  private noRedirect = new OptionHelper("no_redirect");
  private noHtml = new OptionHelper("no_html");
  private skipDisambig = new OptionHelper("skip_disambig");

  set format(format: allowedFormat) {
    this._formatter = getFormatter(format);
  }

  get format() {
    return this._formatter.getFormat();
  }

  get formatter() {
    return this._formatter;
  }

  set no_redirect(value: optionType) {
    this.noRedirect.option = value;
  }

  get no_redirect() {
    return this.noRedirect.option;
  }

  set no_html(value: optionType) {
    this.noHtml.option = value;
  }

  get no_html() {
    return this.noHtml.option;
  }

  set skip_disambig(value: optionType) {
    this.skipDisambig.option = value;
  }

  get skip_disambig() {
    return this.skipDisambig.option;
  }

  request(search: string, callBack?: request.RequestCallback) {
    const builder: any = getBuilder();
    builder.q(search);
    this._formatter.buildQueryParam(builder);
    this.buildQueryOptions(builder);
    const queryString = builder.toString();
    return request(`${this.baseUrl}?${queryString}`, callBack);
  }

  private buildQueryOptions(builder: any) {
    this.noRedirect.buildQueryParam(builder);
    this.noHtml.buildQueryParam(builder);
    this.skipDisambig.buildQueryParam(builder);
  }
}
/*
import { parse } from "jsonstream";
const foo = parse("RelatedTopics.*.Results");
const r1 = new Requester();
r1.request("typescript").on("data", (data: Buffer) => {
  console.log("Data", data.toString());
});
/*r1.request("typescript", (err, result) => {
  console.log(result);
});*/

/*const r2 = new Requester();
r2.skip_disambig = 1;
r2.no_redirect = 1;
r2.no_html = 1;
r2.request("yellow stone").on("data", (data) => {
  console.log("*********Data", data.toString());
});*/
