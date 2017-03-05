import { getInstance } from './translator';

export function _(id) {
  return locale => getInstance().dgettext(locale, id);
}

export function _n(id, idPlural, count) {
  return locale => getInstance().dngettext(locale, id, idPlural, count);
}

export function _c(id, context) {
  return locale => getInstance().dpgettext(locale, context, id);
}

export function _nc(id, idPlural, count, context) {
  return locale => getInstance().dnpgettext(locale, context, id, idPlural, count);
}
