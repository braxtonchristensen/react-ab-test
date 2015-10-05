'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fbemitter = require('fbemitter');

var values = {};
var experiments = {};

var PushtellEventEmitter = (function (_EventEmitter) {
  _inherits(PushtellEventEmitter, _EventEmitter);

  function PushtellEventEmitter() {
    _classCallCheck(this, PushtellEventEmitter);

    _get(Object.getPrototypeOf(PushtellEventEmitter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PushtellEventEmitter, [{
    key: 'emitWin',
    value: function emitWin(experimentName) {
      if (typeof experimentName !== 'string') {
        throw new Error("Required argument 'experimentName' should have type 'string'");
      }
      this.emit("win", experimentName, values[experimentName]);
    }
  }, {
    key: 'addVariantListener',
    value: function addVariantListener(experimentName, callback) {
      if (typeof experimentName === "function") {
        callback = experimentName;
        return this.addListener('variant', function (_experimentName, variantName) {
          callback(_experimentName, variantName);
        });
      }
      return this.addListener('variant', function (_experimentName, variantName) {
        if (_experimentName === experimentName) {
          callback(variantName);
        }
      });
    }
  }, {
    key: 'addValueListener',
    value: function addValueListener(experimentName, callback) {
      if (typeof experimentName === "function") {
        callback = experimentName;
        return this.addListener('value', function (_experimentName, variantName) {
          callback(_experimentName, variantName);
        });
      }
      return this.addListener('value', function (_experimentName, variantName) {
        if (_experimentName === experimentName) {
          callback(variantName);
        }
      });
    }
  }, {
    key: 'addPlayListener',
    value: function addPlayListener(experimentName, callback) {
      if (typeof experimentName === "function") {
        callback = experimentName;
        return this.addListener('play', function (_experimentName, variantName) {
          callback(_experimentName, variantName);
        });
      }
      return this.addListener('play', function (_experimentName, variantName) {
        if (_experimentName === experimentName) {
          callback(variantName);
        }
      });
    }
  }, {
    key: 'addWinListener',
    value: function addWinListener(experimentName, callback) {
      if (typeof experimentName === "function") {
        callback = experimentName;
        return this.addListener('win', function (_experimentName, variantName) {
          callback(_experimentName, variantName);
        });
      }
      return this.addListener('win', function (_experimentName, variantName) {
        if (_experimentName === experimentName) {
          callback(variantName);
        }
      });
    }
  }, {
    key: 'addExperimentVariants',
    value: function addExperimentVariants(experimentName, variantNames) {
      var _this = this;

      experiments[experimentName] = experiments[experimentName] || {};
      variantNames.forEach(function (variantName) {
        if (experiments[experimentName][variantName] !== true) {
          _this.emit("variant", experimentName, variantName);
        }
        experiments[experimentName][variantName] = true;
      });
    }
  }, {
    key: 'getSortedVariants',
    value: function getSortedVariants(experimentName) {
      var names = Object.keys(experiments[experimentName]);
      names.sort();
      return names;
    }
  }, {
    key: 'setExperimentValue',
    value: function setExperimentValue(experimentName, variantName) {
      values[experimentName] = variantName;
      this.emit("value", experimentName, variantName);
    }
  }, {
    key: 'addExperimentVariant',
    value: function addExperimentVariant(experimentName, variantName) {
      experiments[experimentName] = experiments[experimentName] || {};
      if (experiments[experimentName][variantName] !== true) {
        if (values[experimentName]) {
          var error = new Error("Expiriment “" + experimentName + "” added new variants after a variant was selected. Declare the variant names using emitter.addExpirimentVariants(expirimentName, variantNames).");
          error.type = "PUSHTELL_INVALID_VARIANT";
          throw error;
        }
        this.emit("variant", experimentName, variantName);
      }
      experiments[experimentName][variantName] = true;
    }
  }]);

  return PushtellEventEmitter;
})(_fbemitter.EventEmitter);

exports['default'] = new PushtellEventEmitter();
module.exports = exports['default'];