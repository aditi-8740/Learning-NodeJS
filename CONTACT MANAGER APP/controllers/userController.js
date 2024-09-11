const User = require("../models/user.models");
const asyncdHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require("../routes/contactRoutes");
const dotenv = require('dotenv').config();

//@desc Register a User
// @route POST /api/users/register
//@access public
const registerUser =  asyncdHandler(async (req, res) => {                     
    const {username, email, password} = req.body;
    if( !username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const availableUser = await User.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("User already registered")
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);       //Hashed Password the we are going to store- $2b$10$XNBmtx7Ky6RpYJtD1UDc6OgIgk4byi0S2gURAQgOwyupmIHS0n5jO
    console.log("hashed password : ",hashedPassword);
    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,     //PASSWORD is raw Password, So, can't store raw password into our Database,So,we need to hash our password...
    });                                 console.log("created user: ",user);
    if (user) {
        res.status(201).json({_id: user._id, email: user.email});
    }else{
        throw new Error("User data is not valid")
    }
});

//@desc Login a User
// @route POST /api/users/login
//@access public
const loginUser = asyncdHandler( async (req, res) => {
    const {email,password} = req.body;
    if( !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const user = await User.findOne({email}) //User already present in database or not..
    //Compare password with hashedPassword
    if(user && await bcrypt.compare(req.body.password, user.password)){
        const payload = {   
            username: user.username,
            email: user.email,
            _id : user._id
        };
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY,{ expiresIn: '20m'});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc Get all information of Current User
// @route GET /api/users/current-User
//@access private
const currentUser =  async (req, res) => {
    res.status(200).json(req.user);
};


module.exports = {
    registerUser,
    loginUser,
    currentUser
}