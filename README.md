# react-translations
Modern translations for React. Lightweight and isomorphic app friendly.

[![npm version](https://badge.fury.io/js/react-translations.svg)](https://badge.fury.io/js/react-translations) [![CircleCI](https://circleci.com/gh/rtymchyk/react-translations.svg?style=shield)](https://circleci.com/gh/rtymchyk/react-translations) [![codecov](https://codecov.io/gh/rtymchyk/react-translations/branch/master/graph/badge.svg)](https://codecov.io/gh/rtymchyk/react-translations) [![David](https://david-dm.org/rtymchyk/react-translations.svg)](https://david-dm.org/rtymchyk/react-translations)

## Translation Format
This library uses **gettext** as the translation style, and thus relies on **PO** file format for storing translations. Gettext has been battle tested, and the **PO** format is very familiar to translators. The system is simple to use and allows the developer to continue building out UIs in the English language, with an almost complete isolation to the rest of the internationalization process. Read more information [here](https://developer.mozilla.org/en-US/docs/gettext).

## Example
A complete example client (React) and server (Express.JS) setup, with build chain (Webpack & Gulp), is available at [react-translations-demo](https://github.com/rtymchyk/react-translations-demo)!

## Usage

### Component Verbose Style
```javascript
import { Message } from 'react-translations'
```

#### Singular form
```javascript
<Message id="Hello World!" />
```

#### Singular form with context
```javascript
<Message id="Flag" context="Physical object" />
```
#### Plural form
```javascript
<Message
  id="You have one cat!"
  idPlural="You have {numCats} cats!"
  count={1}
  numCats="1" />
```

#### Plural form with context and translator comment
```javascript
<Message
  id="You have {numCats} car!"
  idPlural="You have {numCats} cars!"
  numCats="1,000"
  count={1000}
  context="Homepage"
  comment="Here's a comment for the translator" />
```

### Component Shortform Style
```javascript
import { _, _n, _c, _nc, Message } from 'react-translations'
<Message i18n={_('You have one cat!, You have many cats!', 1)} />
...
```

### Vanilla JS
```javascript
import { _, _n, _c, _nc } from 'react-translations'

const someString = _('Hello World!')(locale)
```

## Setup
Set the available translations on the client (and server if you perform SSR):
```javascript
import { setMessages } from 'react-translations'
setMessages({ ... })
```
You want to set this before you perform any rendering. On the client this may be start of a webpack entry. On the server, during boot. The shape of this object is specific to [Jed](http://messageformat.github.io/Jed/), which is what is used to do the gettext mapping. You can use tools to generate this format automatically (see FAQ). 

Wrap your root React component with the provider:
```javascript
import { LocaleProvider } from 'react-translations'
return <LocaleProvider locale={locale}><App/></LocaleProvider>
```
The user's locale (combination of language and region) must be provided and will be used to determine the translations based on one of the keys in the object passed to `setMessages` earlier. How you detect a user's locale is completely up to you.

## Placeholders
Placeholders like `numCats` above can be **standard JS types** or **React elements**.

Note that `count` can be used to determine plurality, and function as a placeholder. So if you don't care about additonal formatting of numbers, the above example could be simplified to:
```javascript
<Message id="You have one cat!" idPlural="You have {count} cars!" count={1000} />
```

## FAQ
1. *What can I use to extract strings from these components for translation?*

You can use the babel plugin [babel-extract-gettext](https://github.com/rtymchyk/babel-extract-gettext) to do an export into a `PO` file format that translators are familiar with.

2. *How can I convert a `PO` file back into `JSON` to be used for this library?*

You can use [po2json](https://www.npmjs.com/package/po2json) to do the conversion.

3. *When/where should the above things run?*

It depends on your build chain. If you are friendly with [gulp](https://www.npmjs.com/package/gulp), it can be used easily with [gulp-po2json](https://www.npmjs.com/package/gulp-po2json) to do imports. Exports can be achieved with [gulp-babel](https://www.npmjs.com/package/gulp-babel) and the previously named babel plugin.

4. *Where can I see an example of how to support server rendering, build chain, \<insert X\>?*

Check out [react-translations-demo](https://github.com/rtymchyk/react-translations-demo)!
