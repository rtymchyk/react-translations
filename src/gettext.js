import { getInstance } from './translator';

export function _(id, locale) {
  return getInstance().dgettext(locale, id);
}

export function _n(id, idPlural, count, locale) {
  return getInstance().dngettext(locale, id, idPlural, count);
}

export function _c(id, context, locale) {
  return getInstance().dpgettext(locale, context, id);
}

export function _nc(id, idPlural, count, context, locale) {
  return getInstance().dnpgettext(locale, context, id, idPlural, count);
}
