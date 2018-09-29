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
/******/ 	return __webpack_require__(__webpack_require__.s = 360);
/******/ })
/************************************************************************/
/******/ ({

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(361);


/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _trafficLighter = __webpack_require__(362);

// import './lesson-14.scss';


// trafficLight(document.querySelector('#lighter-1'));
// trafficLight(document.querySelector('#lighter-2'));
(0, _trafficLighter.trafficLight)(document.querySelector('.place-for-traffic-light'));

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trafficLight = undefined;

__webpack_require__(363);

function trafficLight(parentNode) {
  var ACTIVE_CLASS_NAME = 'light_active';
  var lights = [];
  var activeLightIndex = 0;
  var intervalId = null;

  function toggle(lightIndex) {
    // console.log('Test');
    switchOff();
    // console.log(lightIndex);
    activeLightIndex = lightIndex;
    lights[lightIndex].classList.add(ACTIVE_CLASS_NAME);
  }

  function switchOff() {
    for (var i = 0; i < lights.length; i++) {
      lights[i].classList.remove(ACTIVE_CLASS_NAME);
    }
  }

  function handleEvents() {
    var _loop = function _loop(i) {
      lights[i].addEventListener('click', function () {
        toggle(i);
        // clearInterval(intervalId);
      });
    };

    for (var i = 0; i < lights.length; i++) {
      _loop(i);
    }
    parentNode.addEventListener('mouseenter', stopAutoSwitch);
    parentNode.addEventListener('mouseleave', startAutoSwitch);
  }
  function stopAutoSwitch() {
    clearInterval(intervalId);
  }
  function startAutoSwitch() {
    clearInterval(intervalId);
    intervalId = setInterval(function () {
      if (activeLightIndex + 1 > 2) {
        activeLightIndex = 0;
      } else {
        activeLightIndex++;
      }
      switchOff();
      lights[activeLightIndex].classList.add(ACTIVE_CLASS_NAME);
      console.log(activeLightIndex);
    }, 2000);
  }

  function render() {
    var redLight = document.createElement('div');
    var yellowLight = document.createElement('div');
    var greenLight = document.createElement('div');

    redLight.classList.add('light', 'light_red');
    yellowLight.classList.add('light', 'light_yellow');
    greenLight.classList.add('light', 'light_green');

    parentNode.appendChild(redLight);
    parentNode.appendChild(yellowLight);
    parentNode.appendChild(greenLight);
    parentNode.classList.add('traffic-light');

    lights = [redLight, yellowLight, greenLight];
  }
  render();
  handleEvents();
  startAutoSwitch();
}

exports.trafficLight = trafficLight;

/***/ }),

/***/ 363:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });