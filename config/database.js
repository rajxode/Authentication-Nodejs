
const mongoose = require('mongoose');

const { MONGODB_URL} = process.env;

exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        console.log('Database is connected successfullly')
    )
    .catch((error) => {
        conosle.log('database connection is failed');
        console.log(error);
        process.exit(1);
    })
}