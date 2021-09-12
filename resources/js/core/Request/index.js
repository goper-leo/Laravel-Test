import axios from 'axios'
import ValidationError from '@core/Exceptions/ValidationError'
import ModelNotFoundError from '@core/Exceptions/ModelNotFoundError'
import CustomMessageError from '@core/Exceptions/CustomMessageError'
import ThrottleError from '@core/Exceptions/ThrottleError'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'


axios.interceptors.response.use(((response) => {
    return response
}), ((error) => {

    if (!error.status) {
        if (Object.prototype.hasOwnProperty.call(error, "response")) {

            if (error.response == undefined) {
                // Network error - no internet connection
                window.app.$notify.error(`Please check your internet connection.`)
                return Promise.reject(error)
            }

            const { response } = error
            const { message, errors } = response.data

            switch (response.status) {
                case 422:
                    throw new ValidationError(message, errors)
                case 404:
                    throw new ModelNotFoundError(message, errors)
                case 429:
                    throw new ThrottleError(message)
                case 406:
                    throw new CustomMessageError(message, errors)
                case 401:
                    window.app.$store.dispatch('auth/logout')
                    break
                default:
                    window.app.$notify.error('Something went wrong. Please refresh the page and try again.')
            }

            return Promise.reject(response)
        }
            
    }

        
}))
