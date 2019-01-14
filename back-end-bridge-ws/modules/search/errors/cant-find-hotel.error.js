class CantFindHotelError extends Error {
    constructor(message){
        super(message)
        Error.captureStackTrace(this, CantFindHotelError)
    }
}

module.exports = CantFindHotelError;