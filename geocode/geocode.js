const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address); 

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=gUOl7687qTZWzReEfmuKDtmnC7v3ixtJ&location=${encodedAddress}`,
        json: true
    } , (error, response, body) => {
        if (error) {
            callback('Unable to connect to MapQuest Servers');
        } else if (body.results[0].locations[0].geoQualityCode === 'A1XAX') {
            callback('Unable to find that address');
        } else {
            console.log(body.results[0]);
            callback(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;