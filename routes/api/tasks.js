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

  User.findOne({ 'name': req.body.name }).then(user => {
    
    if (user) {
      
      let taskIds = user.tasks;
      // console.log("tasks UNDONE from id are: ");
      // console.log(taskIds);

      if( taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined'){
        return res.status(200).json([]);
      } else {

        Task.find({
          '_id': { $in : taskIds}  
        })
        .then( tasks => {
    
          // console.log("All tasks UNDONE from DB are: ");
          // console.log(tasks);

          if( tasks === null || typeof tasks === 'undefined' || tasks === 'undefined'){
            return res.status(200).json([]);
          } else {
            // console.log("Will return to UI the tasks: ");
            // console.log(tasks);
            return res.status(200).json(tasks)
          }

        });
      }

    } else {
      return res.status(400).json({ user : "User does not exist." });
    }
  });

  
});

router.post("/getUndoneTasks", (req, res) => {
  
  // console.log("Get all UNDONE tasks request: ");
  // console.log(req.body);

  User.findOne({ 'name': req.body.name }).then(user => {
    
    if (user) {
      
      let taskIds = user.tasks;
      // console.log("tasks UNDONE from id are: ");
      // console.log(taskIds);

      if( taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined'){
        return res.status(200).json([]);
      } else {

        Task.find({
          '_id': { $in : taskIds}, completed: false  
        })
        .then( tasks => {
      

          // console.log("All tasks UNDONE from DB are: ");
          // console.log(tasks);

          if( tasks === null || typeof tasks === 'undefined' || tasks === 'undefined'){
            return res.status(200).json([]);
          } else {
            // console.log("Will return to UI the tasks: ");
            // console.log(tasks);
            return res.status(200).json(tasks)
          }

        });
      }

    } else {
      return res.status(400).json({ user : "User does not exist." });
    }
  });

});

router.post("/getAllCompletedTasks", (req, res) => {
  // Form validation

  // console.log("Get all UNDONE tasks request: ");
  // console.log(req.body);

  User.findOne({ 'name': req.body.name }).then(user => {
    
    if (user) {
      
      let taskIds = user.tasks;
      // console.log("tasks UNDONE from id are: ");
      // console.log(taskIds);

      if( taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined'){
        return res.status(200).json([]);
      } else {

        Task.find({
          '_id': { $in : taskIds}, completed: true  
        })
        .then( tasks => {
      

          // console.log("All tasks UNDONE from DB are: ");
          // console.log(tasks);

          if( tasks === null || typeof tasks === 'undefined' || tasks === 'undefined'){
            return res.status(200).json([]);
          } else {
            // console.log("Will return to UI the tasks: ");
            // console.log(tasks);
            return res.status(200).json(tasks)
          }

        });

      }

    } else {
      return res.status(400).json({ user : "User does not exist." });
    }
  });

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/createNewTask", (req, res) => {
  // Form validation

  console.log("Task body is: ");
  console.log(req.body);

  const name = req.body.name;
  const curStars = req.body.curStars;
  const maxStars = req.body.maxStars;

  const newTask = new Task({
    name,
    stars
  });

//.then(user => res.json(user))
//.catch(err => console.log(err));
  
// Find user by email
  newTask.save().then( task => {
    // Check if user exists

    // console.log("DB Response from adding new task");
    // console.log(task);

    // console.log("Need to add to user now")

    User.findOneAndUpdate({}, { $push: { tasks: task._id } }, { new: true })
    .then(function() {
      // If the User was updated successfully, send it back to the client
      res.json(task);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      //console.log("Error posting task to user in DB")
      res.json(err);
    });

    res.json(task);

  }).catch(function(err) {
    // If an error occurs, send it back to the client
    //console.log("Error saving task in DB")
    res.json(err);
  });;
});

router.post("/updateTask", (req, res) => {
  // Form validation

  console.log("Task body is: ");
  console.log(req.body);

  const name = req.body.name;
  const newStars = req.body.newStars;
  const oldStars = req.body.oldStars
  const userName = req.body.user;

  const newTask = new Task({
    name,
    stars: newStars
  });

  User.findOne({ 'name': userName }).then(user => {
    
    if (user) {
      
      let taskIds = user.tasks;
      // console.log("tasks UNDONE from id are: ");
      // console.log(taskIds);

      if( taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined'){
        return res.status(200).json([]);
      } else {

        Task.findOneAndUpdate(
          { $and: [ {'_id': { $in : taskIds}}, {name}, {stars: oldStars} ] },
          { $set: newTask },
          { new: false }
        )
        .then( updateResponse => {
      
          console.log("Update Response is: ");
          console.log(updateResponse);

          // console.log("All tasks UNDONE from DB are: ");
          // console.log(tasks);

          res.status(200).json(newTask);
        })
        .catch(function(err) {
          console.log("Failed to update task"+err);
          // If an error occurs, send it back to the client
          //console.log("Error posting task to user in DB")
          res.json(err);
        });;
      }

    } else {
      res.status(400).json({ user : "User does not exist." });
    }
  });
});

module.exports = router;
