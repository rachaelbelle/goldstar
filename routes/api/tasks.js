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

// @route GET api/tasks/getAllTasks
// @desc Get all Tasks from user
// @param user obj which includes id and name
// @return array of tasks
router.get("/getAllTasks", (req, res) => {
  // Form validation

  console.log("user id is: " + req.body.user.id)

  User.findOne({ '_id': req.body.user.id }).then(user => {

    if (user) {

      let taskIds = user.tasks;
      // console.log("tasks UNDONE from id are: ");
      // console.log(taskIds);

      if (taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined') {
        return res.status(200).json([]);
      } else {

        Task.find({
          '_id': { $in: taskIds }
        })
          .then(tasks => {

            console.log("All tasks UNDONE from DB are: ");
            console.log(tasks);

            if (tasks === null || typeof tasks === 'undefined' || tasks === 'undefined') {
              return res.status(200).json([]);
            } else {
              // console.log("Will return to UI the tasks: ");
              // console.log(tasks);
              return res.status(200).json(tasks)
            }

          });
      }

    } else {
      return res.status(400).json({ user: "User does not exist." });
    }
  });


});

// @route POST api/tasks/getUndoneTasks
// @desc Get all incomplete Tasks from user
// @param user obj which includes id and name
// @return array of incomplete tasks
router.post("/getUndoneTasks", (req, res) => {

  // console.log("Get all UNDONE tasks request: ");
  // console.log(req.body);

  console.log("Getting all undone tasks for user: "+req.body.id);

  User.findById({ '_id': req.body.id }).then(user => {

    if (user) {

      //console.log("Found User");
      let taskIds = user.tasks;
      //console.log("tasks UNDONE from id are: ");
      //console.log(taskIds);

      if (taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined') {
        console.log("ERROR: Got null or undefined users from DB.")
        return res.status(200).json([]);
      } else {
        console.log("User has: "+taskIds.length+" tasks")

        Task.find({
          '_id': { $in: taskIds }, completed: false
        })
          .then(tasks => {
            // console.log("All tasks UNDONE from DB are: ");
            // console.log(tasks);

            if (tasks === null || typeof tasks === 'undefined' || tasks === 'undefined') {
              console.log("ERROR: Got null or undefined tasks from DB.")
              return res.status(200).json([]);
            } else {

              console.log("Got all undone ("+tasks.length+") tasks for user. Returing them to UI.")
              return res.status(200).json(tasks)
            }
          });
      }
    } else {
      return res.status(400).json({ user: "User does not exist." });
    }
  });

});

// @route POST api/tasks/getAllCompletedTasks
// @desc Get all complete Tasks from user
// @param user obj which includes id and name
// @return array of complete tasks
router.post("/getAllCompletedTasks", (req, res) => {
  // Form validation

  console.log("Get all completed tasks for user with id: "+req.body.id);
  // console.log(req.body);

  User.findById({ '_id': req.body.id }).then(user => {

    if (user) {

      let taskIds = user.tasks;
      // console.log("tasks UNDONE from id are: ");
      // console.log(taskIds);

      if (taskIds === null || typeof taskIds === 'undefined' || taskIds === 'undefined') {
        console.error("Users taskIds Returned a null or undefined array")
        return res.status(400).json("Users taskIds Returned a null or undefined array.");
      } else {

        console.log("User has: "+taskIds.length+" tasks")

        Task.find(
          {
          '_id': { $in: taskIds }, 
          completed: true
          }
        )
        .sort([['date', -1]])
        .then(tasks => {

          // console.log("All tasks UNDONE from DB are: ");
          // console.log(tasks);

          if (tasks === null || typeof tasks === 'undefined' || tasks === 'undefined') {
            console.error("Tasks from user id list returned a null or undefined array")
            return res.status(400).json("Tasks from user id list returned a null or undefined array.");
          } else {
            // console.log("Will return to UI the tasks: ");
            // console.log(tasks);
            console.log("Returning to UI "+tasks.length+" completed tasks");
            return res.status(200).json(tasks)
          }

        });

      }

    } else {
      console.error("User does not exist in DB");
      return res.status(400).json("User does not exist.");
    }
  });

});

// @route POST api/tasks/createNewTask
// @desc Create new task and add to user logged in
// @param taskName, taskcurStars, taskMaxStars, user obj
// @return new task
router.post("/createNewTask", (req, res) => {
  // Form validation

  // console.log("Task body is: ");
  // console.log(req.body);

  const name = req.body.name;
  //below is not necessary because default for current stars is 0
  //same can be said about the completed field in DB which is default to false
  //const curStars = req.body.curStars;
  const maxStars = req.body.maxStars;

  const userId = req.body.user.id;

  const newTask = new Task({
    name,
    maxStars
  });

  // Find user by email
  newTask.save().then(task => {

    //console.log("Task added in DB successfully");
    //console.log(task);
    console.log("Added task in DB with id: " + task._id);
    //console.log("Need to add to user now: "+userId);

    User.findByIdAndUpdate({ '_id': userId }, { $push: { tasks: task._id } }, { new: true })
      .then(function () {
        // If the User was updated successfully, send it back to the client
        console.log("Successfully added task to user: " + userId);

        //adding task ID in obj to return to user
        newTask.id = task._id;

        res.json(task);
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        console.error("Error posting task to user in DB: " + err);
        res.status(500).json(err);
      });
  }).catch(function (err) {
    // If an error occurs, send it back to the client
    console.error("Error saving task in DB: " + err);
    res.status(500).json(err);
  });;
});

// @route POST api/tasks/updateTask
// @desc Update task star curStars and completion field
// @param taskName, new taskcurStars, taskId, task completed
// @return updated task
router.post("/updateTask", (req, res) => {
  // Form validation

  // console.log("Task body is: ");
  // console.log(req.body);

  const name = req.body.name;
  const newStars = req.body.newStars;
  // const oldStars = req.body.oldStars
  // const userName = req.body.user;
  const taskId = req.body.taskId;
  const completed = req.body.completed;

  const newTask = {
    name,
    curStars: newStars,
    completed
  };

  Task.findByIdAndUpdate(
    { '_id': taskId },
    { $set: newTask }, 
    { new: false }
  )
    .then(updateResponse => {

      // console.log("Update Response is: ");
      // console.log(updateResponse);

      // console.log("All tasks UNDONE from DB are: ");
      // console.log(tasks);
      console.log("Successfully updated task "+taskId+" in DB.");

      res.status(200).json(newTask);
    })
    .catch(function (err) {
      console.error("Failed to update task" + err);
      // If an error occurs, send it back to the client
      res.status(500).json(err);
    });;

});

module.exports = router;
