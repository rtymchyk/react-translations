import React from 'react';
import { mount } from 'enzyme';
import LocaleProvider from '../src/LocaleProvider';

const TestComponent = (props, { locale }) => <div>{locale}</div>;
TestComponent.contextTypes = {
  locale: React.PropTypes.string.isRequired,
};

describe('LocaleProvider', () => {
  it('provides locale in the context of child component', () => {
    const root = mount(
      <LocaleProvider locale="fr-FR">
        <TestComponent />
      </LocaleProvider>
    );

    expect(root.find(TestComponent).text()).toEqual('fr-FR');
  });
});
