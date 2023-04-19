import { StoreSubscriber } from "../../StoreSubscriber"
import { storage } from "../../utils"
import getData from "../../services"
import { changeCurrentLocation } from "../../redux/actions"

export class BaseComponent {
    constructor(components, store) {
        this.components = components || []
        this.store = store
        this.subscriber = new StoreSubscriber(store)
    }

    init() {
        if (!storage('currentLocation')) {
            const {getLocation} = getData()
            getLocation().then((res) => {
                storage('currentLocation', {lat: res.lat, lon: res.lon, city: res.city, timezone: res.timezone, country: res.country})
                this.store.dispatch(changeCurrentLocation({lat: +res.lat, lon: +res.lon, city: res.city, timezone: res.timezone, country: res.country}))
                this.runComponent()
            })
            return
        }

        this.runComponent()
    }

    runComponent() {
        this.components = this.components.map(Component => {
            const component = new Component(this.store)
            component.init()
            return component
        })
        this.subscriber.subscribeComponents(this.components)
    }
}