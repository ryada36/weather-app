const request=require('request');

var getAddress=(address,callback,proxyRequired=true)=>{

    //create a promise and return from this fucntion
    var promise=new Promise((resolve,reject)=>{

        var options={
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json:true,
        }
        if(proxyRequired)
            options.proxy='http://10.81.82.132:80';

        request(options,(error,response,body)=>{
            if(error){
                reject(null);
                callback('unable to connect '+error);
            }   
            else{
                if(body.status==='OK'){
                    resolve({
                        formatted_address:body.results[0].formatted_address,
                        lat:body.results[0].geometry.location.lat,
                        lang:body.results[0].geometry.location.lng
                    });
                }
                else{
                    callback('no result found for the given address');
                    reject(null)
                }
            }
                
        })

    })
return promise;
    
}
module.exports.getAddress=getAddress;