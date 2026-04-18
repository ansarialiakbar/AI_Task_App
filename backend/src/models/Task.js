const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  input: String,
  operation: {
    type: String,
    enum: ["uppercase", "lowercase", "reverse", "wordcount"],
  },
  status: {
    type: String,
    enum: ["pending", "running", "success", "failed"],
    default: "pending",
  },
  result: String,
  logs: String,
  userId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);