module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = _;
exports._n = _n;
exports._c = _c;
exports._nc = _nc;

var _translator = __webpack_require__(2);

function _(id) {
  return function (locale) {
    return (0, _translator.getInstance)().dgettext(locale, id);
  };
}

function _n(id, idPlural, count) {
  return function (locale) {
    return (0, _translator.getInstance)().dngettext(locale, id, idPlural, count);
  };
}

function _c(id, context) {
  return function (locale) {
    return (0, _translator.getInstance)().dpgettext(locale, context, id);
  };
}

function _nc(id, idPlural, count, context) {
  return function (locale) {
    return (0, _translator.getInstance)().dnpgettext(locale, context, id, idPlural, count);
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMessages = setMessages;
exports.clearInstance = clearInstance;
exports.getInstance = getInstance;

var _jed = __webpack_require__(6);

var _jed2 = _interopRequireDefault(_jed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jed = void 0;

var defaultOptions = {
  domain: 'en-US',
  locale_data: {
    'en-US': {
      '': {
        domain: 'en-US',
        lang: 'en-US',
        plural_forms: 'nplurals=2; plural=(n != 1);'
      }
    }
  }
};

function setMessages(messages) {
  jed = new _jed2.default(Object.assign({}, defaultOptions, messages));
}

function clearInstance() {
  jed = undefined;
}

function getInstance() {
  if (!jed) {
    throw new Error('Translator has not been initialized with data');
  }

  return jed;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocaleProvider = function (_React$Component) {
  _inherits(LocaleProvider, _React$Component);

  function LocaleProvider() {
    _classCallCheck(this, LocaleProvider);

    return _possibleConstructorReturn(this, (LocaleProvider.__proto__ || Object.getPrototypeOf(LocaleProvider)).apply(this, arguments));
  }

  _createClass(LocaleProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var locale = this.props.locale;

      return { locale: locale };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return LocaleProvider;
}(_react2.default.Component);

exports.default = LocaleProvider;


LocaleProvider.displayName = 'LocaleProvider';

LocaleProvider.propTypes = {
  locale: _react2.default.PropTypes.string.isRequired,
  children: _react2.default.PropTypes.node
};

LocaleProvider.childContextTypes = {
  locale: _react2.default.PropTypes.string.isRequired
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _gettext = __webpack_require__(1);

var _formatter = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LocalizedString = function LocalizedString(props, _ref) {
  var locale = _ref.locale;

  var id = props.id,
      idPlural = props.idPlural,
      comment = props.comment,
      context = props.context,
      count = props.count,
      children = props.children,
      className = props.className,
      i18n = props.i18n,
      placeholders = _objectWithoutProperties(props, ['id', 'idPlural', 'comment', 'context', 'count', 'children', 'className', 'i18n']);

  function translate() {
    if (i18n) {
      return i18n(locale);
    }

    if (id) {
      if (idPlural) {
        if (context) {
          return (0, _gettext._nc)(id, idPlural, count, context)(locale);
        }
        return (0, _gettext._n)(id, idPlural, count)(locale);
      }

      if (context) {
        return (0, _gettext._c)(id, context)(locale);
      }

      return (0, _gettext._)(id)(locale);
    }

    throw new Error('LocalizedString is missing an id and an i18n prop!');
  }

  return (0, _formatter.formatReactString)((0, _formatter.formatString)(translate(), placeholders), className, placeholders);
};

LocalizedString.displayName = 'LocalizedString';

LocalizedString.propTypes = {
  id: _react2.default.PropTypes.string.isRequired
};

LocalizedString.contextTypes = {
  locale: _react2.default.PropTypes.string
};

exports.default = LocalizedString;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatString = formatString;
exports.formatReactString = formatReactString;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLACEHOLDER_REGEX = new RegExp('[{}]', 'g');

function formatString(string) {
  var placeholders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var builtString = string;

  Object.keys(placeholders).forEach(function (placeholderKey) {
    var placeholderValue = placeholders[placeholderKey];

    if (placeholderValue || placeholderValue === 0) {
      if (!_react2.default.isValidElement(placeholderValue)) {
        builtString = builtString.replace(new RegExp('{' + placeholderKey + '}', 'g'), function () {
          return placeholders[placeholderKey];
        });
      }
    }
  });

  return builtString;
}

function formatReactString(string, className) {
  var placeholders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _react2.default.createElement(
    'span',
    { className: 'localized-string ' + (className || '') },
    string.split(new RegExp('({.+?})', 'g')).filter(function (node) {
      return !!node;
    }).map(function (node, index) {
      var placeholderKey = node.replace(PLACEHOLDER_REGEX, '');

      var placeholderValue = placeholders[placeholderKey];
      if (typeof placeholderValue === 'function') {
        placeholderValue = placeholderValue(index);
      }

      if (placeholderValue && _react2.default.isValidElement(placeholderValue)) {
        return placeholderValue;
      }

      return node;
    })
  );
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("jed");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _LocalizedString = __webpack_require__(4);

var _LocalizedString2 = _interopRequireDefault(_LocalizedString);

var _LocaleProvider = __webpack_require__(3);

var _LocaleProvider2 = _interopRequireDefault(_LocaleProvider);

var _translator = __webpack_require__(2);

var _gettext = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  LocalizedString: _LocalizedString2.default,
  LocaleProvider: _LocaleProvider2.default,
  setMessages: _translator.setMessages,
  _: _gettext._,
  _n: _gettext._n,
  _c: _gettext._c,
  _nc: _gettext._nc
};

/***/ })
/******/ ]);