"use strict";
(self["webpackChunkweatherapp"] = self["webpackChunkweatherapp"] || []).push([["src_styles_main_css-src_js_changeLocation_js-src_js_constants_js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n/* Container */\r\n.container {\r\n    width: 100%;\r\n    max-width: 1230px;\r\n    margin: 0 auto;\r\n    padding: 0 15px;\r\n}\r\n\r\n/* Background */\r\n.video-bg {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    z-index: -1000;\r\n}\r\n\r\n.background {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    z-index: -1000;\r\n    /* background-color: rgba(0, 0, 0, 0.2); */\r\n    background-color: rgba(83, 83, 83);\r\n}\r\n\r\n/* Header */\r\n.header {\r\n    height: 80px;\r\n    background-color: rgba(0, 0, 0, 0.3);\r\n\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 1000;\r\n}\r\n\r\n.header__inner {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    height: 80px;\r\n    font-size: 16px;\r\n}\r\n\r\n/* Nav */\r\n.nav {\r\n    display: flex;\r\n    height: 100%;\r\n    font-size: 18px;\r\n}\r\n\r\n.nav__link {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 0 10px;\r\n    color: #fff;\r\n    text-decoration: none;\r\n}\r\n\r\n.nav__link:hover {\r\n    cursor: pointer;\r\n    background-color: #004AF2;\r\n}\r\n\r\n/* Location */\r\n.location {\r\n    color: #fff;\r\n}\r\n\r\n.location__get__btn:hover {\r\n    cursor: pointer;\r\n    text-decoration: underline;\r\n}\r\n\r\n.location__change__btn:hover {\r\n    cursor: pointer;\r\n    text-decoration: underline;\r\n}\r\n\r\n.location__change__wrapper {\r\n    position: relative;\r\n    display: block;\r\n    flex-direction: column;\r\n}\r\n\r\n.errorMessage {\r\n    position: absolute;\r\n    top: 38px;\r\n    left: 0;\r\n    color: red;\r\n}\r\n\r\n.location__change__find {\r\n    width: 200px;\r\n    position: absolute;\r\n    top: 38px;\r\n    background-color: #fff;\r\n}\r\n\r\n.finded-city {\r\n    padding: 5px;\r\n    color: black;\r\n}\r\n\r\n.finded-city:hover {\r\n    cursor: pointer;\r\n    background-color: #004AF2;\r\n}\r\n\r\n.input-city {\r\n    width: 200px;\r\n    height: 25px;\r\n    margin: 3px 0;\r\n    position: relative;\r\n}\r\n\r\n.burger {\r\n    color: #fff;\r\n    display: none;\r\n    font-size: 26px;\r\n}\r\n\r\n.active {\r\n    background-color: #004AF2;\r\n}\r\n\r\n/* Description */\r\n.description {\r\n    display: flex;\r\n    flex-direction: column;\r\n    color: #fff;\r\n\r\n}\r\n\r\n.city {\r\n    margin: 100px auto 0;\r\n    font-size: 80px;\r\n}\r\n\r\n.weatherDescription {\r\n    margin: 100px auto 0;\r\n    font-size: 50px;\r\n}\r\n\r\n\r\n/* Weather data */\r\n.weather {\r\n    margin: 100px auto 0;\r\n}\r\n\r\n.weather__inner {\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n.values {\r\n    color: #fff;\r\n    font-size: 50px;\r\n}\r\n\r\n.weather__dataWrapper {\r\n    text-align: center;\r\n}\r\n\r\n/* Media */\r\n\r\n@media(max-width: 900px) {\r\n    .nav {\r\n        display: none;\r\n        height: auto;\r\n        min-height: calc(100vh - 80px);\r\n        width: 100%;\r\n        padding-top: 9px;\r\n        position: absolute;\r\n        top: 100%;\r\n        left: 0;\r\n        right: 0;\r\n        z-index: 1;\r\n        flex-direction: column;\r\n        background-color: rgba(0, 0, 0, 0.85);\r\n    }\r\n\r\n    .nav__link {\r\n        display: block;\r\n        padding: 10px 15px;\r\n        text-align: right;\r\n    }\r\n\r\n    .burger {\r\n        display: block;\r\n    }\r\n}\r\n\r\n@media(max-width: 650px) {\r\n    .weather__inner {\r\n        flex-direction: column;\r\n    }\r\n\r\n    .weather__dataWrapper {\r\n        margin-bottom: 30px;\r\n    }\r\n}\r\n\r\n@media(max-width: 450px) {\r\n    .city {\r\n        font-size: 50px;\r\n    }\r\n\r\n    .weatherDescription {\r\n        margin-top: 25px;\r\n        font-size: 30px;\r\n    }\r\n\r\n    .weather {\r\n        margin-top: 30px;\r\n    }\r\n\r\n    .values {\r\n        font-size: 35px;\r\n    }\r\n\r\n}", "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"AAAA;;;IAGI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;AACA,cAAc;AACd;IACI,WAAW;IACX,iBAAiB;IACjB,cAAc;IACd,eAAe;AACnB;;AAEA,eAAe;AACf;IACI,eAAe;IACf,MAAM;IACN,OAAO;IACP,eAAe;IACf,gBAAgB;IAChB,cAAc;AAClB;;AAEA;IACI,eAAe;IACf,MAAM;IACN,OAAO;IACP,eAAe;IACf,gBAAgB;IAChB,cAAc;IACd,0CAA0C;IAC1C,kCAAkC;AACtC;;AAEA,WAAW;AACX;IACI,YAAY;IACZ,oCAAoC;;IAEpC,eAAe;IACf,MAAM;IACN,OAAO;IACP,QAAQ;IACR,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,YAAY;IACZ,eAAe;AACnB;;AAEA,QAAQ;AACR;IACI,aAAa;IACb,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,eAAe;IACf,WAAW;IACX,qBAAqB;AACzB;;AAEA;IACI,eAAe;IACf,yBAAyB;AAC7B;;AAEA,aAAa;AACb;IACI,WAAW;AACf;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,kBAAkB;IAClB,cAAc;IACd,sBAAsB;AAC1B;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,kBAAkB;IAClB,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,YAAY;IACZ,YAAY;AAChB;;AAEA;IACI,eAAe;IACf,yBAAyB;AAC7B;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA,gBAAgB;AAChB;IACI,aAAa;IACb,sBAAsB;IACtB,WAAW;;AAEf;;AAEA;IACI,oBAAoB;IACpB,eAAe;AACnB;;AAEA;IACI,oBAAoB;IACpB,eAAe;AACnB;;;AAGA,iBAAiB;AACjB;IACI,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,WAAW;IACX,eAAe;AACnB;;AAEA;IACI,kBAAkB;AACtB;;AAEA,UAAU;;AAEV;IACI;QACI,aAAa;QACb,YAAY;QACZ,8BAA8B;QAC9B,WAAW;QACX,gBAAgB;QAChB,kBAAkB;QAClB,SAAS;QACT,OAAO;QACP,QAAQ;QACR,UAAU;QACV,sBAAsB;QACtB,qCAAqC;IACzC;;IAEA;QACI,cAAc;QACd,kBAAkB;QAClB,iBAAiB;IACrB;;IAEA;QACI,cAAc;IAClB;AACJ;;AAEA;IACI;QACI,sBAAsB;IAC1B;;IAEA;QACI,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;QAChB,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;;IAEA;QACI,eAAe;IACnB;;AAEJ","sourcesContent":["*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n/* Container */\r\n.container {\r\n    width: 100%;\r\n    max-width: 1230px;\r\n    margin: 0 auto;\r\n    padding: 0 15px;\r\n}\r\n\r\n/* Background */\r\n.video-bg {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    z-index: -1000;\r\n}\r\n\r\n.background {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    z-index: -1000;\r\n    /* background-color: rgba(0, 0, 0, 0.2); */\r\n    background-color: rgba(83, 83, 83);\r\n}\r\n\r\n/* Header */\r\n.header {\r\n    height: 80px;\r\n    background-color: rgba(0, 0, 0, 0.3);\r\n\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 1000;\r\n}\r\n\r\n.header__inner {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    height: 80px;\r\n    font-size: 16px;\r\n}\r\n\r\n/* Nav */\r\n.nav {\r\n    display: flex;\r\n    height: 100%;\r\n    font-size: 18px;\r\n}\r\n\r\n.nav__link {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 0 10px;\r\n    color: #fff;\r\n    text-decoration: none;\r\n}\r\n\r\n.nav__link:hover {\r\n    cursor: pointer;\r\n    background-color: #004AF2;\r\n}\r\n\r\n/* Location */\r\n.location {\r\n    color: #fff;\r\n}\r\n\r\n.location__get__btn:hover {\r\n    cursor: pointer;\r\n    text-decoration: underline;\r\n}\r\n\r\n.location__change__btn:hover {\r\n    cursor: pointer;\r\n    text-decoration: underline;\r\n}\r\n\r\n.location__change__wrapper {\r\n    position: relative;\r\n    display: block;\r\n    flex-direction: column;\r\n}\r\n\r\n.errorMessage {\r\n    position: absolute;\r\n    top: 38px;\r\n    left: 0;\r\n    color: red;\r\n}\r\n\r\n.location__change__find {\r\n    width: 200px;\r\n    position: absolute;\r\n    top: 38px;\r\n    background-color: #fff;\r\n}\r\n\r\n.finded-city {\r\n    padding: 5px;\r\n    color: black;\r\n}\r\n\r\n.finded-city:hover {\r\n    cursor: pointer;\r\n    background-color: #004AF2;\r\n}\r\n\r\n.input-city {\r\n    width: 200px;\r\n    height: 25px;\r\n    margin: 3px 0;\r\n    position: relative;\r\n}\r\n\r\n.burger {\r\n    color: #fff;\r\n    display: none;\r\n    font-size: 26px;\r\n}\r\n\r\n.active {\r\n    background-color: #004AF2;\r\n}\r\n\r\n/* Description */\r\n.description {\r\n    display: flex;\r\n    flex-direction: column;\r\n    color: #fff;\r\n\r\n}\r\n\r\n.city {\r\n    margin: 100px auto 0;\r\n    font-size: 80px;\r\n}\r\n\r\n.weatherDescription {\r\n    margin: 100px auto 0;\r\n    font-size: 50px;\r\n}\r\n\r\n\r\n/* Weather data */\r\n.weather {\r\n    margin: 100px auto 0;\r\n}\r\n\r\n.weather__inner {\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n.values {\r\n    color: #fff;\r\n    font-size: 50px;\r\n}\r\n\r\n.weather__dataWrapper {\r\n    text-align: center;\r\n}\r\n\r\n/* Media */\r\n\r\n@media(max-width: 900px) {\r\n    .nav {\r\n        display: none;\r\n        height: auto;\r\n        min-height: calc(100vh - 80px);\r\n        width: 100%;\r\n        padding-top: 9px;\r\n        position: absolute;\r\n        top: 100%;\r\n        left: 0;\r\n        right: 0;\r\n        z-index: 1;\r\n        flex-direction: column;\r\n        background-color: rgba(0, 0, 0, 0.85);\r\n    }\r\n\r\n    .nav__link {\r\n        display: block;\r\n        padding: 10px 15px;\r\n        text-align: right;\r\n    }\r\n\r\n    .burger {\r\n        display: block;\r\n    }\r\n}\r\n\r\n@media(max-width: 650px) {\r\n    .weather__inner {\r\n        flex-direction: column;\r\n    }\r\n\r\n    .weather__dataWrapper {\r\n        margin-bottom: 30px;\r\n    }\r\n}\r\n\r\n@media(max-width: 450px) {\r\n    .city {\r\n        font-size: 50px;\r\n    }\r\n\r\n    .weatherDescription {\r\n        margin-top: 25px;\r\n        font-size: 30px;\r\n    }\r\n\r\n    .weather {\r\n        margin-top: 30px;\r\n    }\r\n\r\n    .values {\r\n        font-size: 35px;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/js/changeLocation.js":
/*!**********************************!*\
  !*** ./src/js/changeLocation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/js/services.js");


const changeLocation = (weatherFunc) => {
    const inputCity = document.querySelector('.input-city'),
          yourLocation = document.querySelector('.location__city'),
          btnChangeLocation = document.querySelector('.location__change__btn'),
          btnGetLocation = document.querySelector('.location__get__btn'),
          navLink = document.querySelectorAll('.nav__link');

    const {getLocation, getCityLocation} = (0,_services__WEBPACK_IMPORTED_MODULE_0__["default"])();

    navLink.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(e.currentTarget)
            link.classList.add('active');
        })
    })

 
    getLocation().then((res) => {
        console.log(res)
        if (!localStorage.getItem('city')) {
            setLocationToLocalStorage(res.city, res.lat, res.lon);
            yourLocation.textContent = `Current location: ${res.city}`;
            weatherFunc(res.lat, res.lon);
        } else {
            console.log(localStorage.getItem('city'))
            yourLocation.textContent = `Current location: ${localStorage.getItem('city')}`;
            weatherFunc(localStorage.getItem('lat'), localStorage.getItem('lon'));
        }
    })
    
    const setLocationToLocalStorage = (city, lat, lon) => {
      localStorage.setItem('city', city);
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
    }
    
    // // Change location toggle
    // btnChangeLocation.addEventListener('click', () => {
    //   document.querySelector('.location__change__wrapper').style.display = 'flex';
    //   btnChangeLocation.style.display = 'none'
    
    // })
    
    // Get location btn
    btnGetLocation.addEventListener('click', () => {
      getLocation().then((res) => {
          setLocationToLocalStorage(res.city, res.lat, res.lon);
          console.log(res.city)
          yourLocation.textContent = `Current location: ${res.city}`;
            weatherFunc(res.lat, res.lon);
      })
    })
    
    // Change location onEnter
    inputCity.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) {
          if (document.querySelector('.errorMessage')) {
              document.querySelector('.errorMessage').remove();
          }
          getCityLocation(inputCity.value).then((res) => {
              if (Object.values(res).length === 1) {
                  const errorMessage = document.createElement('label');
                  errorMessage.classList.add('errorMessage');
                  errorMessage.textContent = 'City not found';
                  inputCity.after(errorMessage)
              } else {
                  setLocationToLocalStorage(res.results[0].name, res.results[0].latitude, res.results[0].longitude);
                  yourLocation.textContent = `Current location: ${res.results[0].name}`;
                    weatherFunc(res.results[0].latitude, res.results[0].longitude)
                //   document.querySelector('.location__change__wrapper').style.display = 'none';
                //   btnChangeLocation.style.display = 'block'
                  clearFindData();
              }
          })
      }
    })
    
    // Find location on input
    inputCity.addEventListener('input', () => {
      
          if (document.querySelector('.errorMessage')) {
              document.querySelector('.errorMessage').remove();
          }
          if (document.querySelector('.finded-city')) {
              document.querySelectorAll('.finded-city').forEach(elem => {
                  elem.remove();
              })
          }
          getCityLocation(inputCity.value).then((res) => {
              if (Object.values(res).length === 1) {
                  const errorMessage = document.createElement('label');
                  errorMessage.classList.add('errorMessage');
                  errorMessage.textContent = 'City not found';
                  inputCity.after(errorMessage)
              } else {
                  res.results.forEach(el => {
                      const div = document.createElement('div');
                      div.classList.add('finded-city');
                      div.textContent = `${el.name}  ${el.country_code}`;
                      document.querySelector('.location__change__find').append(div)
                      div.addEventListener('click', () => {
                          console.log(el)
                          setLocationToLocalStorage(el.name, el.latitude, el.longitude);
                          yourLocation.textContent = `Current location: ${el.name}`;
                            weatherFunc(el.latitude, el.longitude);
                        //   document.querySelector('.location__change__wrapper').style.display = 'none';
                        //   btnChangeLocation.style.display = 'block'
                          clearFindData();
                      })
                  });
              }
          })
    })
    
    const clearFindData = () => {
      if (document.querySelector('.errorMessage')) {
          document.querySelector('.errorMessage').remove();
      }
      if (document.querySelector('.finded-city')) {
          document.querySelectorAll('.finded-city').forEach(elem => {
              elem.remove();
          })
      }
      inputCity.value = '';
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeLocation);

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHART_COLORS": () => (/* binding */ CHART_COLORS),
/* harmony export */   "weatherDescription": () => (/* binding */ weatherDescription)
/* harmony export */ });
const weatherDescription = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog and depositing rime fog',
    48: 'Fog and depositing rime fog',
    51: 'Drizzle: light',
    53: 'Drizzle: moderate',
    55: 'Drizzle: dense intensity',
    56: 'Freezing Drizzle: ligth',
    57: 'Freezing Drizzle: dense intensity',
    61: 'Rain: slight',
    63: 'Rain: moderate',
    65: 'Rain: heavy intensity',
    66: 'Freezing Rain:: light',
    67: 'Freezing Rain:: heavy intensity',
    71: 'Snow fall: slight',
    73: 'Snow fall: moderate',
    75: 'Snow fall: heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: slight',
    81: 'Rain showers: moderate',
    82: 'Rain showers: violent',
    85: 'Snow showers slight',
    86: 'Snow showers heavy',
    95: 'Thunderstorm: Slight or moderate',
    96: 'hunderstorm with slight',
    99: 'hunderstorm with heavy hail',
}

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};


/***/ }),

/***/ "./src/js/http.js":
/*!************************!*\
  !*** ./src/js/http.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "request": () => (/* binding */ request)
/* harmony export */ });
const  request = async (url) => {
    let res = await fetch(url)
    let data = await res.json();
    return data;
} 

/***/ }),

/***/ "./src/js/services.js":
/*!****************************!*\
  !*** ./src/js/services.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ "./src/js/http.js");


function getData() {
    const getLocation = () => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)('https://api.ipgeolocation.io/ipgeo?apiKey=17a8d753063e4a20a9531fe3638de576');
        // function success(pos) {
        //     var crd = pos.coords;
        //     console.log('Ваше текущее местоположение:');
        //     console.log(`Широта: ${crd.latitude}`);
        //     console.log(`Долгота: ${crd.longitude}`);
        //     console.log(`Плюс-минус ${crd.accuracy} метров.`);
        //     console.log(crd);
        //   };

        //   navigator.geolocation.getCurrentPosition(success)
          
          return data.then(res => {
            return {
                city: res.city,
                lat: res.latitude,
                lon: res.longitude,
            }
          })
        // return data;
    }

    // 
    // http://ip-api.com/json/

    const getCityLocation = (city) => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        return data;
    }

    const getLastDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const lastDate = new Date(year, month, day + 15);
        const lastYear = lastDate.getFullYear();
        const lastmonth = lastDate.getMonth();
        const lastDay = lastDate.getDate();
        const transformLastDate = `${lastYear}-${(lastmonth + 1) < 10 ? `0${(lastmonth + 1)}` : (lastmonth + 1)}-${lastDay < 10 ? `0${lastDay}` : lastDay}`;
        console.log(transformLastDate);
        return transformLastDate;
    }

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const currentDate = `${year}-${(month + 1) < 10 ? `0${(month + 1)}` : (month + 1)}-${day < 10 ? `0${day}` : day}`;
        // console.log(currentDate);
        return currentDate;
    }

    // const sunCalk = () => {
    //     const coefficent = 100 / 60;
    //     console.log(coefficent)
    //     const timeArr = [];
    //     const sunArr = [];
    //     let hour = 0;
    //     let minutes = 0;
    //     let sun = 0
    //     for (let i = 0; i < 1440; i++) {
    //         sunArr.push(sun)
    //         sun += coefficent;
    //     }
    //     console.log(sunArr)

    //     for (let i = 0; i < 1463; i++) {
    //         if (minutes < 60) {
    //             timeArr.push((hour <= 9 ? '0' + hour : hour) + ':' + (minutes <= 9 ? '0' + minutes : minutes))
    //             minutes++;
    //         } else {
    //             hour++;
    //             minutes = 0;
    //         }
    //     }
    //     return timeArr;
    // }

    // sunCalk()

    const getWeather = (lat, lon, day = getCurrentDate()) => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=Europe%2FMoscow&start_date=${day}&end_date=${getLastDate()}`);
        data.then(console.log)
        console.log(day);
        return transformWeatherData(data);
    } 

    const transformWeatherData = (data) => {
        const hour = new Date().getHours()
        return data.then((res) => {
            let result = {
                currentTemp: res.hourly.temperature_2m[hour],
                currentMoi: res.hourly.relativehumidity_2m[hour],
                currentPrecipitation: res.hourly.precipitation[hour],
                wind: res.hourly.windspeed_10m[hour],
                sunrise: res.daily.sunrise[0].slice(-5),
                sunset: res.daily.sunset[0].slice(-5),
                weathercode: res.hourly.weathercode[hour],
                dailyTemp: res.hourly.temperature_2m.slice(0, 24),
                dailyMoi: res.hourly.relativehumidity_2m.slice(0, 24),
                dailyWind: res.hourly.windspeed_10m.slice(0, 24),
                dailyWindDir: res.hourly.winddirection_10m.slice(0, 24),
                dailyPressure: res.hourly.pressure_msl.slice(0, 24),
                dailyTime: res.hourly.time.slice(0, 24).map(item => item.slice(-5)),
            }
            return result;
        })
    }

    return {getLocation, getCityLocation, getWeather};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getData);

/***/ })

}]);
//# sourceMappingURL=src_styles_main_css-src_js_changeLocation_js-src_js_constants_js.42ee807f53d56ca42dc5.js.map