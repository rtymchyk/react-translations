import React from 'react'
import { formatString, formatReactString } from '../src/formatter'

describe('formatter', () => {
  describe('#formatString', () => {
    it('is no-op for string without placeholders', () => {
      expect(formatString('Hello')).toEqual('Hello')
    })

    it('is no-op for no placeholder values provided', () => {
      expect(formatString('Hello {name}')).toEqual('Hello {name}')
    })

    it('is no-op for placeholder values not appearing in string', () => {
      expect(formatString('Hello {name}', { nameTwo: 'Bob' })).toEqual('Hello {name}')
    })

    it('formats 1 placeholder appearing once', () => {
      expect(formatString('Hello {name}', { name: 'Bob' })).toEqual('Hello Bob')
    })

    it('formats 1 placeholder appearing multiple times', () => {
      expect(formatString('Hello {name}, are you {name}?', { name: 'Bob' })).toEqual(
        'Hello Bob, are you Bob?')
    })

    it('formats multiple placeholders appearing once', () => {
      expect(formatString('Hello {name}, is that {nameTwo}?', {
        name: 'Bob', nameTwo: 'Joe'
      })).toEqual('Hello Bob, is that Joe?')
    })

    it('formats multiple placeholders appearing multiple times', () => {
      expect(formatString('{name}? {name}! Is that {nameTwo}? Oh it is {nameTwo}!',
        { name: 'Bob', nameTwo: 'Joe' })).toEqual(
          'Bob? Bob! Is that Joe? Oh it is Joe!')
    })

    it('ignores some falsy placeholders', () => {
      expect(formatString('{name}, items are: {one}, {two}, {three}', {
        name: 'Bob',
        one: null,
        two: undefined,
        three: false,
      })).toEqual('Bob, items are: {one}, {two}, {three}')
    })

    it('permits 0 as a valid placeholder', () => {
      expect(formatString('You got {numItems} items!', { numItems: 0 })).toEqual(
        'You got 0 items!')
    })

    it('permits emoji as a valid placeholder', () => {
      expect(formatString('Nice {emoji}!', { emoji: '🚗' })).toEqual('Nice 🚗!')
    })

    it('coerces Number placeholder into String', () => {
      expect(formatString('You got {numItems} items!', { numItems: 5 })).toEqual(
        'You got 5 items!')
    })

    it('permits $ as part of placeholder', () => {
      expect(formatString('You have {amount} in the wallet', { amount: 'US$0' }))
        .toEqual('You have US$0 in the wallet')
    })

    it('ignores React placeholder values', () => {
      expect(formatString('{name} has {amount} in the wallet', {
        name: 'Bob',
        amount: <span>{'US$0'}</span>,
      })).toEqual('Bob has {amount} in the wallet')
    })
  })

  describe('#formatReactString', () => {
    it('is no-op for string without placeholders', () => {
      expect(formatReactString('Hello').props.children).toEqual(['Hello'])
    })

    it('is no-op for no placeholder values provided', () => {
      const result = formatReactString('Hello {name}')

      expect(result.props.children).toEqual([
        'Hello ',
        '{name}',
      ])
    })

    it('is no-op for placeholder values not appearing in string', () => {
      const result = formatReactString('Hello {name}', '', {
        nameTwo: <span>Bob</span>,
      })

      expect(result.props.children).toEqual([
        'Hello ',
        '{name}',
      ])
    })

    it('formats 1 placeholder appearing once', () => {
      const result = formatReactString('Hello {name}', '',
        { name: <span>Bob</span> })

      expect(result.props.children).toEqual([
        'Hello ',
        <span>Bob</span>,
      ])
    })

    it('formats 1 placeholder appearing multiple times', () => {
      const result = formatReactString('Hello {name}, are you {name}?', '', {
        name: <span>Bob</span>,
      })

      expect(result.props.children).toEqual([
        'Hello ',
        <span>Bob</span>,
        ', are you ',
        <span>Bob</span>,
        '?',
      ])
    })

    it('formats multiple placeholders appearing once', () => {
      const result = formatReactString('Hello {name}, is that {nameTwo}?', '', {
        name: <span>Bob</span>,
        nameTwo: <span>Joe</span>,
      })

      expect(result.props.children).toEqual([
        'Hello ',
        <span>Bob</span>,
        ', is that ',
        <span>Joe</span>,
        '?',
      ])
    })

    it('formats multiple placeholders appearing multiple times', () => {
      const result = formatReactString('{name}? {name}! Is that {nameTwo}? Oh {nameTwo}!', '', {
        name: <span>Bob</span>,
        nameTwo: <span>Joe</span>,
      })

      expect(result.props.children).toEqual([
        <span>Bob</span>,
        '? ',
        <span>Bob</span>,
        '! Is that ',
        <span>Joe</span>,
        '? Oh ',
        <span>Joe</span>,
        '!',
      ])
    })

    it('ignores non-React placeholders', () => {
      const result = formatReactString('Hello {name} and {nameTwo}', '', {
        name: 'Bob',
        nameTwo: <span>Joe</span>,
      })

      expect(result.props.children).toEqual([
        'Hello ',
        '{name}',
        ' and ',
        <span>Joe</span>,
      ])
    })

    it('permits functions that evaluate to React elements', () => {
      const result = formatReactString('{name} & {name}', '', {
        name: index => <span key={index}>Bob</span>,
      })

      expect(result.props.children).toEqual([
        <span key={0}>Bob</span>,
        ' & ',
        <span key={2}>Bob</span>,
      ])
    })

    it('ignores functions that do not evaluate to React elements', () => {
      const result = formatReactString('{name} & {name}', '', {
        name: () => 'Hello',
      })

      expect(result.props.children).toEqual(['{name}', ' & ', '{name}'])
    })

    it('renders in a span container with localized-string class', () => {
      const result = formatReactString('Hello')

      expect(result.type).toEqual('span')
      expect(result.props.className).toMatch('localized-string')
    })

    it('renders additional class on the span container', () => {
      const result = formatReactString('Hello', 'some-class')

      expect(result.type).toEqual('span')
      expect(result.props.className).toEqual('localized-string some-class')
    })
  })
})
