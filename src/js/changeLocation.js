

const blockChangeLocation = () => {
    const inputCity = document.querySelector('.input-city'),
      city = document.querySelector('.city'),
      yourLocation = document.querySelector('.location__city'),
      btnChangeLocation = document.querySelector('.location__change__btn'),
      btnGetLocation = document.querySelector('.location__get__btn');

    const {getLocation, getCityLocation, getWeather, getDataAvito} = getData();

    // Get loacation
    getLocation().then((res) => {
        if (!localStorage.getItem('city')) {
            setLocationToLocalStorage(res.city, res.lat, res.lon);
            city.textContent = res.city;
            yourLocation.textContent = `Current location: ${res.city}`;
            getWeatherOnCity(res.lat, res.lon);
        } else {
            city.textContent = localStorage.getItem('city');
            yourLocation.textContent = `Current location: ${localStorage.getItem('city')}`;
            // getWeatherOnCity(localStorage.getItem('lat'), localStorage.getItem('lon'));
        }
        
    })
}

export default blockChangeLocation;