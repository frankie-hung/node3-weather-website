const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e8e6cc2bfa81a0fcf095b2b320ce2752&query=' + latitude + ',' + longitude

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {

            // console.log(url)
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            const data = "It is currently " + temp + " degree and it feels like " + feelslike + " degree. The humidity is " + humidity + "."
            callback(undefined, data)
        }
    })
}

module.exports = forecast