// tslint:disable:no-console
import { JsonFormatter, Requester, RequestResponse } from '../../lib/';

// Result as default JSON
const requester = new Requester('node-duckduckgo-example');
requester.request('bart simpsons', (err: any, response: RequestResponse, body: any) => {
  if (err) {
    console.log(err);
    return;
  }
  // tslint:disable-next-line:no-console
  console.log(body);
});

requester.request('simpsons')
  .on('data', (data: Buffer) => {
    console.log(data.toString());
  })
  .on('error', (err: any) => {
    console.log(err);
  });

// pretty JSON
const formatter = requester.formatter;
const jsonFormatter = formatter as JsonFormatter;
jsonFormatter.pretty = 1;
requester.request('simpsons', (err: any, response: RequestResponse, body: any) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});

// pretty JSON, no_html and no no_redirect
requester.no_html = 1;
requester.no_redirect = 1;
requester.request('simpsons', (err: any, response: RequestResponse, body: any) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});
