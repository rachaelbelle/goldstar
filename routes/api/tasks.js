const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Task = require("../../models/Task");

// @route GET api/users/register
// @desc Register user
// @access Public
router.get("/getAllTasks", (req, res) => {
  // Form validation

  console.log("Get all tasks request: ");
  console.log(req);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      
      let tasks = user.tasks;

      Task.find({
        '_id': 
          { $in : tasks } 
      })
      .then( tasks => {
    
        console.log("All tasks are: ");
        console.log(tasks);
        
      });


    } else {
      return res.status(400).json({ user : "User does not exist." });
    }
  });

  
});

router.get("/getAllCompletedTasks", (req, res) => {
  // Form validation

  console.log("Get MY tasks request: ");
  console.log(req);

  Task.find({}).then( tasks => {
    
    console.log("My tasks are: ");
    console.log(tasks);
    
  });

});

module.exports = router;
