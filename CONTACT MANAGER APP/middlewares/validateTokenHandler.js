const jwt = require('jsonwebtoken');

const validateToken = async (req,res,next) =>{
    let token, user; console.log(req.headers);      //console.log(req.headers['authorization']);
    const HeaderValue = req.headers['authorization']; 
    if (HeaderValue && HeaderValue.startsWith("Bearer")) {
        token = HeaderValue.split("Bearer ")[1]; console.log(token);
        user = jwt.verify( token, process.env.SECRET_KEY);    //returns payload       
    }
    if(token){
        req.user = user;
        next();
    }else{
        res.status(401).json("User is not authorized..Or token is missing in request...");
    }

}

module.exports = {
    validateToken,
}