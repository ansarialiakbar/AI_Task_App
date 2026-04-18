const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createTask, getTasks, getTask } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTask);

module.exports = router;