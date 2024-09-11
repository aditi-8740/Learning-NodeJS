const express = require("express")
const app = express()

app.set("view engine","ejs");
app.use(express.static('./public'))                     //app.use() - har route ke liye ,se pehle ye line chalegii... 
                                                        //(PATH batana ha ki exactly hume static file kaha pr milengii...)

app.get('/',function(req,res){
    res.render("index",{age:18 , name:"harsh"})         //res.send("<h1>hello from root route</h1>")
})

app.get('/about',function(req,res){
    // res.render("about",{age:12 , hobby:"painting"})  
    throw Error("i don't know")                 
})

app.get('/error',function(req,res){
   throw Error("Something went wrong")      
})

app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
})

app.listen(3000)

// BACKEND ka server code ha..