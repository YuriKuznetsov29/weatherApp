import { getChartsTemplate } from "./charts-template"
import { createCharts } from "./createCharts"

export class Charts {
    constructor(store) {
        this.store = store
        this.subscribe = ['currentLocation']
        this.listeners = []
        
    }

    init() {
        this.root = document.querySelector('#charts')
        this.root.insertAdjacentHTML('afterbegin', getChartsTemplate())
        const currentLocation = this.store.getState().currentLocation
        if (currentLocation) {
            createCharts(currentLocation, this.root)
        }
    }

    storeChanged({currentLocation}) {
        createCharts(currentLocation, this.root)
    }
}