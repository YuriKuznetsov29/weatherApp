import { getPrecipitationTemplate } from "./precipitation-template"

export class Precipitation {
    constructor(store) {
        this.store = store
        this.subscribe = ['currentLocation']
    }

    init() {
        this.root = document.querySelector('#precipitation')
        const currentLocation = this.store.getState().currentLocation
        getPrecipitationTemplate(this.root, currentLocation)
    }

    storeChanged({currentLocation}) {
        getPrecipitationTemplate(this.root, currentLocation)
    }
}