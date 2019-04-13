const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohammad Ali Shahbazi'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mohammad Ali Shahbazi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Mohammad Ali Shahbazi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, address} = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            
            res.send({
                address,
                forecast: forecastData,
                location: req.query.address
            })
        })

    });
    
})


app.get("/help/*", (req, res) => {
    res.render('404', {
        text: 'Help article not found!',
        name: 'Mohammad Ali Shahbazi',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        text: 'Page not found!',
        name: 'Mohammad Ali Shahbazi',
        title: '404'

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})