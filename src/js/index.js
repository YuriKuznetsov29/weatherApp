import getData from "./services";
import { weatherDescription } from "./constants";


const {getLocation, getCityLocation, getWeather} = getData();
const inputCity = document.querySelector('.input-city'),
      weather = document.querySelector('.weather'),
      city = document.querySelector('.city'),
      yourLocation = document.querySelector('.location__city'),
      btnChangeLocation = document.querySelector('.location__change__btn'),
      btnGetLocation = document.querySelector('.location__get__btn');


const getWeatherOnCity = (lat, lon) => {
    getWeather(lat, lon).then((res) => {
        console.log(weatherDescription);
        document.querySelector('.weatherDescription').innerHTML = weatherDescription[res.weathercode]
        
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


