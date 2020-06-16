const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const Geocode = require('../Utils/geocode');
const Forecast = require('../Utils/forecast');

const port = process.env.PORT || 3000

//Path variables
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

//hbs config
app.set('view engine' , 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialspath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Type in the box below to get Real time weather info',
        forecast: 'Some forecast',
        name: 'Aviral'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Aboout Page',
        name: 'Aviral'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'Some helpful text',
        name: 'Aviral'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'No address provided'
        });
    }
    else
    {
        Geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error)
            {
                res.send({
                    error: error
                });
            }
            else
            {
                Forecast(latitude, longitude, (error, forecastData) => {
                    if(error)
                    {
                        res.send({
                            error: error
                        });
                    }
                    else
                    {
                        res.send({
                            description: forecastData.description,
                            temperature: forecastData.temperature,
                            feelslike: forecastData.feelslike,
                            humidity: forecastData.humidity,
                            icon: forecastData.icon,
                            location: location,
                            address: req.query.address,
                            latitude,
                            longitude
                        });
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.render('error');
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
})