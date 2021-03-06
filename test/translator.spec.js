import { getInstance, clearInstance, setMessages } from 'translator'

describe('translator', () => {
  beforeEach(() => {
    clearInstance()
  })

  describe('#getInstance', () => {
    it('throws an error if messages have not been set', () => {
      expect(() => {
        getInstance()
      }).toThrowError('Translator has not been initialized with data')
    })

    it('returns the same Jed instance on multiple invocations', () => {
      setMessages({})
      const instanceOne = getInstance()
      const instanceTwo = getInstance()

      expect(instanceOne).not.toBeUndefined()
      expect(instanceTwo).not.toBeUndefined()
      expect(instanceOne).toBe(instanceTwo)
    })
  })

  describe('#setMessages', () => {
    it('create a new Jed instance when invoked', () => {
      setMessages({})
      const instanceOne = getInstance()

      setMessages({})
      const instanceTwo = getInstance()

      expect(instanceOne).not.toBe(instanceTwo)
    })
  })
})
