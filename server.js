const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require('dotenv');

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed;
const db = process.env.MONGODB_URI;
const dbTest = env.mongoURItest;

// Connect to MongoDB
if(process.env.NODE_ENV === 'production'){
  mongoose
  .connect(
    db,
    { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
     }
  )
  .then(() => console.log("MongoDB PROD successfully connected"))
  .catch(err => console.log(err));
} else {
  mongoose
  .connect(
    dbTest,
    { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
     }
  )
  .then(() => console.log("MongoDB TEST successfully connected."))
  .catch(err => console.log(err));
}

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/tasks", tasks);

//serve static assets when we are in production
if(process.env.NODE_ENV === 'production'){
  console.log("Production Mode!");
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
