console.log('Building weather app');
//load third party libraries
const yargs=require('yargs');
const request=require('request');
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

    //get the temperature detail for the give address

    var promise=new Promise((resolve,reject)=>{

        var url=`https://api.darksky.net/forecast/582cc8548d784c6c6800c60131c6d65c/${address.lat},${address.lang}`;
        //call weather API and fetch the details
        request({
            url:url,
            json:true,
            proxy:'http://indblrb06intpxy01.ad.infosys.com:80'
        },(error,response,body)=>{
            if(!error){
                resolve({
                    temperature:body.currently.temperature,
                    actualTemperature:body.currently.apparentTemperature
                })
            }
            else{
                console.log('Error :'+error);
                reject(null)
            }
        })
    });
    return promise;
}).then((temperature)=>{
    console.log('Current Temperature :',temperature.temperature);
    console.log('Feels like :',temperature.actualTemperature);

}).catch((error)=>{
    console.log(error);
});


