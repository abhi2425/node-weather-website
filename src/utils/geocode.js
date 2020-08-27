const request = require("request")
require('dotenv').config()
const key = process.env.MAPBOX_API_KEY

function geocode(address, callback) {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?&access_token=" + key;

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect Location services");
        } else if (response.body.features.length === 0) {
            callback("Unable To Find Location");
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });

}
module.exports = geocode