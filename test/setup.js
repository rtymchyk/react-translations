import { jsdom } from 'jsdom'
import assert from 'assert';

jsdom.env('<!doctype html><html><body></body></html>', (err, window) => {
  assert(err === null);
  global.window = window;
  global.document = window.document;
});
