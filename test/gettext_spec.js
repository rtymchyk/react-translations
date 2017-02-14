import { setMessages } from '../src/translator';
import { _, _c, _n, _nc } from '../src/gettext';
import chai from 'chai';

const expect = chai.expect;

describe('gettext', () => {
  before(() => {
    setMessages({
      domain: "fr",
      locale_data: {
        "fr": {
          "": {
            "domain": "fr",
            "lang": "fr",
            "plural-forms": "nplurals=2; plural=(n != 1);",
          },
          "Hello": ["Bonjour"],
          "One": ["Un", "Beaucoup"],
          "Context\u0004Hello": ["Bonjour2"],
          "Context\u0004One": ["Un2", "Beaucoup2"],
        },
        "en-US": {
          "": {
            "domain": "en-US",
            "lang": "en-US",
            "plural-forms": "nplurals=2; plural=(n != 1);",
          },
        }
      },
    });
  });

  describe('#_', () => {
    it('delegates to Jed', () => {
      expect(_('Hello', 'fr')).to.equal('Bonjour');
    });
  });

  describe('#_c', () => {
    it('delegates to Jed', () => {
      expect(_c('Hello', 'Context', 'en-US')).to.equal('Hello');
      expect(_c('Hello', 'Context', 'fr')).to.equal('Bonjour2');
    });
  });

  describe('#_n', () => {
    it('delegates to Jed', () => {
      expect(_n('One', 'Many', 1, 'en-US')).to.equal('One');
      expect(_n('One', 'Many', 10, 'en-US')).to.equal('Many');

      expect(_n('One', 'Many', 1, 'fr')).to.equal('Un');
      expect(_n('One', 'Many', 10, 'fr')).to.equal('Beaucoup');
    });
  });

  describe('#_nc', () => {
    it('delegates to Jed', () => {
      expect(_nc('One', 'Many', 1, 'Context', 'en-US')).to.equal('One');
      expect(_nc('One', 'Many', 10, 'Context', 'en-US')).to.equal('Many');

      expect(_nc('One', 'Many', 1, 'Context', 'fr')).to.equal('Un2');
      expect(_nc('One', 'Many', 10, 'Context', 'fr')).to.equal('Beaucoup2');
    });
  });
});
