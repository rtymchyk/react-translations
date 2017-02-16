import { jsdom } from 'jsdom'
import chai from 'chai';
import sinon from 'sinon';

global.expect = chai.expect;
global.fail = chai.assert.fail;
global.sinon = sinon;

jsdom.env('<!doctype html><html><body></body></html>', (err, window) => {
  expect(err).to.equal(null);

  global.window = window;
  global.document = window.document;
});
