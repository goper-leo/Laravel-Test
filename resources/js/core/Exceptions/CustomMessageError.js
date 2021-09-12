class CustomMessageError extends Error {

    constructor(message) {
        super(message)

        this.name = 'CustomMessageError'
        window.app.$notify.error(message)
    }
}

export default CustomMessageError
