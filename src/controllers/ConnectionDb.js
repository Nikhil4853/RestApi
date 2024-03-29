// import mongoose from "mongoose";
const  mongoose  = require("mongoose");

// connection url
const uri=`mongodb://localhost:27017/userDataDb`;

const connectDb= async()=>{
    console.log("db is connected")
    return  await mongoose.connect(uri)
}   

module.exports=connectDb;