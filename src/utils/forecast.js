const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + '°C. There is a ' + Math.round(body.currently.precipProbability * 100)+ '% chance of rain. With a high temperature of ' + body.daily.data[0].temperatureHigh + '°C and a low temperature of ' + body.daily.data[0].temperatureLow + '°C throughout the day.')
        }
    })
}

module.exports = forecast