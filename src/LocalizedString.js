import React from 'react';
import { _, _c, _n, _nc } from './gettext';
import { formatString, formatReactString } from './formatter';

const LocalizedString = (props, { locale }) => {
  const {
    id,
    idPlural,
    comment,
    context,
    count,
    children,
    className,
    i18n,
    ...placeholders,
  } = props;

  function translate() {
    if (i18n) {
      return i18n(locale);
    }

    if (id) {
      if (idPlural) {
        if (context) {
          return _nc(id, idPlural, count, context)(locale);
        }
        return _n(id, idPlural, count)(locale);
      }

      if (context) {
        return _c(id, context)(locale);
      }

      return _(id)(locale);
    }

    throw new Error('LocalizedString is missing an id and an i18n prop!');
  }

  return formatReactString(
    formatString(translate(), placeholders), className, placeholders);
};

LocalizedString.displayName = 'LocalizedString';

LocalizedString.propTypes = {
  id: React.PropTypes.string.isRequired,
};

LocalizedString.contextTypes = {
  locale: React.PropTypes.string,
};

export default LocalizedString;
