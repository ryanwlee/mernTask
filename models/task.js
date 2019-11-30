const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create task Schema & model */
const TaskSchema = new Schema({
  task: {
    type: String,
    required: [true, "task is required"]
  }
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
