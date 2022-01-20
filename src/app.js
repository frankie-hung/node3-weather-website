const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Frankie Hung',
        description: 'Use this site to get your weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Frankie Hung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        helpText: 'This is some helpful text',
        name: 'Frankie Hung'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const location = req.query.address
    geocode(location, (err, { latitude, longitude, location } = {}) => {
        if (err) return res.send({err})

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) return res.send({err})

            console.log(location)
            console.log(forecastData)

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Frankie Hung'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Frankie Hung'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})