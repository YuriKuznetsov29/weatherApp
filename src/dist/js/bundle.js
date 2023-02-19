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
    3: 'overcast',
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
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)('http://ip-api.com/json/');
        return data;
    }

    const getCityLocation = (city) => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        return data;
    }

    const getWeather = (lat, lon) => {
        const data = (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max&timezone=Europe%2FMoscow`);
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
                weathercode: res.hourly.weathercode[hour],
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
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/js/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");




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



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map