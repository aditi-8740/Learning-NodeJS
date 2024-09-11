var express = require('express');
var router = express.Router();
const usermodel = require("./users")


router.get('/', function(req, res, next) {
  req.session.UrLangGreeting = "Hola";      //Server pr 'UrLangGreeting' naam se SESSION ban jayega..jiski value "hola" hogi //mere browser ke liye server pr save ho gaya 'UrLangGreeting' ki value hola
                                         
  res.render('index', { title: 'Express' });
});

router.get('/checkGreet', function(req , res){
  console.log(req.session);                 //Ek route ma banaya gaya session dusre route ma access kiya ja sakta ha..
  if (req.session.UrLangGreeting == "Hola") {
    res.send("UrLangGreeting is  Italian ")               //SERVER restart hone se SESSION delete ho jata ha..
  } else {
    res.send("X-X-X------ UrLangGreeting session not set -----X-X-X")
  }
})

router.get('/removeGreet' , function(req , res) {
  req.session.destroy((err)=>{
    console.log(err);
    res.send("greet removed ")
  })
})


router.get('/cookies' , function(req , res) {
  res.cookie('age',25);                               //Browser pr set karni ha cookie, so res.cookie likha, response ma bhenge...
  console.log("Cookie created ....");
  res.render('index',{title: "COOKIE CREATED"})
})
router.get('/cookiesRead' , function(req , res) {
  console.log(req.cookies.age)                          //Browser pr cookies ha, eisliye cookies ka data lena ha(read krna ha) to kahan milegaa? request ma..
  res.render('index',{title: "COOKIE READING "})
})
router.get('/cookiesDelete' , function(req , res) {
  res.clearCookie();
  console.log("cookie is deleted now...");
  res.send("cookie CLEARED")
})


router.get('/createUser', async function(req, res, next) {    // CREATE DOCUMENT(Schema)    in model 'user'
  const created_user = await usermodel.create({           //asynchronous task ha so use 'await'
    username : "aditya.8756640",                      
    age :100,
    name :"aditi"
  })
  res.send("created user..")
});

router.get('/allusers', async function (req , res) {    //READ DOCUMENT(Schema)
  const allusers = await usermodel.find({name: "harsh"})   //total users
  res.send(allusers)
})

router.get('/oneuser', async function (req , res) {     //READ DOCUMENT(Schema)
  const oneuser = await usermodel.findOne({name : "harsh"})
  console.log(oneuser);
  res.send(oneuser)
})

router.get('/delete', async function(req,res) {
  let deleteduser = await usermodel.findOneAndDelete({  //DELETE DOCUMENT(Schema)
    name : "aditi"
  })
  res.send(deleteduser)
})

module.exports = router;

// CREATION , READING , UPDATION , DELETE