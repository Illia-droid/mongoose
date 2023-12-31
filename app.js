const express = require("express");
const TaskController = require("./controllers/task.controller");
const CommentController = require("./controllers/comment.controller");
const { checkTask } = require("./middlewares/checkTask");
const app = express();
app.use(express.json());

app
  .route("/tasks")
  .post(TaskController.createTask)
  .get(TaskController.getAllTasks);

app
  .route("/tasks/:idTask")
  .get(TaskController.getTask)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);

app
  .route("/tasks/:idTask/comments")
  .all(checkTask)
  .post(CommentController.createComment);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

module.exports = app;
