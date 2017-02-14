import { getInstance } from './translator';

export function _(id, locale) {
  return getInstance()
    .translate(id)
    .onDomain(locale)
    .fetch();
}

export function _n(id, idPlural, count, locale) {
  return getInstance()
    .translate(id)
    .ifPlural(count, idPlural)
    .onDomain(locale)
    .fetch();
}

export function _c(id, context, locale) {
  return getInstance()
    .translate(id)
    .withContext(context)
    .onDomain(locale)
    .fetch();
}

export function _nc(id, idPlural, count, context, locale) {
  return getInstance()
    .translate(id)
    .withContext(context)
    .ifPlural(count, idPlural)
    .onDomain(locale)
    .fetch();
}
