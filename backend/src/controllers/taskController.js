const Task = require("../models/Task");
const redis = require("../config/redis");

const QUEUE_NAME = "taskQueue";

exports.createTask = async (req, res) => {
  const { title, input, operation } = req.body;

  const task = await Task.create({
    title,
    input,
    operation,
    userId: req.user.id,
  });

  // ✅ Push ONLY taskId
  await redis.rpush(QUEUE_NAME, task._id.toString());

  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};