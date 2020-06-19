const request = require("request");

function geocode(address, callback) {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?&access_token=pk.eyJ1IjoiYWJoaWluMjQyNSIsImEiOiJja2JqNTQxcWowa215MnNteTdpd2FkYWwyIn0.IOQupMMNwtszul5Wfhc3XQ";

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect Location services");
        } else if (response.body.features.length === 0) {
            callback("Unable To Find Location");
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    });

}
module.exports = geocode;