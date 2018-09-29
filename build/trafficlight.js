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
/******/ 	return __webpack_require__(__webpack_require__.s = 339);
/******/ })
/************************************************************************/
/******/ ({

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(340);


/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(341);

///////////////////////////////////////
//////----USING JQUERY METHOD----//////
///////////////////////////////////////

$('.j_circle').click(function () {
    $(this).addClass('j_active');
    $('.j_circle').not(this).removeClass('j_active');
});

////////////////////////////////////////
//////----END OF JQUERY METHOD----//////
////////////////////////////////////////


//////////////////////////////////
//////----CLASSIC METHOD----//////
//////////////////////////////////

// const controls = document.querySelectorAll('.trafficlight');
var redcolor = document.querySelector('.color_red');
var yellowcolor = document.querySelector('.color_yellow');
var greencolor = document.querySelector('.color_green');
// const circle = document.querySelector('.circle');
var circles = document.querySelectorAll('.circle');
for (var i = 0; i < circles.length; i++) {
    var x = circles[i];
    circles[i].onclick = selectOption;
}

function selectOption() {
    if (this.classList.contains('color_red')) {
        redcolor.classList.add('active');
        yellowcolor.classList.remove('active');
        greencolor.classList.remove('active');
    } else if (this.classList.contains('color_yellow')) {
        redcolor.classList.remove('active');
        yellowcolor.classList.add('active');
        greencolor.classList.remove('active');
    } else if (this.classList.contains('color_green')) {
        redcolor.classList.remove('active');
        yellowcolor.classList.remove('active');
        greencolor.classList.add('active');
    }
}

/***/ }),

/***/ 341:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });