const http = require('http');   
const express = require('express'); //Express kud-b-kud http module ko require karegi
const app= express();   //CLEAN CODE

app.get('/',(req,res)=>{    //Jab bi '/' path par GET request aayegi to ye run ho jayega..
    res.send("hello from Home Page");
})
app.get('/about',(req,res)=>{       //"http://localhost:8000/about?a=23&user_name=aditi&search_query=javascript+interview+questions"
    console.log(req);
    res.send("hello from About Page"+" Hey " + req.query.user_name );  //Eis par bi ye about page par hi jaa raha ha..
})                                           //Url module ka kaam to yahi kr raha ha..automatically<By,default..

const myServer = http.createServer(app);

myServer.listen(8000,()=>{console.log("Server started!");})
