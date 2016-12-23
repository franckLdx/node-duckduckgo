import { allowedFormat, getFormatter, IFormater } from "./formatHelper";
import { getBuilder } from "./queryBuilder";
import { OptionHelper, allowedOptionValue } from "./optionHelper";

export class Requester {
  private baseUrl = "http://api.duckduckgo.com/";
  private formater = getFormatter("json");
  private noRedirect = new OptionHelper("no_redirect");
  private noHtml = new OptionHelper("no_html");
  private skipDisambig = new OptionHelper("skip_disambig");

  set format(format: allowedFormat) {
    this.formater = getFormatter(format);
  }

  set no_redirect(value: allowedOptionValue) {
    this.noRedirect.option = value;
  }

  set no_html(value: allowedOptionValue) {
    this.noHtml.option = value;
  }

  set skip_disambig(value: allowedOptionValue) {
    this.skipDisambig.option = value;
  }

  request(request: string) {
    const builder: any = getBuilder();
    builder.q(request);
    this.formater.buildQueryParam(builder);
    this.buildQueryOptions(builder);
    const uri = builder.toString();
    console.log("**********************", uri);
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
r.request("yellow stone");
