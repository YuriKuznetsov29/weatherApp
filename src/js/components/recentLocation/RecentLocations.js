import { storage } from "../../utils"
import getData from "../../services"
import { getRecentTemplate } from "./recent-template"

export class RecentLocations {
    constructor(store) {
        this.locations = []
        this.currentLocation = store.currentLocation
        this.root
        this.store = store
        this.subscribe = ['currentLocation']
    }

    init() {
        this.root = document.querySelector('#recent')
        
        this.locations = storage('recentLocationt') || []
        this.root.insertAdjacentHTML('afterbegin', getRecentTemplate(this.locations))
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
    }
    
}