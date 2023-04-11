export class CreateStore {
    constructor(reducer, initialState) {
        this.state = reducer({...initialState}, {type: '__INIT__'})
        this.listeners = []
        this.reducer = reducer
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action)
        this.listeners.forEach(listener => listener(this.state))
    }

    subscribe(fn) {
        this.listeners.push(fn)
        return {
            unsubscribe() {
                this.listeners = listeners.filter(el => el !== fn)
            }
        } 
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state))
    }
}