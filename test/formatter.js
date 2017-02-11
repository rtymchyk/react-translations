import React from 'react';
import { formatString, formatReactString } from '../src/formatter';
import chai from 'chai';

const expect = chai.expect;

describe('formatString', () => {
  it('is no-op for string without placeholders', () => {
    expect(formatString('Hello')).to.equal('Hello');
  });

  it('is no-op for no placeholders', () => {
    expect(formatString('Hello {name}')).to.equal('Hello {name}');
  });

  it('is no-op for placeholder not appearing', () => {
    expect(formatString('Hello {name}', { nameTwo: 'Bob' })).to.equal('Hello {name}');
  });

  it('formats 1 placeholder appearing once', () => {
    expect(formatString('Hello {name}', { name: 'Bob' })).to.equal('Hello Bob');
  });

  it('formats 1 placeholder appearing multiple times', () => {
    expect(formatString('Hello {name}, are you {name}?', { name: 'Bob' })).to.equal(
      'Hello Bob, are you Bob?');
  });

  it('formats multiple placeholders appearing once', () => {
    expect(formatString('Hello {name}, is that {nameTwo}?', {
      name: 'Bob', nameTwo: 'Joe'
    })).to.equal('Hello Bob, is that Joe?');
  });

  it('formats multiple placeholders appearing multiple times', () => {
    expect(formatString('{name}? {name}! Is that {nameTwo}? Oh it is {nameTwo}!',
      { name: 'Bob', nameTwo: 'Joe' })).to.equal(
        'Bob? Bob! Is that Joe? Oh it is Joe!');
  });

  it('ignores some falsy placeholders', () => {
    expect(formatString('{name}, items are: {one}, {two}, {three}', {
      name: 'Bob',
      one: null,
      two: undefined,
      three: false,
    })).to.equal('Bob, items are: {one}, {two}, {three}');
  });

  it('allows 0 as a valid placeholder', () => {
    expect(formatString('You got {numItems} items!', { numItems: 0 })).to.equal(
      'You got 0 items!')
  });

  it('allows emoji as a valid placeholder', () => {
    expect(formatString('Nice {emoji}!', { emoji: '🚗' })).to.equal('Nice 🚗!');
  });

  it('coerces Number placeholder into String', () => {
    expect(formatString('You got {numItems} items!', { numItems: 5 })).to.equal(
      'You got 5 items!');
  });

  it('allows $ as part of placeholder', () => {
    expect(formatString('You have {amount} in the wallet', { amount: 'US$0' }))
      .to.equal('You have US$0 in the wallet');
  });

  it('filters out React placeholders', () => {
    expect(formatString('{name} has {amount} in the wallet', {
      name: 'Bob',
      amount: <span>{'US$0'}</span>,
    })).to.equal('Bob has {amount} in the wallet');
  });
});

describe('formatReactString', () => {
  it('is no-op for string without placeholders', () => {
    expect(formatReactString('Hello').props.children).to.deep.equal(['Hello']);
  });

  it('is no-op for no placeholders', () => {
    const result = formatReactString('Hello {name}');

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      'Hello ',
      '{name}',
    ]);
  });

  it('is no-op for placeholder not appearing', () => {
    const result = formatReactString('Hello {name}', {
      nameTwo: <span>Bob</span>,
    });

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      'Hello ',
      '{name}',
    ]);
  });

  it('formats 1 placeholder appearing once', () => {
    const result = formatReactString('Hello {name}', { name: <span>Bob</span> });

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      'Hello ',
      <span>Bob</span>,
    ]);
  });

  it('formats 1 placeholder appearing multiple times', () => {
    const result = formatReactString('Hello {name}, are you {name}?', {
      name: <span>Bob</span>,
    });

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      'Hello ',
      <span>Bob</span>,
      ', are you ',
      <span>Bob</span>,
      '?',
    ]);
  });

  it('formats multiple placeholders appearing once', () => {
    const result = formatReactString('Hello {name}, is that {nameTwo}?', {
      name: <span>Bob</span>,
      nameTwo: <span>Joe</span>,
    });

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      'Hello ',
      <span>Bob</span>,
      ', is that ',
      <span>Joe</span>,
      '?',
    ]);
  });

  it('formats multiple placeholders appearing multiple times', () => {
    const result = formatReactString('{name}? {name}! Is that {nameTwo}? Oh {nameTwo}!', {
      name: <span>Bob</span>,
      nameTwo: <span>Joe</span>,
    });

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      <span>Bob</span>,
      '? ',
      <span>Bob</span>,
      '! Is that ',
      <span>Joe</span>,
      '? Oh ',
      <span>Joe</span>,
      '!',
    ]);
  });

  it('ignores out non-React placeholders', () => {
    const result = formatReactString('Hello {name} and {nameTwo}', {
      name: 'Bob',
      nameTwo: <span>Joe</span>,
    });

    expect(result.type).to.equal('span');
    expect(result.props.children).to.deep.equal([
      'Hello ',
      '{name}',
      ' and ',
      <span>Joe</span>,
    ]);
  });
});
