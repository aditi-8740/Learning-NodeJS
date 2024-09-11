var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Data_Association_YT");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [  //Array jisme aayengii IDs of Posts
    {
      type: mongoose.Schema.Types.ObjectId, //ID ka type
      ref: 'Post',  //Kis model ki ID? Post model ki ID
    },  
  ],
  dp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User' , UserSchema);
