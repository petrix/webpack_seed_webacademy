/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 395);
/******/ })
/************************************************************************/
/******/ ({

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(396);


/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(397);

var title = '#dropmenu-title';

$('#dropmenu-item1').click(function () {
    console.log($(this).text());
    $(title).text($(this).text());
    $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
    $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');
    dropmenuvisible = false;
});
$('#dropmenu-item2').click(function () {
    $(title).text($(this).text());
    $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
    $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');
    dropmenuvisible = false;
});
$('#dropmenu-item3').click(function () {
    $(title).text($(this).text());
    $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
    $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');
    dropmenuvisible = false;
});
$('#dropmenu-item4').click(function () {
    $(title).text($(this).text());
    $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
    $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');
    dropmenuvisible = false;
});

var dropmenuvisible = false;
$('#dropmenu_header').click(function () {
    if (dropmenuvisible) {
        $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');
        dropmenuvisible = false;
    } else {
        $('#dropmenu-items').css({ 'opacity': '1', 'transform': 'scaleY(1)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = true;
    }
});

// $('#dropmenu-item1').css('color', '#f00');

/***/ }),

/***/ 397:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });