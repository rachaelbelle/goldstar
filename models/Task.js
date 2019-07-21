const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stars : {
      type: Number,
      default: 1
  },
  completed: {
      type: Boolean,
      default: false
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
