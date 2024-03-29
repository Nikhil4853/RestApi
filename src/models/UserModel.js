// import mongoose
const mongoose = require("mongoose");

// crete user scheema
const userScheema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String
})

// create user model
const userModel = mongoose.model('user', userScheema)
module.exports = userModel;