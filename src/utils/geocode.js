const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWFudmVsb3NvIiwiYSI6ImNrNWNwbHFlYTAydG0zZnNkOXgyemp0Y2wifQ.Tw4YbPNeKpzS0otPrK-dBA&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!')
        } else if(response.body.features.length == 0) {
            callback('No matching results')
        } else {
            callback(null, {
                latitude: response.body.features[0].center[1], 
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode