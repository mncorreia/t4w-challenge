const rp = require('request-promise'),
  cangoorooUri = 'https://pp.cangooroo.net/ws/rest/hotel.svc/Search',
    credential = { Username: 'candidato_t4w', Password: 'candit@!2019'};

class CangoorooService {       

    static getHotelById(params) {

        var qChilds = 1
        return rp({
                method: 'POST',
                uri: cangoorooUri,
                body: {
                    Credential: credential,
                    Criteria: {
                        NumNights: params.numNights || 2,
                        DestinationId: params.destination || 1010106,
                        CheckinDate: params.checkindate || "2019-01-10",
                        MainPaxCountryCodeNationality: "BR",
                        SearchRooms: [{
                            NumAdults: params.adults || 1,
                            ChildAges: params.childsAges || [5],
                            Quantity: qChilds
                        }]
                    }
                },
                json: true
        })            
         
    }

}

module.exports = CangoorooService;