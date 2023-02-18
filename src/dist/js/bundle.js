/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/http.js":
/*!********************!*\
  !*** ./js/http.js ***!
  \********************/
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

/***/ "./js/services.js":
/*!************************!*\
  !*** ./js/services.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ "./js/http.js");


function getData() {
    const getLocation = () => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)('http://ip-api.com/json/');
        return data;
    }

    const getCityLocation = (city) => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        return data;
    }

    const getWeather = (lat, lon) => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max&timezone=Europe%2FMoscow`);
        data.then(console.log)
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
            }
            return result;
        })
    }

    

    return {getLocation, getCityLocation, getWeather};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getData);

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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./js/services.js");


const {getLocation, getCityLocation, getWeather} = (0,_services__WEBPACK_IMPORTED_MODULE_0__["default"])();

const inputCity = document.querySelector('.input-city'),
      weather = document.querySelector('.weather'),
      city = document.querySelector('.city'),
      btnChangeLocation = document.querySelector('.location__change__btn')


const getWeatherOnCity = (lat, lon) => {
    getWeather(lat, lon).then((res) => {
        const temp = document.querySelector('.temp');
        temp.textContent = res.currentTemp + ' C';
        document.querySelector('.ph-thermometer').after(temp);

        const moi = document.querySelector('.moi');
        moi.textContent = res.currentMoi + ' %';
        document.querySelector('.ph-drop').after(moi);

        const precipitation = document.querySelector('.precip');
        precipitation.textContent = res.currentPrecipitation + ' mm';
        document.querySelector('.ph-cloud-snow').after(precipitation);

        const wind = document.querySelector('.wind');
        wind.textContent = res.wind + ' km/h / ' + Math.floor(res.wind*1000/3600) + 'm/s';
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
    city.textContent = res.city;
    weather.before(city);
    document.querySelector('.location__city').textContent = `Your location: ${res.city}`;
    getWeatherOnCity(res.lat, res.lon);
})

const showLocationInput = () => {
    btnChangeLocation.addEventListener('click', () => {
        document.querySelector('.location__change__wrapper').style.display = 'flex';
    })
}

btnChangeLocation.addEventListener('click', () => {
    document.querySelector('.location__change__wrapper').style.display = 'flex';
    btnChangeLocation.style.display = 'none'

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
                city.textContent = res.results[0].name;
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
                        city.textContent = el.name;
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



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map