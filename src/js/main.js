import getData from "./services";
import { weatherDescription } from "./constants";
import changeLocation from "./changeLocation";
import { BaseComponent } from "./components/BaseComponent/BaseComponent";
import { RecentLocations } from "./components/recentLocation/RecentLocations";
import { CreateStore } from "./redux/CreateStore";
import { reducer } from "./redux/reducer";
import { CURRENT__LOCATION } from "./redux/actions";

import '../styles/index.scss';
// import '../styles/daily.css';

const initialState = {
  recentLocation: null,
  currentLocation: null
}

const store = new CreateStore(reducer, initialState)

const app = new BaseComponent([RecentLocations], store)
app.init()

const {getWeather} = getData();
const city = document.querySelector('.city'),
      burger = document.querySelector('.burger'),
      nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    if (nav.style.display === 'none') {
        nav.style.display = 'block';
      } else {
        nav.style.display = 'none';
      }
})

const getWeatherOnCity = (lat, lon) => {
    store.dispatch({type: CURRENT__LOCATION, payload: {lat, lon}})
    console.log('STORE', store.getState())

    city.textContent = localStorage.getItem('city');

    getWeather(lat, lon).then((res) => {
        document.querySelector('.weatherDescription').innerHTML = weatherDescription[res.weathercode]
        
        const temp = document.querySelector('.temp');
        temp.textContent = res.currentTemp + ' C';
        // document.querySelector('.ph-thermometer').after(temp);

        const moi = document.querySelector('.moi');
        moi.textContent = res.currentMoi + ' %';
        document.querySelector('.ph-drop').after(moi);

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

changeLocation(getWeatherOnCity);
