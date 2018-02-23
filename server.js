/**
 * Express web server app
 */
const express=require('express');
const hbs=require('hbs');
var app=express();
var port=process.env.PORT || 3000;

//middleware section setup
app.use(express.static(__dirname+'/app'));
app.set('view engine','hbs');


//routes section
app.get('/',(req,res)=>{
    res.render(__dirname+'/app/index.hbs',{message:'Welcome to weather app'});
})
app.get('/about',(req,res)=>{
    res.send('Hello world!');
})
app.listen(port,()=>{
    console.log('server listening at port :');
})