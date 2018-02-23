console.log('Building weather app');
//load third party libraries
const yargs=require('yargs');
const weather=require('./weather');
const geocode=require('./geocode');


var argv=yargs
    .options({
        t:{
            alias:'address',
            description:'Enter the address for weather info',
            demand:true
        }
    }).help().argv;

geocode.getAddress(argv.address,(message)=>{
    console.log(message);
}).then((address)=>{
    console.log('Formatted address :',address.formatted_address);
    console.log('Latitude :',address.lat);
    console.log('longitude :',address.lang)
    return weather.getWeatherDetails(address)
}).then((temperature)=>{
    console.log('Current Temperature ',temperature.temperature);
    console.log('Feels like :',temperature.actualTemperature);

}).catch((error)=>{
    console.log(error);
});


