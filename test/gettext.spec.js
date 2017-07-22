import { setMessages } from 'translator'
import { _, _c, _n, _nc } from 'gettext'

describe('gettext', () => {
  beforeEach(() => {
    setMessages({
      domain: 'fr',
      locale_data: {
        fr: {
          '': {
            domain: 'fr',
            lang: 'fr',
            'plural-forms': 'nplurals=2; plural=(n != 1);',
          },
          Hello: ['Bonjour'],
          One: ['Un', 'Beaucoup'],
          'Context\u0004Hello': ['Bonjour2'],
          'Context\u0004One': ['Un2', 'Beaucoup2'],
        },
        'en-US': {
          '': {
            domain: 'en-US',
            lang: 'en-US',
            'plural-forms': 'nplurals=2; plural=(n != 1);',
          },
        },
      },
    })
  })

  describe('#_', () => {
    it('returns a function', () => {
      expect(_('Hello') instanceof Function).toBe(true)
    })

    it('delegates to Jed when evaluated', () => {
      const result = _('Hello')('fr')

      expect(result).toBe('Bonjour')
    })
  })

  describe('#_c', () => {
    it('returns a function', () => {
      expect(_c('Hello', 'Context') instanceof Function).toBe(true)
    })

    it('delegates to Jed when evaluated', () => {
      const result = _c('Hello', 'Context')('fr')

      expect(result).toBe('Bonjour2')
    })
  })

  describe('#_n', () => {
    it('returns a function', () => {
      expect(_n('One', 'Many', 1) instanceof Function).toBe(true)
    })

    it('delegates to Jed when evaluated', () => {
      const result = _n('One', 'Many', 1)('fr')
      expect(result).toBe('Un')

      const resultTwo = _n('One', 'Many', 10)('fr')
      expect(resultTwo).toBe('Beaucoup')
    })
  })

  describe('#_nc', () => {
    it('returns a function', () => {
      expect(_nc('One', 'Many', 1, 'Context') instanceof Function).toBe(true)
    })

    it('delegates to Jed when evaluated', () => {
      const result = _nc('One', 'Many', 1, 'Context')('fr')
      expect(result).toBe('Un2')

      const resultTwo = _nc('One', 'Many', 10, 'Context')('fr')
      expect(resultTwo).toBe('Beaucoup2')
    })
  })
})
