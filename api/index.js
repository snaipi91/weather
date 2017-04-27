const path       =   require('path');
const request    =   require('request');
const express    =   require('express');
const bodyParser =   require('body-parser');

const host = "localhost";
const port = process.env.port || 3000;

// api https://home.openweathermap.org/api_keys
const TOKEN = "04c0c094ec1404f1eef45b110acf93a6";
const GET_CITY_NAME = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + TOKEN + "&q=";
const GET_WEATHER_DAYS = "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=" + TOKEN + "&q=";

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/:city', function(req, res){
    req.query.cnt = (req.query.cnt) ? req.query.cnt : 1;
    var _cityUrl = GET_CITY_NAME + req.params.city + '&cnt=' +req.query.cnt;
    console.log('Запрос на ' + _cityUrl);

    request(
        {
            'url': _cityUrl
        },

        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }
    );
});

app.get('/api/days/:days', function (req, res) {
    req.query.cnt = (req.query.cnt) ? req.query.cnt : 1;
    var _weatherDays = GET_WEATHER_DAYS + req.query.city + '&cnt=' +req.params.days;
    console.log('Запрос на ' + _weatherDays);

    request(
        {
            'url': _weatherDays
        },

        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }
    );
});

app.listen(3000, function() {

    console.log('Server link http://localhost:' + port)

});

