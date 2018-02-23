const request=require('request');

var getWeatherDetails=(address,proxyRequired=true)=>{
    var promise=new Promise((resolve,reject)=>{

        var url=`https://api.darksky.net/forecast/582cc8548d784c6c6800c60131c6d65c/${address.lat},${address.lang}`;
        //call weather API and fetch the details
        
        var options={
            url:url,
            json:true,
        }

        if(proxyRequired)
            options.proxy='http://10.81.82.132:80';
        
        request(options,(error,response,body)=>{
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
}
module.exports.getWeatherDetails=getWeatherDetails;