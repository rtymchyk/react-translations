import React from 'react';
import { _, _c, _n, _nc } from './gettext';
import { formatString, formatReactString } from './formatter';

export default function Message(props, { locale }) {
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

    throw new Error('Message has neither id nor i18n as a prop!');
  }

  return formatReactString(
    formatString(translate(), placeholders), className, placeholders);
}

Message.displayName = 'Message';

Message.propTypes = {
  id: React.PropTypes.string,
  idPlural: React.PropTypes.string,
  count: React.PropTypes.number,
  context: React.PropTypes.string,
  i18n: React.PropTypes.func,
};

Message.contextTypes = {
  locale: React.PropTypes.string,
};
