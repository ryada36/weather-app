/**
 * Express web server app
 */
const express=require('express');
const hbs=require('hbs');
var geocode=require('./geocode');
var weather=require('./weather');
var weatherModel=require('./weatherModel');

var app=express();
var port=process.env.PORT || 3000;

//middleware section setup
app.use(express.static(__dirname+'/app'));

//custom middleware for fetching the weather information
app.use((req,res,next)=>{
    console.log('inside middleware');
    var proxyRequired=false;
    if(!process.env.PORT)
        proxyRequired=true;
    geocode.getAddress("kanpur",(message)=>{console.log(message)},proxyRequired)
        .then((address)=>{
            weatherModel.latitude=address.lat;
            weatherModel.longitude=address.lang;
            return weather.getWeatherDetails(address,proxyRequired);
        }).then((temperature)=>{
            weatherModel.currentTemperature=temperature.actualTemperature;
            console.log(weatherModel)
        }).catch((error)=>{
            console.log('Error:',error);
        })

    next();
})
app.set('view engine','hbs');


//routes section
app.get('/',(req,res)=>{
    res.render(__dirname+'/app/index.hbs',weatherModel);
})
app.get('/about',(req,res)=>{
    res.send('Hello world!');
})
app.listen(port,()=>{
    console.log('server listening at port :',port);
})