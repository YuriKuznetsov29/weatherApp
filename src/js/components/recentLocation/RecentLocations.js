import { storage } from "../../utils"
import { getRecentTemplate, addRecentItems } from "./recent-template"
import { CURRENT__LOCATION } from "../../redux/actions"

export class RecentLocations {
    constructor(store) {
        this.locations = []
        this.root
        this.store = store
        this.subscribe = ['currentLocation']

    }

    init() {
        this.root = document.querySelector('#recent')
        this.currentLocation = this.store.getState().currentLocation
        this.locations = storage('recentLocationt') || []
        this.root.insertAdjacentHTML('afterbegin', getRecentTemplate())
        if (!this.locations[0]) {
            this.addLocation()
        }
        addRecentItems(this.locations)
        this.addListeners()

    }

    addListeners() {
        this.root.onclick = (event) => {
            const recentLocation = event.target.closest('[data-type="recentItem"]')
            if (recentLocation) {
                console.log(recentLocation.dataset.recentlocation)
                const [lat, lon, city, timezone] = recentLocation.dataset.recentlocation.split(',')
                this.store.dispatch({type: CURRENT__LOCATION, payload: {lat: +lat, lon: +lon, city: city, timezone: timezone}})
                storage('currentLocation', this.store.getState().currentLocation) // реальзовать функцию для автоматического обновления LacalStorage из стора
            }
        }
    }

    addLocation() {
        let check = true
        this.locations.forEach(location => {
            if (JSON.stringify(location) === JSON.stringify(this.currentLocation)) {
                check = false
            }
        })
        console.log("TRUE")
        if (this.locations.length < 3 && check) {
            console.log('add')
            // debugger
            this.locations.push(this.currentLocation)
        } else if (check) {
            this.locations.shift()
            this.locations.push(this.currentLocation)
        }
    }

    storeChanged({currentLocation}) {
        this.currentLocation = currentLocation
        this.addLocation()
        storage('recentLocationt', this.locations)
        addRecentItems(this.locations)
    }
    
}