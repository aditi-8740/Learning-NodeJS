const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB Connected..");
}

module.exports = connectDB ;