
// import mongoose
const mongoose = require('mongoose');

// mongoDB url stored in env variable
const { MONGODB_URL} = process.env;


// connect to database
exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        // if database connected
        console.log('Database is connected successfullly')
    )
    .catch((error) => {
        // if there is some error
        conosle.log('database connection is failed');
        console.log(error);
        process.exit(1);
    })
}