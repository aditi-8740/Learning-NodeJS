// DATA Modelling with mongoose :

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017")
// 1st way
const userSchema1 = mongoose.Schema(
    {
        username: String,
        email: String,
        isActive: Boolean,
        password: String
    }
)
// 2st way
const userSchema2 = mongoose.Schema(
    {
        username :{  //GOOD Practise (more details about field)
           type: String,
           required: true,
           unique: true,
        },
        email :{
           type: String,
           unique: true,
           required: true
        },
        password :{
           type:String, //"Custom error messages"
           required:[true,"password is required"],     // https://mongoosejs.com/docs/validation.html
        }
    },{timestamps : true}    // https://mongoosejs.com/docs/timestamps.html
)

module.exports = mongoose.model("User",userSchema2);