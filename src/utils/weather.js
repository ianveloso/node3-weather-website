const request = require('request')
const proxy = process.env.PROXY || ''

const weather = ({latitude, longitude, location}, callback) => {
    const url = 'https://api.darksky.net/forecast/04f72884c3ddcb10a5a8c8de4fb11330/' + latitude + ',' + longitude + '?units=si&lang=en'

    request({ url: url, json: true, proxy: proxy }, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service', null)
        } else if(response.body.error) {
            callback('Unable to find location', null)
        } 
        else {
            callback(null, {location: location, forecast: response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. High of " + response.body.daily.data[0].temperatureHigh + " and a Low of " + response.body.daily.data[0].temperatureLow})
        }  
    })
}

module.exports = weather