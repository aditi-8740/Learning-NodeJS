const mongoose = require('mongoose');

const PostSchema =  mongoose.Schema({
    postText:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,  //type: String/Number/Array/mongoose.Schema.Types.ObjectId
        ref:'User',
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true})
module.exports = mongoose.model("Post",PostSchema);
