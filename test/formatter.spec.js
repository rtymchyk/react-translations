/* eslint react/jsx-key:0 */
import React from 'react'
import { formatString, formatReactString } from 'formatter'

describe('formatter', () => {
  describe('#formatString', () => {
    it('is no-op for string without placeholders', () => {
      expect(formatString('Hello')).toBe('Hello')
    })

    it('is no-op for no placeholder values provided', () => {
      expect(formatString('Hello {name}')).toBe('Hello {name}')
    })

    it('is no-op for placeholder values not appearing in string', () => {
      expect(formatString('Hello {name}', { nameTwo: 'Bob' })).toBe('Hello {name}')
    })

    it('formats 1 placeholder appearing once', () => {
      expect(formatString('Hello {name}', { name: 'Bob' })).toBe('Hello Bob')
    })

    it('formats 1 placeholder appearing multiple times', () => {
      expect(formatString('Hello {name}, are you {name}?', { name: 'Bob' })).toBe(
        'Hello Bob, are you Bob?')
    })

    it('formats multiple placeholders appearing once', () => {
      expect(formatString('Hello {name}, is that {nameTwo}?', {
        name: 'Bob', nameTwo: 'Joe',
      })).toBe('Hello Bob, is that Joe?')
    })

    it('formats multiple placeholders appearing multiple times', () => {
      expect(formatString('{name}? {name}! Is that {nameTwo}? Oh it is {nameTwo}!',
        { name: 'Bob', nameTwo: 'Joe' })).toBe('Bob? Bob! Is that Joe? Oh it is Joe!')
    })

    it('ignores some falsy placeholders', () => {
      expect(formatString('{name}, items are: {one}, {two}, {three}', {
        name: 'Bob',
        one: null,
        two: undefined,
        three: false,
      })).toBe('Bob, items are: {one}, {two}, {three}')
    })

    it('permits 0 as a valid placeholder', () => {
      expect(formatString('You got {numItems} items!', { numItems: 0 })).toBe(
        'You got 0 items!')
    })

    it('permits emoji as a valid placeholder', () => {
      expect(formatString('Nice {emoji}!', { emoji: '🚗' })).toBe('Nice 🚗!')
    })

    it('coerces Number placeholder into String', () => {
      expect(formatString('You got {numItems} items!', { numItems: 5 })).toBe(
        'You got 5 items!')
    })

    it('permits $ as part of placeholder', () => {
      expect(formatString('You have {amount} in the wallet', { amount: 'US$0' }))
        .toBe('You have US$0 in the wallet')
    })

    it('ignores React placeholder values', () => {
      expect(formatString('{name} has {amount} in the wallet', {
        name: 'Bob',
        amount: <span>{'US$0'}</span>,
      })).toBe('Bob has {amount} in the wallet')
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
        <span key={1}>Bob</span>,
      ])
    })

    it('formats 1 placeholder appearing multiple times', () => {
      const result = formatReactString('Hello {name}, are you {name}?', '', {
        name: <span>Bob</span>,
      })

      expect(result.props.children).toEqual([
        'Hello ',
        <span key={1}>Bob</span>,
        ', are you ',
        <span key={3}>Bob</span>,
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
        <span key={1}>Bob</span>,
        ', is that ',
        <span key={3}>Joe</span>,
        '?',
      ])
    })

    it('formats multiple placeholders appearing multiple times', () => {
      const result = formatReactString('{name}? {name}! Is that {nameTwo}? Oh {nameTwo}!', '', {
        name: <span>Bob</span>,
        nameTwo: <span>Joe</span>,
      })

      expect(result.props.children).toEqual([
        <span key={0}>Bob</span>,
        '? ',
        <span key={2}>Bob</span>,
        '! Is that ',
        <span key={4}>Joe</span>,
        '? Oh ',
        <span key={6}>Joe</span>,
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
        <span key={3}>Joe</span>,
      ])
    })

    it('permits functions that evaluate to React elements', () => {
      const DummyComponent = () => <span>Bob</span>
      const result = formatReactString('{name} & {name}', '', {
        name: DummyComponent,
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

      expect(result.type).toBe('span')
      expect(result.props.className).toMatch('localized-string')
    })

    it('renders additional class on the span container', () => {
      const result = formatReactString('Hello', 'some-class')

      expect(result.type).toBe('span')
      expect(result.props.className).toBe('localized-string some-class')
    })
  })
})
