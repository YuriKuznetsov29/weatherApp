import { getHeaderTemplate } from "./header-template"

export class Header {
    constructor(store) {
        this.store = store
        this.root = document.querySelector('#header')
        this.subscribe = ['currentLocation']
        this.listeners = []

        this.addListeners()
    }

    init() {
        this.currentLocation = this.store.getState().currentLocation
        this.root.insertAdjacentHTML('afterbegin', getHeaderTemplate(this.currentLocation))
        this.city = this.root.querySelector('[data-type="city"]')
    }

    addListeners() {
        document.body.onscroll = () => {
            if (window.pageYOffset > 0) {
                this.root.classList.add('scroll')
            } else {
                this.root.classList.remove('scroll')
            }
        }
    }

    storeChanged({currentLocation}) {
        this.currentLocation = currentLocation
        this.city.textContent = currentLocation.city
    }

    destroy() {
        document.body.onscroll = null
    }
}