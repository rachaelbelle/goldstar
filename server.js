const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require('dotenv');



const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//do not need here, but needed for export
let secret;

// Connect to MongoDB
if(process.env.NODE_ENV === 'production'){

  const db = process.env.MONGODB_URI;
  secret = process.env.SECRET_OR_KEY
  module.exports = {secret: secret};

  console.log("ENV variables");
  console.log(process.env);

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

  const env = dotenv.config().parsed;
  const dbTest = env.mongoURItest;
  secret = env.secretOrKey;
  module.exports = {secret: secret};



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

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");

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
