require('dotenv').config();
require('./config/database').connect();
const express = require('express');

const User = require('./models/User');

const app = express();
app.use(express.json());


app.get('/',(req,res) => {
    res.send("<h1>Welcome in auth project</h1>")
})


app.post('/register', async (req,res) => {
    const { firstName, lastName, email, password } = req.body;

    if(!( firstName && lastName && email && password )){
        res.status(400).send("All fields are required");
    }

    const isUserExist = await User.findOne({email});

    if(isUserExist){
        res.status(401).send('User already exist');
    }
})

module.exports = app;