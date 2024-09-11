const User = require('../models/user.models')
const {v4: uuidv4} = require('uuid')
// const {setUser, getUser} = require('../service/auth')
const {setUser, getUser} = require('../service/auth1')

async function handleUserSignUp(req,res) {
    const {name, password, email} = req.body;
    //Can do VALIDATIONS ON PASSWORD AND ALL like length patterns email valid
    await User.create({
        name:  name,
        email: email,
        password: password
    });
    return res.redirect('/')
}

async function handleUserLogIn(req,res){    //User login ha, to user ShortId generate kr sakta ha...
    const {email , password} = req.body;
    const foundUser =  await User.findOne({
        email: email,
        password: password
    });                 console.log(foundUser);
    if (!foundUser) {   //user nahi mila then
        console.log("Invalid Username or Password");
        return res.render('login' , {
            Error: "Invalid Username or Password"
        });
    }
    /*const sessionId = uuidv4();
    setUser(sessionId, foundUser);*/
    // res.cookie('uid',sessionId)  //cookie_name, value   //** Jab bi hum server pr REQUEST karenge, to ye cookie vaha jayegii...
    
    const token = setUser(foundUser);   //Creating a TOKEN..
    res.cookie('token',token,{
        domain: 'localhost'     //domain: 'https://www.piyushgarg.dev/' THIRD PARTY COOKIE
    })     //Meri cookies me TOKEN aa chuka ha...
    return res.redirect('/');       //https://expressjs.com/en/api.html#res.cookie
    
    // const token = setUser(foundUser);   console.log(token);
    // return res.json({token})
}
module.exports = { handleUserSignUp, handleUserLogIn}