(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("JsSeed", [], factory);
	else if(typeof exports === 'object')
		exports["JsSeed"] = factory();
	else
		root["JsSeed"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _storageManager = __webpack_require__(2);

	var _storageManager2 = _interopRequireDefault(_storageManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _storageManager2.default; /**
	                                            * Example v1.0.0
	                                            *
	                                            * Description 
	                                            *
	                                            * @example
	                                            * // Usage example here
	                                            */

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var StorageManager = function () {

	  var M = {
	    _getDate: function _getDate() {
	      return Date.now();
	    }
	  };

	  var isExpired = function isExpired(data) {
	    if (!data.exp) return false;
	    var ageInSec = (M._getDate() - data.timestamp) / 1000;
	    return ageInSec >= data.exp;
	  };

	  var set = function set(key, value, expiry) {
	    var data = {
	      val: value,
	      exp: expiry,
	      timestamp: Date.now()
	    };
	    localStorage.setItem(key, JSON.stringify(data));
	  };

	  var get = function get(key) {
	    var dataJson = localStorage.getItem(key);
	    if (!dataJson) return undefined;

	    var data = JSON.parse(dataJson);
	    return isExpired(data) || data.val == null ? undefined : data.val;
	  };

	  var remove = function remove(key) {
	    localStorage.removeItem(key);
	  };

	  var setProperty = function setProperty(key, property, value, expiry) {
	    var storedValue = get(key);
	    if ((typeof storedValue === "undefined" ? "undefined" : _typeof(storedValue)) !== "object") throw new Error("Can't add property to non object value");
	    var newValue = Object.assign(storedValue, _defineProperty({}, property, value));
	    set(key, newValue, expiry);
	  };

	  return Object.assign(M, {
	    set: set,
	    get: get,
	    remove: remove,
	    setProperty: setProperty
	  });
	}();

	window.getStorageManager = function () {
	  return StorageManager;
	};

	exports.default = window.getStorageManager();

/***/ })
/******/ ])
});
;