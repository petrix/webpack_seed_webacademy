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
/******/ 	return __webpack_require__(__webpack_require__.s = 368);
/******/ })
/************************************************************************/
/******/ ({

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(369);


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(370);

// const container = document.querySelector('.select');
// const header = document.querySelector('.select__header');
// const controls = document.querySelectorAll('.select__control');

// for(let i = 0; i< controls.length; i++){
//     controls[i].onclick = selectOption;
// }

// function toggle(){
//     if(container.classList.contains('select__opened')){
//         close();
//     }else{
//         open();
//     }
// }
// function close(){
//     container.classList.remove('select__opened');
// }
// function open(){
//     container.classList.add('select__opened');
// }
// header.onclick = toggle;

// function selectOption(){
//     console.log(this);
//     const text = this.textContent;
//     header.textContent = text;
//     close();
// }


// var sum=0;
// var i = 0;
// for (i=0; i<=10; i++){
//     console.log(i);
//     sum += i;
// }
// console.log(sum);


$('#yyy').click(function () {
    $('#xxx').toggleClass('select__opened');
});

/***/ }),

/***/ 370:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });