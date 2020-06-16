const request = require('request');

const Forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6559c27821b7dca81350e8c7cc41bcac&query='+ encodeURIComponent(latitude) +',' + encodeURIComponent(longitude);
    
    request({ url: url, json: true }, (error, response) => {
        if(error)
        {
            callback('Unable to connect to weather services, check your internet connection', undefined);
        }
        else if(response.body.error)
        {
            callback('Unable to find location', undefined);
        }
        else
        {
            callback(undefined, {
                description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                humidity: response.body.current.humidity,
                icon: response.body.current.weather_icons[0]
            })
            // callback(undefined,'It is ' + response.body.current.weather_descriptions[0] + '. The temprature is ' + response.body.current.temperature + ' but it feels like ' + response.body.current.feelslike + '. Humidity is ' + response.body.current.humidity);
        }
    })
} 

module.exports = Forecast