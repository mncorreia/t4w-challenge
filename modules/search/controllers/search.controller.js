const Promise = require('bluebird'),
CangoorooService = require('../../../services/consumer.service');

exports.findHotels = (req, res, next) => {
    //Modular em env vars
    let {checkinDate, numNights, destination, childsAge, rooms} = req.params

    

    return Promise.resolve(CangoorooService.getHotelById(req.params))
    .then(body => {
        console.log(body)
    })
    .then(() => res.render('search.page'))
    .catch(err => new Error(err.message))
    
}