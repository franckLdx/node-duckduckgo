import { Requester, JsonFormatter } from "../../lib//index";

// Result as default JSON
const requester = new Requester();
requester.request("simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});

requester.request("simpsons")
  .on("data", (data) => {
    console.log(data.toString());
  })
  .on("error", (err) => {
    console.log(err);
  });

// pretty JSON
const formatter = requester.formatter;
const jsonFormatter = formatter as JsonFormatter;
jsonFormatter.pretty = 1;
requester.request("simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});

// pretty JSON, no_html and no no_redirect
requester.no_html = 1;
requester.no_redirect = 1;
requester.request("simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});
