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
/******/ 	return __webpack_require__(__webpack_require__.s = 417);
/******/ })
/************************************************************************/
/******/ ({

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(418);


/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(419);

$(document).ready(function () {
    var responseLoc;
    var response = $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country, response.loc, response);
        responseLoc = response.loc;
    }, "jsonp");
    var regActive = false;
    $('.register').click(function () {
        $('.register-form').addClass('reg-active').animate({
            opacity: 1
        }, 500);
        regActive = true;
    });

    $('.register-form-closebtn').click(function () {
        $('.register-form').animate({
            opacity: 0
        }, 500, function () {
            $('.register-form').removeClass('reg-active');
        });
        regActive = false;
    });

    var mobmenu = false;
    $('.icon-mob-menu').click(function () {
        if (!mobmenu) {
            mobmenu = true;

            $('.icon-mob-menu').addClass('activated');
            $('.mob-nav').addClass('opened');
        } else {
            mobmenu = false;
            $('.icon-mob-menu').removeClass('activated');
            $('.opened').removeClass('opened');
        }
        // console.log(mobmenu);
    });
    $(window).on('resize', function () {
        if ($(window).width() > 768) {
            $('.icon-mob-menu').removeClass('activated');
            $('.opened').removeClass('opened');
            mobmenu = false;
        }
        console.log(mobmenu);
    });
    var selectorPosition = -200;
    var activeProp = 2;
    $('.carselector-next').click(function () {
        if (activeProp < 8) {
            $('.carselector-timeline').find('.active').removeClass('active').next().addClass('active');
            selectorPosition -= 337;
            $('.carselector-timeline').css('transform', 'translateX(' + selectorPosition + 'px)');
            activeProp += 1;
            $('.carselector-prev').removeClass('disabled');
            if (activeProp == 8) {
                $('.carselector-next').addClass('disabled');
            }
        }
    });
    $('.carselector-prev').click(function () {
        if (activeProp > 1) {
            $('.carselector-timeline').find('.active').removeClass('active').prev().addClass('active');
            selectorPosition += 337;
            $('.carselector-timeline').css('transform', 'translateX(' + selectorPosition + 'px)');
            activeProp -= 1;
            $('.carselector-next').removeClass('disabled');
            if (activeProp == 1) {
                $('.carselector-prev').addClass('disabled');
            }
        }
    });
});

/***/ }),

/***/ 419:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });