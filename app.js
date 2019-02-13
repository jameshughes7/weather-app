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
    // console.log(JSON.stringify(body, undefined,2));
    console.log(`Address: ${body.results[0].providedLocation.location}, ${body.results[0].locations[0].postalCode}, ${body.results[0].locations[0].adminArea3}`)
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
});