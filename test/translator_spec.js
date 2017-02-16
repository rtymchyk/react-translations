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
        expect(e.message).to.equal(
          'Translator has not been initialized with data');
      }
    });

    it('returns the same Jed instance on multiple invocations', () => {
      setMessages({});
      const instanceOne = getInstance();
      const instanceTwo = getInstance();

      expect(instanceOne).to.not.equal(undefined);
      expect(instanceTwo).to.not.equal(undefined);
      expect(instanceOne).to.equal(instanceTwo);
    });
  });

  describe('#setMessages', () => {
    it('create a new Jed instance when invoked', () => {
      setMessages({});
      const instanceOne = getInstance();

      setMessages({});
      const instanceTwo = getInstance();

      expect(instanceOne).to.not.equal(instanceTwo);
    });
  });
});
