"use strict";

const { Requester } = require("../../lib/index");

const requester = new Requester("node-duckduckgo-example");
requester.request("bart simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});

requester.request("bart simpsons")
  .on("data", (data) => {
    console.log(data.toString());
  })
  .on("error", (err) => {
    console.log(err);
  });

//  Prety JSON
const formatter = requester.formatter;
formatter.pretty = 1;
requester.request("bart simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});

// pretty JSON, no_html and no no_redirect
requester.no_html = 1;
requester.no_redirect = 1;
requester.request("bart simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});
