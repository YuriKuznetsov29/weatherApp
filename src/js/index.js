import getData from "./services";

const {getLocation, getCityLocation, getWeather} = getData();

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


