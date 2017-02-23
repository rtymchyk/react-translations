import React from 'react';
import LocalizedString from '../src/LocalizedString';
import TestUtils from 'react-addons-test-utils';
import { setMessages } from '../src/translator';
import * as Gettext from '../src/gettext';

describe('LocalizedString', () => {
  function render(props, locale = 'en-US') {
    const renderer = TestUtils.createRenderer();
    renderer.render(<LocalizedString {...props}/>, { locale });

    return renderer.getRenderOutput();
  }

  beforeEach(() => {
    setMessages({});
    Gettext._ = sinon.spy(Gettext._);
    Gettext._n = sinon.spy(Gettext._n);
    Gettext._c = sinon.spy(Gettext._c);
    Gettext._nc = sinon.spy(Gettext._nc);
  });

  it('invokes gettext as singular', () => {
    const output = render({ id: 'Hello' });

    expect(Gettext._.calledWith('Hello', 'en-US')).to.equal(true);
  });

  it('invokes gettext as plural', () => {
    const output = render({ id: 'One', idPlural: 'Many', count: 5 });

    expect(Gettext._n.calledWith('One', 'Many', 5, 'en-US')).to.equal(true);
  });

  it('invokes gettext as singular with context', () => {
    const output = render({ id: 'Hello', context: 'Context' });

    expect(Gettext._c.calledWith('Hello', 'Context')).to.equal(true);
  });

  it('invokes gettext as plural with context', () => {
    const output = render({
      id: 'One', idPlural: 'Many', count: 5, context: 'Context',
    });

    expect(Gettext._nc.calledWith('One', 'Many', 5, 'Context', 'en-US'))
      .to.equal(true);
  });

  it('formats regular placeholders', () => {
    const output = render({ id: 'Hello {name}', name: 'Bob' });

    expect(output.props.children).to.deep.equal([ 'Hello Bob' ]);
  });

  it('formats react placeholders', () => {
    const output = render({ id: 'Hello {name}', name: <span>Bob</span> });

    expect(output.props.children).to.deep.equal([
      'Hello ',
      <span>Bob</span>,
    ]);
  });

  it('formats both types of placeholders', () => {
    const output = render({
      id: 'Hello {name}, are you {age}?',
      name: <span>Bob</span>,
      age: '10',
    });

    expect(output.props.children).to.deep.equal([
      'Hello ',
      <span>Bob</span>,
      ', are you 10?'
    ]);
  });

  it('throws error if missing an id prop', () => {
    try {
      const output = render();
      fail();
    } catch (e) {
      expect(e.message).to.equal('LocalizedString is missing an id prop!');
    }
  });
});
