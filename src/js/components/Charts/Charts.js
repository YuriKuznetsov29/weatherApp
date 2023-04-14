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
        createCharts(this.store.getState().currentLocation)
    }

    storeChanged({currentLocation}) {
        createCharts(currentLocation)
    }
}