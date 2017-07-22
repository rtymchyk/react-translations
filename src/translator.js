import Jed from 'jed'

let jed

const defaultOptions = {
  domain: 'en-US',
  locale_data: {
    'en-US': {
      '': {
        domain: 'en-US',
        lang: 'en-US',
        plural_forms: 'nplurals=2; plural=(n != 1);',
      },
    },
  },
}

export function setMessages(messages) {
  jed = new Jed({ ...defaultOptions, ...messages })
}

export function clearInstance() {
  jed = undefined
}

export function getInstance() {
  if (!jed) {
    throw new Error('Translator has not been initialized with data')
  }

  return jed
}
