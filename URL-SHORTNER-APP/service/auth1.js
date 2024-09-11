const dotenv = require('dotenv').config;
const jwt = require('jsonwebtoken');    //hum users ke liye tokens banayenge...
const { set } = require('mongoose');

function setUser( user ) {    //ye function TOKENS banayega
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }                                                       //TOKENS ko wahi change kr sakta ha jiske pass SECRET_KEY ha...
    return jwt.sign(payload, process.env.SECRET_KEY);       //TOKEN banayega ye line, User ke liye TOKEN assignment..
}
function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET_KEY )  //returns the PAYLOAD...
    } catch (error) {
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
}