class ValidationFormError extends Error {
    constructor(...args){
        super(...args)
        Error.captureStackTrace(this, ValidationFormError)
    }
}

module.exports = ValidationFormError;