import { StoreSubscriber } from "../../StoreSubscriber"

export class BaseComponent {
    constructor(components, store) {
        this.components = components || []
        this.store = store
        this.subscriber = new StoreSubscriber(store)
    }

    init() {
        this.components = this.components.map(Component => {
            const component = new Component(this.store)
            component.init()
            return component
        })
        this.subscriber.subscribeComponents(this.components)
    }
}