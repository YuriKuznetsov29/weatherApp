import { getSelectLocationTemplate, insertSearchResults } from "./selectLocation-template"
import getData from "../../services"
import { storage } from "../../utils"
import { changeCurrentLocation } from "../../redux/actions"
import { CURRENT__LOCATION } from "../../redux/types"

export class SelectLocation {
    constructor(store) {
        this.store = store
        this.subscribe = []
        this.listeners = ['onclick', 'oninput']
        this.root = document.querySelector('#select')
        this.addListeners()
    }

    init() {
        this.root.insertAdjacentHTML('afterbegin', getSelectLocationTemplate())
        this.searchRes = this.root.querySelector('[data-type="results"]')
        this.btnCurrentLocation = this.root.querySelector('[data-type="getLocation"]')
        this.inputSearch = this.root.querySelector('[data-type="inputLocation"]')
        this.inputIcon = this.root.querySelector('.search__icon')
    }

    addListeners() {
        const {getLocation, getCityLocation} = getData();

        this.root.onclick = (event) => {
            if (event.target.dataset.type === 'inputLocation') {
                this.inputSearch.classList.add('search__active')
                this.inputIcon.classList.add('search__active')
                this.btnCurrentLocation.style.display = 'flex'
            }

            if (event.target.dataset.type === 'getLocation') {
                getLocation().then((res) => {
                    this.store.dispatch(changeCurrentLocation({lat: +res.lat, lon: +res.lon, city: res.city, timezone: res.timezone, country: res.country}))
                    storage('currentLocation', this.store.getState().currentLocation)
                    this.clearFind()
                })
                .catch(console.error)
            }

            if (event.target.dataset.type === 'setLocation') {
                console.log(event.target.dataset.location)
                const location = event.target.dataset.location.split(',')
                this.store.dispatch(changeCurrentLocation({lat: +location[0], lon: +location[1], city: location[2], timezone: location[3], country: location[4]}))
                storage('currentLocation', this.store.getState().currentLocation)
                this.clearFind()
            }
        }

        this.root.oninput = () => {
            getCityLocation(this.inputSearch.value).then((res) =>{
                const {results} = res
                console.log(res)
                if (results) {
                    this.searchRes.innerHTML = ''
                    this.btnCurrentLocation.classList.add('search__active')
                    results.forEach(location => {
                        this.searchRes.insertAdjacentHTML('afterbegin', insertSearchResults(location))
                    })
                }
            })
            .catch(console.error)
        }

        document.body.onclick = (event) => {
            if (!event.target.closest('.search__wrapper')) {
                this.clearFind()
            }
        }
    }

    clearFind() {
        this.root.querySelector('[data-type="inputLocation"]').value = ''
        this.btnCurrentLocation.style.display = 'none'
        this.btnCurrentLocation.classList.remove('search__active')
        this.inputSearch.classList.remove('search__active')
        this.inputIcon.classList.remove('search__active')
        this.searchRes.innerHTML = ''
    }

    destroy() {
        this.listeners.forEach(listener => this.root[listener] = null)
        document.body.onclick = null
    }
}