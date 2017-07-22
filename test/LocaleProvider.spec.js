import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import LocaleProvider from 'LocaleProvider'

const TestComponent = (props, { locale }) => <div>{locale}</div>
TestComponent.contextTypes = {
  locale: PropTypes.string.isRequired,
}

describe('LocaleProvider', () => {
  it('provides locale in the context of child component', () => {
    const root = mount(
      <LocaleProvider locale="fr-FR">
        <TestComponent />
      </LocaleProvider>
    )

    expect(root.find(TestComponent).text()).toBe('fr-FR')
  })
})
