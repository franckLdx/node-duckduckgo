import * as mocha from "mocha";
import * as chai from "chai";
chai.should();

import * as format from "../lib/formatHelper";

describe("Formater test", function() {
  it("Json ", function() {
    const formatter = format.getFormatter("json");
    formatter.toAllowedFormat().should.be.deep.equal("json");
  });

  it("Xml ", function() {
    const formatter = format.getFormatter("xml");
    formatter.toAllowedFormat().should.be.deep.equal("xml");
  });
});
