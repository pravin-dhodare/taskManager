const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();

// Get all tasks
router.get('/', getAllTasks);

// Get Task by ID
router.get('/:id', getTaskById);

// Create new Task
router.post('/', createTask);

// Update the Task
router.put('/:id', updateTask);

// Delete Task
router.delete('/:id', deleteTask);

module.exports = router;
