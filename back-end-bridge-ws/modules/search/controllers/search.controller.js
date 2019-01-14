const Promise = require('bluebird'),
    CangoorooService = require('../../../services/consumer.service'),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    views = path.resolve('./views'),
    moment = require('moment'),
    { check, validationResult } = require('express-validator/check'),
    { sanitizeQuery } = require('express-validator/filter'),
    ValidationFormError = require('../errors/validate-form.error'),
    CantFindHotelError = require('../errors/cant-find-hotel.error'),
    util = require('util')


exports.findHotels = (req, res, next) => {
    //Modular em env vars
    let { checkinDate, numNights, destination, childsAge, rooms } = req.query

    function _validationServiceResponse(response) {
        //console.info(`Cangooro response INCOMING: ${util.inspect(response)}`)
        if (response.Error) return Promise.reject(new CantFindHotelError('Não foi possível encontrar os hoteis'))

        return Promise.resolve(response)
    }

    function _sortResultByAscPrice(response) {
        var mResponse = response,
        hotels = mResponse['Hotels'];
        
        //console.debug(`IS ARRAY${Array.isArray(hotels)}`)
        if (hotels.length > 0) {           

            
            hotels = hotels.map((hotel, index, arr) => {
                hotel['Rooms'] = hotel['Rooms'].sort((a, b) => {
                    return a.TotalSellingPrice.Value - b.TotalSellingPrice.Value
                })
                return hotel
            })

            //console.debug(util.inspect(hotels))

            hotels = hotels.sort((ha,hb) => {                
                return ha.Rooms[0].TotalSellingPrice.Value - hb["Rooms"][0].TotalSellingPrice.Value
            })

            mResponse['Hotels'] = hotels
        }

        return Promise.resolve(mResponse)
    }

    return Promise.resolve(req.query)
        .then((query) => CangoorooService.getHotelById(query))
        .then(_validationServiceResponse)
        .then(_sortResultByAscPrice)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(CantFindHotelError, err => res.status(404).json({ error: err.message }))
        .catch(err => next(err))

}

exports.getChecks = [
    sanitizeQuery('childs')
        .customSanitizer((value) => Array.isArray(value) ? value : Array(value)),
    check('destination', 'O destino é necessário para busca de ofertas').not().isEmpty(),
    check('checkinDate', 'A data de check-in é obrigatório').not().isEmpty(),
    check('numAdults', 'O número de adultos é obrigatório').not().isEmpty().toInt(),
    check('childs', 'Insira somente as idades das crianças')
        .custom((childs) => childs.every((e) => Number.isInteger(parseInt(e)))),
    check('checkoutDate', 'A data de check-in é obrigatório').not().isEmpty()
]


exports.validationCheck = (req, res, next) => {
    //console.log('Running validation check')

    return Promise.resolve(validationResult(req))
        .then(errors => {
            if (!errors.isEmpty()) res.status(400).json({ Error: { form: errors.array() } })
            return next()
        })

}