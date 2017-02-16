import { setMessages, getInstance } from '../src/translator';
import { _, _c, _n, _nc } from '../src/gettext';

describe('gettext', () => {
  before(() => {
    setMessages({
      domain: 'fr',
      locale_data: {
        'fr': {
          '': {
            'domain': 'fr',
            'lang': 'fr',
            'plural-forms': 'nplurals=2; plural=(n != 1);',
          },
          'Hello': ['Bonjour'],
          'One': ['Un', 'Beaucoup'],
          'Context\u0004Hello': ['Bonjour2'],
          'Context\u0004One': ['Un2', 'Beaucoup2'],
        },
        'en-US': {
          '': {
            'domain': 'en-US',
            'lang': 'en-US',
            'plural-forms': 'nplurals=2; plural=(n != 1);',
          },
        }
      },
    });

    const jed = getInstance();
    jed.dgettext = sinon.spy(jed.dgettext);
    jed.dngettext = sinon.spy(jed.dngettext);
    jed.dpgettext = sinon.spy(jed.dpgettext);
    jed.dnpgettext = sinon.spy(jed.dnpgettext);
  });

  describe('#_', () => {
    it('delegates to Jed', () => {
      const result = _('Hello', 'fr');

      expect(result).to.equal('Bonjour');
      expect(getInstance().dgettext.calledWith('fr', 'Hello')).to.equal(true);
    });
  });

  describe('#_c', () => {
    it('delegates to Jed', () => {
      const result = _c('Hello', 'Context', 'fr');

      expect(result).to.equal('Bonjour2');
      expect(getInstance().dpgettext.calledWith('fr', 'Context', 'Hello'))
        .to.equal(true);
    });
  });

  describe('#_n', () => {
    it('delegates to Jed', () => {
      const result = _n('One', 'Many', 1, 'fr');
      expect(result).to.equal('Un');
      expect(getInstance().dngettext.calledWith('fr', 'One', 'Many', 1))
        .to.equal(true);

      const resultTwo = _n('One', 'Many', 10, 'fr');
      expect(resultTwo).to.equal('Beaucoup');
      expect(getInstance().dngettext.calledWith('fr', 'One', 'Many', 10))
        .to.equal(true);
    });
  });

  describe('#_nc', () => {
    it('delegates to Jed', () => {
      const result = _nc('One', 'Many', 1, 'Context', 'fr');
      expect(result).to.equal('Un2');
      expect(getInstance().dnpgettext.calledWith('fr', 'Context', 'One', 'Many', 1))
        .to.equal(true);

      const resultTwo = _nc('One', 'Many', 10, 'Context', 'fr');
      expect(resultTwo).to.equal('Beaucoup2');
      expect(getInstance().dnpgettext.calledWith('fr', 'Context', 'One', 'Many', 10))
        .to.equal(true);
    });
  });
});
