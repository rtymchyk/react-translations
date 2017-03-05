import React from 'react';
import { shallow } from 'enzyme';
import LocalizedString from '../src/LocalizedString';
import { setMessages } from '../src/translator';
import * as Gettext from '../src/gettext';

describe('LocalizedString', () => {
  const defaultLocale = 'en-US';

  function render(props, locale = defaultLocale) {
    return shallow(<LocalizedString {...props} />, { context: { locale } });
  }

  beforeEach(() => {
    setMessages({});
    Gettext._ = sinon.spy(Gettext._);
    Gettext._n = sinon.spy(Gettext._n);
    Gettext._c = sinon.spy(Gettext._c);
    Gettext._nc = sinon.spy(Gettext._nc);

    Gettext._.reset();
    Gettext._n.reset();
    Gettext._c.reset();
    Gettext._nc.reset();
  });

  it('invokes gettext as singular', () => {
    render({ id: 'Hello' });

    expect(Gettext._.calledWith('Hello')).to.equal(true);
  });

  it('invokes gettext as plural', () => {
    render({ id: 'One', idPlural: 'Many', count: 5 });

    expect(Gettext._n.calledWith('One', 'Many', 5)).to.equal(true);
  });

  it('invokes gettext as singular with context', () => {
    render({ id: 'Hello', context: 'Context' });

    expect(Gettext._c.calledWith('Hello', 'Context')).to.equal(true);
  });

  it('invokes gettext as plural with context', () => {
    render({ id: 'One', idPlural: 'Many', count: 5, context: 'Context' });

    expect(Gettext._nc.calledWith('One', 'Many', 5, 'Context')).to.equal(true);
  });

  it('invokes shortform prop with locale', () => {
    const i18nStub = sinon.spy(Gettext._('Hello'));
    render({ i18n: i18nStub });

    expect(i18nStub.calledWith(defaultLocale)).to.equal(true);
  });

  it('ignores other props if given shortform', () => {
    const i18nStub = sinon.spy(Gettext._('Hello'));
    render({ i18n: i18nStub, id: 'One', idPlural: 'Many' });

    expect(i18nStub.calledWith(defaultLocale)).to.equal(true);
    expect(Gettext._n.calledWith('Hello', 'Many')).to.equal(false);
  });

  it('formats regular placeholders', () => {
    const output = render({ id: 'Hello {name}', name: 'Bob' });
    expect(output.containsAllMatchingElements(['Hello Bob'])).to.equal(true);
  });

  it('formats react placeholders', () => {
    const output = render({ id: 'Hello {name}', name: <span>Bob</span> });

    expect(output.containsAllMatchingElements(['Hello ', <span>Bob</span>]))
      .to.equal(true);
  });

  it('formats both types of placeholders', () => {
    const output = render({
      id: 'Hello {name}, are you {age}?',
      name: <span>Bob</span>,
      age: '10',
    });

    expect(output.containsAllMatchingElements([
      'Hello ',
      <span>Bob</span>,
      ', are you 10?',
    ])).to.equal(true);
  });

  it('throws error if missing an id or i18n prop', () => {
    try {
      render();
      fail();
    } catch (e) {
      expect(e.message).to.equal('LocalizedString is missing an id and an i18n prop!');
    }
  });
});
