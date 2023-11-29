const createError = require("http-errors");
const Comment = require("../models/Comment");
const Task = require("../models/Task");

module.exports.createComment = async (req, res, next) => {
  try {
    const {
      body,
      params: { idTask },
    } = req;

    const newComment = await Comment.create({ ...body, taskId: idTask });
    if (!newComment) {
      return next(createError(400, "bad req"));
    }
    await Task.findByIdAndUpdate(idTask, { comments: [newComment._id] });
    return res.status(201).send({ data: newComment });
  } catch (error) {
    next(error);
  }
};
