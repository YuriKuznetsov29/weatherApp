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
        this.currentLocation = await getData.getWeatherForRecentLocation(storage('lat'), storage('lon'))
        this.addLocation()
        console.log(this.locations, this.currentLocation)
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