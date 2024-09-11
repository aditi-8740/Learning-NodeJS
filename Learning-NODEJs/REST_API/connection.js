const mongoose = require('mongoose')

async function connectMongoDb(url) {
    return mongoose.connect(url)
    .then((value)=>{
        console.log("MongoDB connected");   //console.log(value); //promise resolved value
    })                                      //MongoDB ab sahi se connect ho chuka ha, now I can do CRUD operations on mongodb database
    .catch(err => console.log(err))
}

module.exports = { connectMongoDb }