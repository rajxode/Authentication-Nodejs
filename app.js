require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

const app = express();
app.use(express.json());


app.get('/',(req,res) => {
    res.send("<h1>Welcome in auth project</h1>")
})


app.post('/create', async (req,res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        if(!( firstName && lastName && email && password )){
            res.status(400).send("All fields are required");
        }

        const isUserExist = await User.findOne({email});

        if(isUserExist){
            res.status(401).send('User already exist');
        }

        const cryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email:email.toLowerCase(),
            password:cryptPassword
        })

        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        );

        user.token = token;
        user.password = undefined;

        res.status(201).json(user);

    } catch (error) {
        console.log(error);
    }

    

})

module.exports = app;