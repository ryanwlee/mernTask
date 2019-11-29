const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// get a list of tasks from the db
router.get("/tasks", function(req, res, next) {
  Task.find({})
    .then(function(tasks) {
      console.log(tasks);
      res.send(tasks);
    })
    .catch(next);
});

// add a new content to the db
router.post("/tasks", function(req, res, next) {
  console.log(req.body);
  Task.create(req.body)
    .then(function(task) {
      res.send(task);
    })
    .catch(next);
});

// update content in the db
router.put("/tasks/:id", function(req, res, next) {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Task.findOne({ _id: req.params.id }).then(function(task) {
      res.send(task);
    });
  });
});

// delete content from the db
router.delete("/tasks/:id", function(req, res, next) {
  Task.findByIdAndRemove({ _id: req.params.id }).then(function(task) {
    res.send(task);
  });
});

module.exports = router;
