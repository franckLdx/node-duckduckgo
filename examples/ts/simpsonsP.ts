// tslint:disable:no-console
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

get();
