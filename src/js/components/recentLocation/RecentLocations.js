import { storage } from "../../utils"
import getData from "../../services"
import { getRecentTemplate } from "./recent-template"

export class RecentLocations {
    constructor() {
        this.locations = []
        this.currentLocation
        this.root
    }

    async init() {
        this.root = document.querySelector('#recent')
        const { getWeatherForRecentLocation } = getData()
        this.currentLocation = await getWeatherForRecentLocation(storage('lat'), storage('lon'))
        console.log(this.currentLocation)
        this.addLocation()
        console.log(storage('lat'), storage('lon'))
        storage('recentLocationt', this.locations)
        this.root.insertAdjacentHTML('afterbegin', getRecentTemplate())
    }

    addLocation() {
        if (this.locations.length < 3) {
            this.locations.push(this.currentLocation)
        } else {
            this.locations.shift()
            this.locations.push(this.currentLocation)
        }
    }
    
}