
class ThrottleError extends Error {

    constructor(message) {
        super(message)
        
        this.errors = {}
        window.app.$notify.error(message + ' Please try again later.')
    }

}

export default ThrottleError
