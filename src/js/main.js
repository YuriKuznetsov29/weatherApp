import getData from "./services";
import { weatherDescription } from "./constants";
import changeLocation from "./changeLocation";
import { BaseComponent } from "./components/BaseComponent/BaseComponent";
import { RecentLocations } from "./components/recentLocation/RecentLocations";
import { CurrentWeather } from "./components/currentWeather/CurrentWeather";
import { Precipitation } from "./components/precipitation/precipitation";
import { SelectLocation } from "./components/selectLocation/SelectLocation";
import { Header } from "./components/header/Header";
import { Charts } from "./components/Charts/Charts";
import { CreateStore } from "./redux/CreateStore";
import { reducer } from "./redux/reducer";
import { CURRENT__LOCATION } from "./redux/types";
import { storage } from "./utils";

import '../styles/index.scss';
// import '../styles/daily.css';

const background = document.querySelector('.background-image')
background.style.background = `url("/background${Math.floor(Math.random() * 5)}.jpg") 50% no-repeat`
background.style.backgroundSize = `cover`

const initialState = {
  recentLocations: null,
  currentLocation: storage('currentLocation') || null//{lat: '', lon: '', city: ''}
}

const store = new CreateStore(reducer, initialState)

const app = new BaseComponent([Header, SelectLocation, RecentLocations, CurrentWeather, Precipitation, Charts], store)
app.init()

// const {getWeather, getWeatherForRecentLocation} = getData();

// getWeatherForRecentLocation('40.71', '-74.01').then(console.log)
// const city = document.querySelector('.city'),
//       burger = document.querySelector('.burger'),
//       nav = document.querySelector('.nav');

// burger.addEventListener('click', () => {
//     if (nav.style.display === 'none') {
//         nav.style.display = 'block';
//       } else {
//         nav.style.display = 'none';
//       }
// })



// const getWeatherOnCity = (lat, lon) => {
//     store.dispatch({type: CURRENT__LOCATION, payload: {lat: +lat, lon: +lon, city: localStorage.getItem('city')}})

//     city.textContent = localStorage.getItem('city');

//     getWeather(lat, lon).then((res) => {
//         document.querySelector('.weatherDescription').innerHTML = weatherDescription[res.weathercode]
        
//         const temp = document.querySelector('.temp');
//         temp.textContent = res.currentTemp + ' C';
//         // document.querySelector('.ph-thermometer').after(temp);

//         const moi = document.querySelector('.moi');
//         moi.textContent = res.currentMoi + ' %';
//         document.querySelector('.ph-drop').after(moi);

//         const wind = document.querySelector('.wind');
//         wind.textContent = res.wind + ' km/h'; // + Math.floor(res.wind*1000/3600) + 'm/s';
//         document.querySelector('.ph-wind').after(wind);

//         const sunrise = document.querySelector('.sunrise');
//         sunrise.textContent = res.sunrise;
//         document.querySelector('.ph-sun-horizon').after(sunrise);

//         const sunset = document.querySelector('.sunset');
//         sunset.textContent = res.sunset;
//         sunrise.after(sunset);
//     })
// }

// changeLocation(getWeatherOnCity);
