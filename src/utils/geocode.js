const request = require('postman-request')

const geocode = (address, callback) => {
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWlybWluZyIsImEiOiJja3k1bnJ2eDEwbHZxMzBvM2U1NHp0ZXVpIn0._F1a25qzcAqt8cTLL-7mQQ'
    request({ url: mapbox_url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)               
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode