import { getCurrentWeatherTemplate } from "./currentWeather-template"

export class CurrentWeather {
    constructor(store) {
        this.store = store
        this.subscribe = ['currentLocation']
    }

    init() {
        this.root = document.querySelector('#currentWeather')
        const currentLocation = this.store.getState().currentLocation
        getCurrentWeatherTemplate(this.root, currentLocation)
    }

    storeChanged({currentLocation}) {
        getCurrentWeatherTemplate(this.root, currentLocation)
    }
}