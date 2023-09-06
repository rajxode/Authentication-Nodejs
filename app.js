
// file of env variables
require('dotenv').config();

// connecting to database
require('./config/database').connect();

// express 
const express = require('express');

// for password encryption
const bcrypt = require('bcryptjs');
// creating jwt token
const jwt = require('jsonwebtoken');

// for parsing the data send inside the cookies
var cookieParser = require('cookie-parser')

// User schmea to store data
const User = require('./models/User');

// auth middleware
const auth = require('./middleware/auth');

// app
const app = express();
// for parsing json data
app.use(express.json());

// middleware for parsing the cookies
app.use(cookieParser());

// home route
app.get('/',(req,res) => {
    res.send("<h1>Welcome in auth project</h1>")
})


// crate new user
app.post('/create', async (req,res) => {

    // try 
    try {

        // getting values entered 
        const { firstName, lastName, email, password } = req.body;

        // check if all values are present of not
        if(!( firstName && lastName && email && password )){
            res.status(400).send("All fields are required");
        }


        // find user with the given email in database
        const isUserExist = await User.findOne({email});

        // if email already exist in database
        if(isUserExist){
            res.status(401).send('User already exist');
        }

        // encrypt the password
        const cryptPassword = await bcrypt.hash(password, 10);

        // create new user inside the database
        const user = await User.create({
            firstName,
            lastName,
            email:email.toLowerCase(),
            password:cryptPassword
        })

        // generating a new token for the user
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        );
        
        // store the token inside the user variable but not in the database
        user.token = token;
        // hiding the password value 
        user.password = undefined;
        

        // return user's data
        res.status(201).json(user);

    } catch (error) {
        // if error
        console.log(error);
    }
})


// for login user 
app.post('/login', async (req,res) => {
    try {
        // get email and password entered by user
        const { email, password} = req.body;

        // find user by it's email
        const user = await User.findOne({email});

        // if user found 
        if( user){
            // match the password
            const found = await bcrypt.compare(password, user.password); 

            // if password matches
            if(found){
                // generate token
                const token = jwt.sign(
                    {user_id: user._id, email},
                    process.env.SECRET_KEY,
                    {
                        expiresIn:"2h"        
                    }
                )
                    
                // store the token
                user.token = token;
                // hide the password
                user.password = undefined;
                
                // store the token inside the cookies
                // options for cookies
                const options = {
                    // time in which the cookie will expire
                    expires: new Date(
                        // current day + 3 days ( 3 * 24 hour * 60 min * 60 second * 1000 )
                        Date.now() + 3 * 24 * 60 * 60 * 1000
                    ),
                    // for backend only
                    httpOnly: true,
                };

                // store inside the cookie
                // return json value { cookie, token , user data}
                res.status(200).cookie("token", token, options).json({
                    success: true,
                    token,
                    user,
                });


                // return the user's data
                return res.status(200).json(user);
            }
        }


        // in case user not found or the password doesn't matches
        return res.status(400).send('wrong email / password');

    } catch (error) {
        console.log('error',error);
    }
})


// dashboard 
// only user with token can access it
app.get('/dashboard',auth,(req,res) => {
    res.send("this is the dashboard");
})

module.exports = app;