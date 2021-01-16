const request = require('request')
require('dotenv').config()
const key = process.env.WEATHER_API_KEY

function forecast(address, callback) {
 const url =
  'https://api.weatherapi.com/v1/current.json?key=' +
  key +
  '&q=' +
  address +
  ' '

 request({ url, json: true }, (error, { body }) => {
  if (error) {
   callback('Unable to connect weather services')
  } else if (body.error) {
   callback('Unable To Find Location')
  } else {
   callback(undefined, {
    temperature: body.current.temp_c + '-C',
    wind_speed: body.current.wind_kph + '-Kmph',
    wind_direction: body.current.wind_dir,
    humidity: body.current.humidity,
    local_time: body.location.localtime,
    climate: body.current.condition.text,
   })
  }
 })
}
module.exports = forecast
