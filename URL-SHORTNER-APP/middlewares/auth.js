// const {getUser} = require('../service/auth')
const {getUser} = require('../service/auth1')

function checkForAuthentication(req, res, next) {   //Authentication- Sirf User ko login krna..
    const tokenCookie = req.cookies?.token;
    res.user = null;

    if (!tokenCookie ) return next();
    

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

// ADMIN, NORMAL        //Authentication- Restrict the ACTIONS on User
function restrictTo(roles = []) {        
    return function (req, res, next) {
        if(!req.user) return res.redirect("/login");    //User LOGIN nahi ha to..
        
        if (!roles.includes(req.user.role)) return res.send("UnAuthorized");    //User LOGIN ha, but Authorized nahi ha..
        
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}






// async function restrictToLoggedInUserOnly (req,res,next){   //Ye middleware pure Authentication ko handle karega...
//     const userUid = req.cookies?.uid;    //ki Browser Bej raha req ke saath cookie ko bi or not?    console.log(req.cookies.uid);

//     if(!userUid) return res.redirect('/login');  // No cookie Value
    
//     const LoggedinUser = getUser(userUid)   //Should have 'cookie' method
//     if(!LoggedinUser) return res.redirect('/login');    //Agar token galat ha...

//     req.user = LoggedinUser;  //Current LoggedIn user..
//     next();
// }


// async function restrictToLoggedInUserOnly (req,res,next){   //Ye middleware pure Authentication ko handle karega...
//     const HeaderValue = req.headers['authentication']

//     if(!userUid) return res.redirect('/login')

//     const token = HeaderValue.split("Bearer ");
//     const User = jwt.verify(token, SECRET_KEY);  //Payload
//     if(!User) return res.redirect('/login');    //Agar token galat ha...

//     req.user = User;  //Current LoggedIn user..
//     next();
// }
