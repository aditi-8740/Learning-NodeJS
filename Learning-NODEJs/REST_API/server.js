// Using MongoDB Database for storing data in Database(Reading ,creating,updating,Deleting data in Database)
// In this file,Just Deciding flow,like first hum MongoDb connect karenge,then middlewares initialize karenge,the routes initialize karenge..
const express = require('express');
const dotenv = require('dotenv').config();

const { connectMongoDb } = require('./connection')
const {logReqRes} = require('./middlewares/index')
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/Piyush_Garg_NodeJS_Series_DB")

// Middlewares -Plugins
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logReqRes("log.txt"))

// Routes                        //Adding middleware  //   '/users' userRouter ko point kr raha ha..
app.use('/api/users', userRouter)     //Agar '/user' router pr request aati ha,to auske liye userRouter ko use krna..

app.listen(PORT,(err)=>{
    console.log(`Server running on PORT ${PORT}`);
})



//CRUD Operations on models using mongoose 
// https://mongoosejs.com/docs/models.html
// https://mongoosejs.com/docs/api/model.html#Model.findOne()   In summary, Model.findOne() returns a query object that you need to execute to get the document.
// https://mongoosejs.com/docs/documents.html

// CRUD operations in mongoose: 
// https://mongoosejs.com/docs/api/model.html
