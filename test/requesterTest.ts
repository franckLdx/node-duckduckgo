import * as mocha from "mocha";
import * as chai from "chai";
const should = chai.should();

import { Requester } from "../lib/index";
import { JsonFormatter, XmlFormatter } from "../lib/formatHelper";

describe("Requester test", function() {
  describe("Format test", function() {
    it("Default format, format should be json without pretty", function() {
      const requester = new Requester();
      requester.format.should.be.deep.equal("json");
      const formatter = requester.formatter;
      formatter.getFormat().should.be.deep.equal("json");
      const jsonFormatter = formatter as JsonFormatter;
      should.not.exist(jsonFormatter.pretty);
    });

    it("Set JSON format, format should be json without pretty", function() {
      const requester = new Requester();
      requester.format.should.be.deep.equal("json");
      const formatter = requester.formatter;
      formatter.getFormat().should.be.deep.equal("json");
      const jsonFormatter = formatter as JsonFormatter;
      should.not.exist(jsonFormatter.pretty);
    });

    it("Using JSON format, set pretty to 0", function() {
      const requester = new Requester();
      requester.format.should.be.deep.equal("json");
      const formatter = requester.formatter;
      const jsonFormatter = formatter as JsonFormatter;
      jsonFormatter.pretty = 0;
      jsonFormatter.pretty.should.be.deep.equal(0);
    });

    it("Using JSON format, set pretty to 1", function() {
      const requester = new Requester();
      requester.format.should.be.deep.equal("json");
      const formatter = requester.formatter;
      const jsonFormatter = formatter as JsonFormatter;
      jsonFormatter.pretty = 1;
      jsonFormatter.pretty.should.be.deep.equal(1);
    });

    it("Set XML format, should be XML", function() {
      const requester = new Requester();
      requester.format = "xml";
      requester.formatter.getFormat().should.be.deep.equal("xml");
    });

  });

  describe("No_redirect test", function() {
    it("Default format, redirect should be undefined", function() {
      const requester = new Requester();
      should.not.exist(requester.no_redirect);
    });

    it("Set no_redirect to 0, this option should be 0", function() {
      const requester = new Requester();
      requester.no_redirect = 0;
      requester.no_redirect.should.be.deep.equal(0);
    });

    it("Set no_redirect to 1, this option should be 1", function() {
      const requester = new Requester();
      requester.no_redirect = 1;
      requester.no_redirect.should.be.deep.equal(1);
    });
  });

  describe("no_html test", function() {
    it("Default format, format should be undefined", function() {
      const requester = new Requester();
      should.not.exist(requester.no_html);
    });

    it("Set no_html to 0, this option should be 0", function() {
      const requester = new Requester();
      requester.no_html = 0;
      requester.no_html.should.be.deep.equal(0);
    });

    it("Set no_html to 1, this option should be 1", function() {
      const requester = new Requester();
      requester.no_html = 1;
      requester.no_html.should.be.deep.equal(1);
    });
  });

  describe("skip_disambig test", function() {
    it("Default format, format should be undefined", function() {
      const requester = new Requester();
      should.not.exist(requester.skip_disambig);
    });

    it("Set skip_disambig to 0, this option should be 0", function() {
      const requester = new Requester();
      requester.skip_disambig = 0;
      requester.skip_disambig.should.be.deep.equal(0);
    });

    it("Set skip_disambig to 1, this option should be 1", function() {
      const requester = new Requester();
      requester.skip_disambig = 1;
      requester.skip_disambig.should.be.deep.equal(1);
    });
  });
});
