import React from 'react';
import LocaleProvider from '../src/LocaleProvider';
import TestUtils from 'react-addons-test-utils';

class TestComponent extends React.Component {
  render() {
    return <div>{this.context.locale}</div>;
  }
}

TestComponent.contextTypes = {
  locale: React.PropTypes.string.isRequired,
};

describe('LocaleProvider', () => {
  it('provides locale in the context of child component', () => {
    const tree = TestUtils.renderIntoDocument(
      <LocaleProvider locale="fr-FR">
        <TestComponent/>
      </LocaleProvider>
    );

    const child = TestUtils.findRenderedComponentWithType(tree, TestComponent);
    expect(child.context.locale).to.equal("fr-FR");
  });
});
