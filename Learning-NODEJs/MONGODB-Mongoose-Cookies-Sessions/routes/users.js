
const mongoose = require("mongoose")
                                                                      
mongoose.connect("mongodb://127.0.0.1:27017/MongoDB_Basics")      //DATABASE Creation(CoachingCourse created..)  //mongo db humare laptop pr hi chal raha ha   
const userschema = mongoose.Schema({                              //node app. mongoose ke through connect ho mongoDB se.. (127.0.0.1 pe server chl raha ha, at 27017 port pr..)
    username : String,
    name : String,
    age : Number
})

module.exports =  mongoose.model("user" , userschema);          //jo model banaya vo ho gaya export..





// install mongodb    download from mongodb.com their website
// install mongoose   npm i mongoose
// require and setup connection
// make schema 
// create model and export
