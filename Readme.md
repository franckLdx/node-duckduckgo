Yet another node lib for requesting [Duck Duck Go](https://duckduckgo.com/).

This one has been written in typescript (2.x or above) and can be used by javascript (es2018 or above) software or by typescript software.


## Examples
```javascript
async function get() {
  try {
    const result = await duckIt('bart simpsons');
    console.log(result.data.AbstractText);
  } catch (err) {
    console.error('oups', err);
  }
}
```

## API
* duckIt uses [axios](https://github.com/axios/axios) and return an AxiosResponse:
```javascript
const result = await duckIt('bart simpsons');
```

* duckIt can be called with an options object, eahc item is optional:
  * appName: an application name, default node-duckduckgo
  * format: received format data, possible values: 'json' or 'xml', default 'json'
  * parentalFilter: parental filter activated or not, possible values 'Activated', 'Moderate' and 'Deactivated', default: 'Activated'
  * noRedirect: boolean, true to skip HTTP redirects
  * noHtml: boolean, true to remove HTML from text
  * skipDisambig: boolean, true to skip disambiguation
(for information about this options see [Duck Duck GO API documentation](https://api.duckduckgo.com/api)

example:
```javascript
const result = await duckIt('bart simpsons', { noHtml: true, parentalFilter: 'Moderate' });
```


## Usage
node-duckduckgo is open sources (MIT license) but it doe grant you to use Duck Duck Go. [Please read this page](https://api.duckduckgo.com/api) before any usage.


## 2.x
This major release offers a completly different interface than 1.x. You may continue to use 1.X but
as it won't evolve anymore, your advise to migrate to 2.X.