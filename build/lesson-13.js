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
/******/ 	return __webpack_require__(__webpack_require__.s = 357);
/******/ })
/************************************************************************/
/******/ ({

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(358);


/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(359);

function greetingWidget(parentNode) {
    var btn = parentNode.querySelector('.control');
    var block = parentNode.querySelector('.block');
    btn.addEventListener('click', toggle);
    btn.addEventListener('click', function () {
        console.log(this);
    });

    function toggle() {
        var name = prompt('enter your name');
        console.log(name);
        if (block.classList.contains('block_visible')) {
            return;
        } else {
            block.classList.add('block_visible');
        }
        block.textContent = block.textContent + ' ' + name;
    }
}
greetingWidget(document.querySelector('.row1'));
greetingWidget(document.querySelector('.row2'));
greetingWidget(document.querySelector('.row3'));
greetingWidget(document.querySelector('.row4'));

// $('button').click(function(){
//     $(this).next().css('opacity', '1');
// })

/***/ }),

/***/ 359:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });