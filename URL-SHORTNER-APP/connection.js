const mongoose = require('mongoose');

async function MongoDbConnect(url){
    mongoose.connect(url)
    .then(()=>{
        console.log("MongoDb connected");
    })
}

module.exports = { MongoDbConnect}