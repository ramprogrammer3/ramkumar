
require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.url;

const connectDB = () =>{
    mongoose.connect(url,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }).then(()=>{
        console.log("DB connection successfull");
    }).catch((error)=>{
        console.log("DB connection failed");
        process.exit(1);
    })
}

module.exports = connectDB;