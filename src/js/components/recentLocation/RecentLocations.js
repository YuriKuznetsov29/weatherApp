import { storage } from "../../utils"
import getData from "../../services"
import { getRecentTemplate, addRecentItems } from "./recent-template"

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
        addRecentItems(this.locations)
    }

    addLocation() {
        let check = true
        this.locations.forEach(location => {
            if (JSON.stringify(location) === JSON.stringify(this.currentLocation)) {
                check = false
            }
        })
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