export class BaseComponent {
    constructor(components) {
        this.components = components || []
    }

    init() {
        this.components.forEach(el => {
            const component = new el()
            component.init()
        })
    }
}