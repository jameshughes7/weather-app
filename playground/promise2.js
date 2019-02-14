const request = require('request');

let geoCodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address); 

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=gUOl7687qTZWzReEfmuKDtmnC7v3ixtJ&location=${encodedAddress}`,
            json: true
        } , (error, response, body) => {
            if (error) {
                reject('Unable to connect to MapQuest Servers');
            } else if (body.results[0].locations[0].geoQualityCode === 'A1XAX') {
                reject('Unable to find that address');
            } else {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });
};


geoCodeAddress('Flat 1 125 Trinity Road London SW177SQ').then((location) => {
    // Pretty print technique
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})