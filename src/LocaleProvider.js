import React from 'react';

export default class LocaleProvider extends React.Component {
  getChildContext() {
    const { locale } = this.props;
    return { locale };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

LocaleProvider.displayName = 'LocaleProvider';

LocaleProvider.propTypes = {
  locale: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

LocaleProvider.childContextTypes = {
  locale: React.PropTypes.string.isRequired,
};
