const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true , "Please add the contact name"],
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  phone:{
    type:String,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  }
},{timestamps:true});

module.exports = mongoose.model("Contact",contactSchema);
