const express = require('express');
const path = require('node:path');
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config();
const { MongoDbConnect } = require('./connection');
const app = express();
const URL = require('./models/url.models');

const { checkForAuthentication, restrictTo } = require('./middlewares/auth')
const urlRouter = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRouter = require('./routes/user')

const PORT = process.env.PORT;

MongoDbConnect("mongodb://localhost:27017/Short-URL");

//Ma Express ko bata raha hu ,1) Mera view engine ha ejs  2) Aur jitne bi mere views ha(ejs files), wo './views' folder ma paddi ha...
app.set("view engine", "ejs");      //mera view engine ejs ha, muje server-side rendering krni ha....Muje view engine use krna ha..
// app.set("views", path.resolve('./views'))       //Mere views kaha ha..       
//https://ejs.co/#install

app.use(express.static('./public'));   //So, EXPRESS knows that all static assets are in public folder

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());         //ensure that you have cookie-parser middleware installed and set up in your Express app. "cookie-parser"- a middleware that parses cookies being used in your Express application.
app.use(checkForAuthentication);

app.use('/url', restrictTo(["NORMAL","ADMIN"]), urlRouter);  //NONRMAL User pr restrict hona chahiye..
app.use('/' , staticRoute);
app.use('/user', userRouter);


app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
}) 