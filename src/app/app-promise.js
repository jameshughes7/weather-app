const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    let encodedAddress = encodeURIComponent(argv.address); 
    let geoCodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=gUOl7687qTZWzReEfmuKDtmnC7v3ixtJ&location=${encodedAddress}`;
    // Axios allows you to chain calls together instead of nesting!
    // Axios understands json by default
    // Axios returns a promise
    axios.get(geoCodeUrl).then((response) => {
        // if (response.data.results[0].locations[0].geoQualityCode === 'A1XAX') {
        //     throw new Error('Unable to find that address.');
        // }
        // removing this as if block as MapQuest API
        // doesn't seem to take invalid 
        let lat = response.data.results[0].locations[0].latLng.lat;
        let long = response.data.results[0].locations[0].latLng.lng;
        let weatherUrl = `https://api.darksky.net/forecast/0eac6225d3f5590ea4772d6ff76a91f7/${lat},${long}`
        console.log(response.data.results[0].providedLocation.location);
        return axios.get(weatherUrl);
    }).then((response) => {
        let temperature = response.data.currently.temperature;
        let apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    }).catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connnect to the API servers');
        } else {
            console.log(error.message);
        }
    })

    // TODO default location so that you wouldn't have to give an address argument





