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
  curStars : {
      type: Number,
      default: 0
  },
  maxStars : {
    type: Number
  },
  completed: {
      type: Boolean,
      default: false
  }
}, { autoCreate: true });

module.exports = Task = mongoose.model("tasks", TaskSchema);
