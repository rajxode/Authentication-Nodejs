
// import the app module
const app = require('./app');

// getting port value from env
const {PORT} = process.env;

// fire up the server
app.listen(PORT,() => console.log(`server is running on port ${PORT}...`));