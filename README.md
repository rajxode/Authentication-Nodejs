# Authentication-Nodejs
Backend User Authentication for creating new user, login to generate a token and logout.

# Installation and Run 
  Follow these steps:
  - Get the code on your system.
  - Open terminal on your pc and navigate to the root directory of the project.
  - Run "npm install" command inside the terminal to install all the required dependencies.
  - Create a '.env' file inside root directory and define values for
      - PORT ( port on which your project will run )
      - MONGODB_URL ( URL of your mongoDB database for connecting to database )
      - SECRET_KEY ( secret key for creating token )
  - Run 'npm start' command inside terminal to run the code.
  - Open your web browser and serach for 'localhost:{PORT}/' to see the output.

# Features
  - SignUp new user ( create new user inside the database )
  - Login using user email and password.
  - Generate a token for user on both signup and signin using JWT(jsonwebtoken).
  - Store token inside the cookie.
  - Only authenticated user can access the dashboard.
  - Log out to remove your cookie.

# Tools used:
  - Nodejs
  - Expressjs
  - JsonWebToken
  - Bcryptjs
  - MongoDB
  - JavaScript
