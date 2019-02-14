const request = require('request');
const yargs = require('yargs');

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

    console.log(argv);

const encodedAddress = encodeURIComponent(argv.address);

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=gUOl7687qTZWzReEfmuKDtmnC7v3ixtJ&location=${encodedAddress}`,
    json: true
} , (error, response, body) => {
    if (error) {
        console.log('Unable to connect to MapQuest Servers')
    } else if (body.results[0].locations[0].geoQualityCode === 'A1XAX') {
        console.log('Unable to find that address');
    } else {
        console.log(`Address: ${body.results[0].providedLocation.location}`);
        console.log(`Street: ${body.results[0].locations[0].street}`);
        console.log(`PostCode: ${body.results[0].locations[0].adminArea3}`);
        console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
    }
});