import React from 'react';
import { shallow } from 'enzyme';
import Message from '../src/Message';
import { setMessages } from '../src/translator';
import * as Gettext from '../src/gettext';

describe('Message', () => {
  const defaultLocale = 'en-US';

  function render(props, locale = defaultLocale) {
    return shallow(<Message {...props} />, { context: { locale } });
  }

  beforeEach(() => {
    setMessages({});
    Gettext._ = jest.fn(Gettext._);
    Gettext._n = jest.fn(Gettext._n);
    Gettext._c = jest.fn(Gettext._c);
    Gettext._nc = jest.fn(Gettext._nc);
  });

  it('invokes gettext as singular', () => {
    render({ id: 'Hello' });

    expect(Gettext._).toHaveBeenCalledWith('Hello');
  });

  it('invokes gettext as plural', () => {
    render({ id: 'One', idPlural: 'Many', count: 5 });

    expect(Gettext._n).toHaveBeenCalledWith('One', 'Many', 5);
  });

  it('invokes gettext as singular with context', () => {
    render({ id: 'Hello', context: 'Context' });

    expect(Gettext._c).toHaveBeenCalledWith('Hello', 'Context');
  });

  it('invokes gettext as plural with context', () => {
    render({ id: 'One', idPlural: 'Many', count: 5, context: 'Context' });

    expect(Gettext._nc).toHaveBeenCalledWith('One', 'Many', 5, 'Context');
  });

  it('invokes shortform prop with locale', () => {
    const i18n = jest.fn(locale => locale);
    render({ i18n });

    expect(i18n).toHaveBeenCalledWith(defaultLocale);
  });

  it('ignores other props if given shortform', () => {
    const i18n = jest.fn(locale => locale);
    render({ i18n, id: 'One', idPlural: 'Many' });

    expect(i18n).toHaveBeenCalledWith(defaultLocale);
  });

  it('formats regular placeholders', () => {
    const output = render({ id: 'Hello {name}', name: 'Bob' });
    expect(output.text()).toBe('Hello Bob');
    expect(output.containsAllMatchingElements(['Hello Bob'])).toBe(true);
  });

  it('formats react placeholders', () => {
    const output = render({ id: 'Hello {name}', name: <span key="1">Bob</span> });

    expect(output.text()).toBe('Hello Bob');
    expect(output.containsAllMatchingElements(['Hello ', <span>Bob</span>]))
      .toBe(true);
  });

  it('formats both types of placeholders', () => {
    const output = render({
      id: 'Hello {name}, are you {age}?',
      name: <span>Bob</span>,
      age: '10',
    });

    expect(output.text()).toBe('Hello Bob, are you 10?');
    expect(output.containsAllMatchingElements([
      'Hello ',
      <span>Bob</span>,
      ', are you 10?',
    ])).toEqual(true);
  });

  it('throws error if missing an id or i18n prop', () => {
    expect(() => {
      render();
    }).toThrow('Message has neither id nor i18n as a prop!');
  });
});
