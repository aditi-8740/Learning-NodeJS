const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
  {
    content :{
      type: String,
      required: true
    },
    complete :{
      type:Boolean,
      default:false
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    subtodos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtodo"
    }] //Array of sub todos
  },{timestamps :true})

module.exports = mongoose.model("ToDo",todoSchema)