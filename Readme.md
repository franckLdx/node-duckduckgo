Yet another node lib for requesting [Duck Duck Go](https://duckduckgo.com/).

This one has been written in typescript (2.x or above) and can be used by javascript (es6 or above) software or by typescript software.

## Examples
* TypeScript:
```javascript
import { Requester } from '../../lib/';

// Result as default JSON
async function get() {
  try {
    const requester = new Requester('node-duckduckgo-example');
    const response = await requester.requestP('bart simpsons');
    console.log(response.toJSON());
  } catch (err) {
    console.error('oups', err);
  }
}
```
* Javascript:
```javascript
const { Requester } = require('../../lib/');

async function get() {
  try {
    const requester = new Requester('node-duckduckgo-example');
    const response = await requester.requestP('bart simpsons');
    console.log(response.toJSON());
  } catch (err) {
    console.error('oups', err);
  }
}
```

You can also use "old style" with callback:
* TypeScript:
```javascript
import { Requester } from "node-duckduckgo";
const requester = new Requester("node-duckduckgo-example");
requester.request("bart simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});
```
* Javascript:
```javascript
const { Requester } = require("node-duckduckgo");
const requester = new Requester("node-duckduckgo-example");
requester.request("bart simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});
```

## API
* The requester object takes an application name in parameter:
```javascript
const requester = new Requester(<YOUR APP NAME>);
```

* If needed, configure the requester options:
```javascript
requester.no_html = 1;
requester.no_redirect = 1;
```
(for information about this options see [Duck Duck GO API documentation](https://api.duckduckgo.com/api)

* Execute your request and get your result
This lib is backed by [Request](https://www.npmjs.com/package/request). Results can be got by either by async call, callback or by stream:
 ```javascript
 async function get() {
  try {
    const requester = new Requester('node-duckduckgo-example');
    const response = await requester.requestP('bart simpsons');
    console.log(response.toJSON());
  } catch (err) {
    console.error('oups', err);
  }
}
```

 ```javascript
requester.request("bart simpsons", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body);
});
```

```javascript
requester.request("bart simpsons")
  .on("data", (data) => {
    console.log(data.toString());
  })
  .on("error", (err) => {
    console.log(err);
  });
```
Response format is the [Duck Duck GO response](https://api.duckduckgo.com/api)

## Usage
node-duckduckgo is open sources (MIT license) but it doe grant you to use Duck Duck Go. [Please read this page](https://api.duckduckgo.com/api) before any usage.
