const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/testTodo");

// Add new task
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Get all tasks
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

// Update task
app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body.task;
    TodoModel.findByIdAndUpdate(id, { task: updatedTask }, { new: true })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });
  

// Mark task as done
app.put("/mark-done/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndUpdate(id, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Delete task
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
