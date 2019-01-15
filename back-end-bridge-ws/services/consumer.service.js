const fs = require("fs");
const rp = require('request-promise'),
    cangoorooUri = 'https://pp.cangooroo.net/ws/rest/hotel.svc/Search',
    credential = { Username: 'candidato_t4w', Password: 'candit@!2019'},
    CantFindHotelError = require('../modules/search/errors/cant-find-hotel.error'),
    moment = require('moment'),
    util = require('util');

class CangoorooService {       

    static getHotelById(params) {

        //console.debug(params)
        let _destinationId = ConsumerUtils.findOffersByName(params.destination);

        if(_destinationId === undefined)
            return Promise.reject(new CantFindHotelError('Não há ofertas neste destino'))
        
        let checkinDate = moment(params.checkinDate, ["DD-MM-YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD");       
        let numNights = moment(params.checkoutDate, ["DD-MM-YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD");
        numNights = moment(numNights).diff(checkinDate, 'days');        
        let childs = (params.childs) ? params.childs.map((e) => Number.parseInt(e)) : []
        let qChilds = (childs.length > 0) ? params.childs.length : 0;
        let body = {
            Credential: credential,
            Criteria: {
                DestinationId: _destinationId,
                NumNights: numNights,                        
                CheckinDate: checkinDate,
                MainPaxCountryCodeNationality: "BR",
                SearchRooms: [{
                    NumAdults: params.numAdults,
                    ChildAges: childs,
                    Quantity: qChilds
                }]
            }
        }

        console.debug(`Corpo enviado para serviço de busca: \n ${util.inspect(body)}`)

        return Promise.resolve(rp({
                method: 'POST',
                uri: cangoorooUri,
                body: body,
                json: true,
                jsonReviver:true
        }))
        .then(response => Promise.resolve(response))
        .then(response => {
            let staticData =  fs.readFileSync("./data/"+_destinationId + "_hotels_static_data.json");
            let jsonStaticData = JSON.parse(staticData);
            
            response.Hotels.forEach(hotel=> {
                let staticHotelData = jsonStaticData.find(sh=> sh.id === hotel.HotelId);

                if(staticHotelData)
                    {
                        hotel.Name = staticHotelData.name;
                        hotel.ImageUrl = staticHotelData.urlThumb;
                    }
            });

            return Promise.resolve(response)
        } )
        .catch(err => {
            console.error(err)
            return Promise.reject(new CantFindHotelError('Houve um problema na busca dos hotéis'))
        })
    }
}

class ConsumerUtils {
    static findOffersByName(destName){
        const destinationOffersAvailable = {Miami: 1003944, Orlando: 1010106}
        const regex = new RegExp(destName, 'gi')        
        return destinationOffersAvailable[Object.keys(destinationOffersAvailable).find((e,i,a) => e.match(regex))]
    }
}

module.exports = CangoorooService;