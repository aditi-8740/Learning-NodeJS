const express = require("express")
const dotenv = require('dotenv').config()
const connectDB = require("./config/dbConnection");
const contacts = require('./MOCK_DATA (1).json');
const { errorHandler } = require("./middlewares/errorHandler");

connectDB();
const app = express();

const PORT = process.env.PORT;      //5000

app.use(express.urlencoded({extended: false}))  //It's BODY Parser
app.use(express.json())         //parses the data stream that we receive from the client on the server side

app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}`);
})
