import { BaseComponent } from "./components/BaseComponent/BaseComponent";
import { RecentLocations } from "./components/recentLocation/RecentLocations";
import { CurrentWeather } from "./components/currentWeather/CurrentWeather";
import { Precipitation } from "./components/precipitation/precipitation";
import { SelectLocation } from "./components/selectLocation/SelectLocation";
import { Header } from "./components/header/Header";
import { Charts } from "./components/Charts/Charts";
import { CreateStore } from "./redux/CreateStore";
import { reducer } from "./redux/reducer";
import { storage } from "./utils";

import '../styles/index.scss';

const background = document.querySelector('.background-image')
background.style.background = `url("backgrounds/background${Math.floor(Math.random() * 5)}.jpg") 50% no-repeat`
background.style.backgroundSize = `cover`

const initialState = {
  recentLocations: null,
  currentLocation: storage('currentLocation') || null//{lat: '', lon: '', city: ''}
}

const store = new CreateStore(reducer, initialState)

const app = new BaseComponent([Header, SelectLocation, RecentLocations, CurrentWeather, Precipitation, Charts], store)
app.init()