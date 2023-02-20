/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/js/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/main.css */ "./src/styles/main.css");






const {getLocation, getCityLocation, getWeather} = (0,_services__WEBPACK_IMPORTED_MODULE_0__["default"])();
const inputCity = document.querySelector('.input-city'),
      weather = document.querySelector('.weather'),
      city = document.querySelector('.city'),
      yourLocation = document.querySelector('.location__city'),
      btnChangeLocation = document.querySelector('.location__change__btn'),
      btnGetLocation = document.querySelector('.location__get__btn');


const getWeatherOnCity = (lat, lon) => {
    getWeather(lat, lon).then((res) => {
        console.log(_constants__WEBPACK_IMPORTED_MODULE_1__.weatherDescription);
        document.querySelector('.weatherDescription').innerHTML = _constants__WEBPACK_IMPORTED_MODULE_1__.weatherDescription[res.weathercode]
        
        const temp = document.querySelector('.temp');
        temp.textContent = res.currentTemp + ' C';
        document.querySelector('.ph-thermometer').after(temp);

        const moi = document.querySelector('.moi');
        moi.textContent = res.currentMoi + ' %';
        document.querySelector('.ph-drop').after(moi);

        // const precipitation = document.querySelector('.precip');
        // precipitation.textContent = res.currentPrecipitation + ' mm';
        // document.querySelector('.ph-cloud-snow').after(precipitation);

        const wind = document.querySelector('.wind');
        wind.textContent = res.wind + ' km/h'; // + Math.floor(res.wind*1000/3600) + 'm/s';
        document.querySelector('.ph-wind').after(wind);

        const sunrise = document.querySelector('.sunrise');
        sunrise.textContent = res.sunrise;
        document.querySelector('.ph-sun-horizon').after(sunrise);

        const sunset = document.querySelector('.sunset');
        sunset.textContent = res.sunset;
        sunrise.after(sunset);
    })
}

// Get loacation
getLocation().then((res) => {
    console.log(res)
    if (!localStorage.getItem('city')) {
        setLocationToLocalStorage(res.city, res.lat, res.lon);
        city.textContent = res.city;
        yourLocation.textContent = `Current location: ${res.city}`;
        getWeatherOnCity(res.lat, res.lon);
    } else {
        city.textContent = localStorage.getItem('city');
        console.log(localStorage.getItem('city'))
        yourLocation.textContent = `Current location: ${localStorage.getItem('city')}`;
        getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'));
    }
    
})

const setLocationToLocalStorage = (city, lat, lon) => {
    localStorage.setItem('city', city);
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
}

// Change location toggle
btnChangeLocation.addEventListener('click', () => {
    document.querySelector('.location__change__wrapper').style.display = 'flex';
    btnChangeLocation.style.display = 'none'

})

// Get location btn
btnGetLocation.addEventListener('click', () => {
    getLocation().then((res) => {
        setLocationToLocalStorage(res.city, res.lat, res.lon);
        city.textContent = res.city;
        yourLocation.textContent = `Current location: ${res.city}`;
        getWeatherOnCity(res.lat, res.lon);
    })
})

// Change location onEnter
inputCity.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        if (document.querySelector('.errorMessage')) {
            document.querySelector('.errorMessage').remove();
        }
        getCityLocation(inputCity.value).then((res) => {
            console.log(res);
            if (Object.values(res).length === 1) {
                const errorMessage = document.createElement('label');
                errorMessage.classList.add('errorMessage');
                errorMessage.textContent = 'City not found';
                inputCity.after(errorMessage)
            } else {
                setLocationToLocalStorage(res.results[0].name, res.results[0].latitude, res.results[0].longitude);
                city.textContent = res.results[0].name;
                yourLocation.textContent = `Current location: ${res.results[0].name}`;
                getWeatherOnCity(res.results[0].latitude, res.results[0].longitude)
                document.querySelector('.location__change__wrapper').style.display = 'none';
                btnChangeLocation.style.display = 'block'
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
            console.log(res);
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
                        city.textContent = el.name;
                        yourLocation.textContent = `Current location: ${el.name}`;
                        getWeatherOnCity(el.latitude, el.longitude);
                        document.querySelector('.location__change__wrapper').style.display = 'none';
                        btnChangeLocation.style.display = 'block'
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkweatherapp"] = self["webpackChunkweatherapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src_styles_main_css-src_js_services_js"], () => (__webpack_require__("./src/js/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.5596802cb6f9f3b2c3f3.js.map