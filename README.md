# react-translations
Modern gettext-style translations for React. Isomorphic app friendly.

## Description
Wraps [Jed](https://github.com/messageformat/Jed) to perform gettext-style string mapping, and formats placeholders into the string from props.

## Usage
React verbose style:
```javascript
import { Message } from 'react-translations'

// Singular form
<Message id="Hello World!" />
// Singular form with context
<Message id="Flag" context="Physical object" />
// Plural form
<Message
  id="You have one cat!"
  idPlural="You have {numCats} cats!"
  count={1}
  numCats="1" />
// Plural form with context and comment
<Message
  id="You have {numCats} car!"
  idPlural="You have {numCats} cars!"
  numCats="1,000"
  count={1000}
  context="Homepage"
  comment="Here's a comment for the translator" />
```

React short-form style:
```javascript
import { _, _n, _c, _nc, Message } from 'react-translations'

<Message i18n={_('You have one cat!, You have many cats!', 1)} />
```

Vanilla:
```javascript
import { _, _n, _c, _nc, Message } from 'react-translations'

const someString = _('Hello World!')(locale)
```

## Setup
Set the available translations on the client (and server if you perform SSR):
```javascript
import { setMessages } from 'react-translations'
setMessage({ ... })
```
The shape of this object is specific to [Jed](http://messageformat.github.io/Jed/). You can use tools to generate this format automatically (see FAQ).


Now, wrap your root component in a provider:
```javascript
import { LocaleProvider } from 'react-translations'
return <LocaleProvider locale={locale}><App/></LocaleProvider>
```
The user's locale must be provided and determines the translations.

## Placeholders
Placeholders like `numCats` above can be any **standard JS type**, as well as **React nodes**, or **stateless component functions**. 

Note that `count` can be used to determine plurality, and function as a placeholder. So the above example could be simplified to:
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
