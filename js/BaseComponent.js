class BaseComponent {
    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error('Cannot create an instance of abstract class BaseComponent!')
        }
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop]
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop]

                target[prop] = newValue

                if (newValue !== oldValue) {
                    this.UpdateIU()
                }

                return true
            },
        })
    }

    UpdateIU() {
        throw new Error("The 'updateUI' method must be implemented.")
    }
}

export default BaseComponent