// tslint:disable:no-console
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

get();
