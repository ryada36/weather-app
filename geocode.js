const request=require('request');

var getAddress=(address,callback)=>{

    //create a promise and return from this fucntion
    var promise=new Promise((resolve,reject)=>{
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json:true,
            proxy:'http://indblrb06intpxy01.ad.infosys.com:80'
        },(error,response,body)=>{
            if(error){
                reject(null);
                callback('unable to connect');
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