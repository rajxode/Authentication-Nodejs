
// import jwt for token verification
const jwt = require('jsonwebtoken');

// create middleware
const auth = (req,res,next) => {

    // getting token form header / body / cookies
    // header contains "Bearer", so removing it from token string
    const token = req.cookies.token ||
                req.body.token ||
                req.header("Authorization").replace("Bearer ","");
    
    // if token doesn't exist 
    if(!token){
        return res.status(403).send("token is missing");
    }

    // if token found then 
    try {
        // decond the token using jwt and secret key used for generating the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        // save the decoded value { contains user._id , email , iat , expiresIn}
        req.user = decode;
    } catch (error) {
        // if there is any error in decoding the token
        return res.status(401).send("Invalid Token");
    }
    
    // calling next step
    return next();
}


// export to use inside the route
module.exports = auth;