import React from 'react'
import PropTypes from 'prop-types'

export default class LocaleProvider extends React.Component {
  getChildContext () {
    const { locale } = this.props
    return { locale }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

LocaleProvider.displayName = 'LocaleProvider'

LocaleProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node,
}

LocaleProvider.childContextTypes = {
  locale: PropTypes.string.isRequired,
}
