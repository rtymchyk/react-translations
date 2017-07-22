import { getInstance, clearInstance, setMessages } from '../src/translator';

describe('translator', () => {
  beforeEach(() => {
    clearInstance();
  });

  describe('#getInstance', () => {
    it('throws an error if messages have not been set', () => {
      try {
        getInstance();
        fail();
      } catch (e) {
        expect(e.message).toEqual(
          'Translator has not been initialized with data');
      }
    });

    it('returns the same Jed instance on multiple invocations', () => {
      setMessages({});
      const instanceOne = getInstance();
      const instanceTwo = getInstance();

      expect(instanceOne).not.toEqual(undefined);
      expect(instanceTwo).not.toEqual(undefined);
      expect(instanceOne).toEqual(instanceTwo);
    });
  });

  describe('#setMessages', () => {
    it('create a new Jed instance when invoked', () => {
      setMessages({});
      const instanceOne = getInstance();

      setMessages({});
      const instanceTwo = getInstance();

      expect(instanceOne).not.toBe(instanceTwo);
    });
  });
});
