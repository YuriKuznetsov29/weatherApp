export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null
        this.prevState = {}
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState()
        debugger

        this.sub = this.store.subscribe((state) => {
            Object.keys(state).forEach(key => {
                if (JSON.stringify(state[key]) !== JSON.stringify(this.prevState[key])) {
                    components.forEach(component => {
                        if (component.subscribe.includes(key)) {
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            this.prevState = this.store.getState()
        })
    }
}