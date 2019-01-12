const Promise = require('bluebird'),
CangoorooService = require('../../../services/consumer.service'),
ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
views = path.resolve('./views')

exports.findHotels = (req, res, next) => {
    //Modular em env vars
    let {checkinDate, numNights, destination, childsAge, rooms} = req.params

    

    return Promise.resolve(CangoorooService.getHotelById(req.params))
    .then(body => {
        console.log(views)
        return Promise.resolve(fs.readFileSync(views + '/search.ejs'));
    })
    .then((file) => {
        console.log(file)
        res.send(ejs.render(file))
    })
    .catch(err => new Error(err.message))
    
}