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
/******/ 	return __webpack_require__(__webpack_require__.s = 401);
/******/ })
/************************************************************************/
/******/ ({

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(402);


/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(403);

var tabs = document.querySelectorAll('.tabs_selector');
var tabcontent1 = document.querySelector('.tabcontent1');
var tabcontent2 = document.querySelector('.tabcontent2');
var tabcontent3 = document.querySelector('.tabcontent3');
var selecttab1 = document.querySelector('.selecttab1');
var selecttab2 = document.querySelector('.selecttab2');
var selecttab3 = document.querySelector('.selecttab3');
var i = 0;
for (i; i < tabs.length; i++) {
    tabs[i].onclick = selectTab;
}

function selectTab() {
    // console.log(this);
    if (this.classList.contains('selecttab1')) {
        selecttab1.classList.add('selected-tab');
        selecttab2.classList.remove('selected-tab');
        selecttab3.classList.remove('selected-tab');
        tabcontent1.classList.remove('hidden');
        tabcontent2.classList.add('hidden');
        tabcontent3.classList.add('hidden');
    } else if (this.classList.contains('selecttab2')) {
        selecttab1.classList.remove('selected-tab');
        selecttab2.classList.add('selected-tab');
        selecttab3.classList.remove('selected-tab');
        tabcontent1.classList.add('hidden');
        tabcontent2.classList.remove('hidden');
        tabcontent3.classList.add('hidden');
    } else
        // if (this.classList.contains('selecttab3')) 
        {
            selecttab1.classList.remove('selected-tab');
            selecttab2.classList.remove('selected-tab');
            selecttab3.classList.add('selected-tab');
            tabcontent1.classList.add('hidden');
            tabcontent2.classList.add('hidden');
            tabcontent3.classList.remove('hidden');
        }
}

/***/ }),

/***/ 403:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });