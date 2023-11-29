const createError = require("http-errors");
const Task = require("../models/Task");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;

    const task = await Task.findById(idTask);
    if (!task) {
      return next(createError(404, "task not found!!!!!"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
