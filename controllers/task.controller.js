const Task = require("../models/Task");
module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    if (!newTask) {
      return next(createError(404, "newTask not found!"));
    }
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      return next(createError(404, "task not found!"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findById(idTask);
    if (!task) {
      return next(createError(404, "task not found!"));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const task = await Task.findByIdAndUpdate(idTask, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createError(404, "task not found!"));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findByIdAndDelete(idTask);
    if (!task) {
      return next(createError(404, "task not found!"));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
