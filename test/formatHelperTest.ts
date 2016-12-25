import * as mocha from "mocha";
import * as chai from "chai";
chai.should();

import { getBuilder } from "../lib/queryBuilder";
import * as formatHelper from "../lib/formatHelper";

describe("Formater test", function() {
  function testFormat(format: formatHelper.allowedFormat, expected: string) {
    const builder = getBuilder();
    const formatter = formatHelper.getFormatter(format);
    formatter.buildQueryParam(builder);
    const actual = builder.toString();
    actual.should.be.deep.equal(expected);
  }

  it("Json only: should be format=json", function() {
    const builder = getBuilder();
    const formatter = formatHelper.getFormatter("json");
    formatter.buildQueryParam(builder);
    const actual = builder.toString();
    actual.should.be.deep.equal("format=json");
  });

  it("Json with not pretty: should be format=json&pretty=0", function() {
    const builder = getBuilder();
    const formatter = formatHelper.getFormatter("json");
    const jsonFormatter = formatter as formatHelper.JsonFormat;
    jsonFormatter.pretty = 0;
    formatter.buildQueryParam(builder);
    const actual = builder.toString();
    actual.should.be.deep.equal("format=json&pretty=0");
  });

  it("Json with pretty: should be format=json&pretty=1", function() {
    const builder = getBuilder();
    const formatter = formatHelper.getFormatter("json");
    const jsonFormatter = formatter as formatHelper.JsonFormat;
    jsonFormatter.pretty = 1;
    formatter.buildQueryParam(builder);
    const actual = builder.toString();
    actual.should.be.deep.equal("format=json&pretty=1");
  });

  it("XML: should be format=xml", function() {
    const builder = getBuilder();
    const formatter = formatHelper.getFormatter("xml");
    formatter.buildQueryParam(builder);
    const actual = builder.toString();
    actual.should.be.deep.equal("format=xml");
  });

});
