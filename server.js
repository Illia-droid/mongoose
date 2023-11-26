const http = require("http");
const express = require("express");
const yap = require("yap");
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/fm_mongoose")
  .catch((error) => console.log(error));

const taskSchema = new Schema({
  content: String,
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deadline: Date,
  owner: {
    name: String,
    raiting: Number,
  },
});
const app = express();
app.use(express.json());
const Task = mongoose.model("Task", taskSchema);
app.post("/tasks", async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
});

app.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("server started at port=", port);
});
