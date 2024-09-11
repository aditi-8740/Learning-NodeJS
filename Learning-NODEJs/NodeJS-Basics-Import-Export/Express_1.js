const express = require('express')
const app = express()

// FLOW OF EXPRESS Application.
// middleware sab routes se pehle banate ha ,taki eisme likha code sabse pehle execute ho...
app.use(function(req,res,next){
  console.log('hello from middleware')
  next();
})

function my_middlerware_func(req,res,next){
  console.log("hello world from middleware 2 ----");        //console.log(req);    //console.log(res)
  next();
}
app.use(my_middlerware_func)

app.get('/',function(req,res){
  res.send("hellow world!")
})

app.get('/profile',function(req,res){
  res.send("hello world from profile route")
})

app.get('/profile/:username',function(req,res){
  res.send(`hello from ${req.params.username}`)
})

// app.get('/profile/harshita',function(req,res){
//   res.send("hello from harshita")
// })


app.listen(3000)
