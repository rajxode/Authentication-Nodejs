
// import mongoose
const mongoose = require('mongoose');

// creating schema for storing user's data
const userSchema = new mongoose.Schema({
    // name of user
    firstName:{
        type: String,
        default: null,
    },
    lastName:{
        type: String,
        default: null,
    },
    // email address
    email:{
        type: String,
        unique:true,
    },
    password:{
        type: String,
    },
    token:{
        type: String,
    },
});


// exporting the model made from schema for storing and reading data
module.exports = mongoose.model('User',userSchema);