import React from 'react';
import LocalizedString from '../src/LocalizedString';
import TestUtils from 'react-addons-test-utils';
import { setMessages } from '../src/translator';
import * as Gettext from '../src/gettext';

describe('LocalizedString', () => {
  function render(props, locale = 'en-US') {
    const renderer = TestUtils.createRenderer();
    renderer.render(<LocalizedString {...props}/>, { locale });

    return renderer.getRenderOutput();
  }

  beforeEach(() => {
    setMessages({});
    Gettext._ = sinon.spy(Gettext._);
    Gettext._n = sinon.spy(Gettext._n);
    Gettext._c = sinon.spy(Gettext._c);
    Gettext._nc = sinon.spy(Gettext._nc);
  });

  it('invokes gettext as singular', () => {
    const output = render({ id: 'Hello' });

    expect(output.type).to.equal('span');
    expect(Gettext._.calledWith('Hello', 'en-US')).to.equal(true);
  });

  it('invokes gettext as plural', () => {
    const output = render({ id: 'One', idPlural: 'Many', count: 5 });

    expect(output.type).to.equal('span');
    expect(Gettext._n.calledWith('One', 'Many', 5, 'en-US')).to.equal(true);
  });

  it('invokes gettext as singular with context', () => {
    const output = render({ id: 'Hello', context: 'Context' });

    expect(output.type).to.equal('span');
    expect(Gettext._c.calledWith('Hello', 'Context')).to.equal(true);
  });

  it('invokes gettext as plural with context', () => {
    const output = render({
      id: 'One', idPlural: 'Many', count: 5, context: 'Context',
    });

    expect(output.type).to.equal('span');
    expect(Gettext._nc.calledWith('One', 'Many', 5, 'Context', 'en-US'))
      .to.equal(true);
  });
});
