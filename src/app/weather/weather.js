const request = require('request');

let getWeather = (lat, long, callback) => {
    request({
        url:`https://api.darksky.net/forecast/0eac6225d3f5590ea4772d6ff76a91f7/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.')
        }
    })
}

module.exports.getWeather = getWeather; 

