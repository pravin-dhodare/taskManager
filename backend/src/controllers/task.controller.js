const httpStatus = require('http-status');
const { taskService } = require('../services/task.service');
const ApiError = require('../utils/ApiErrors');

// Get all tasks
const getAllTasks = catchAsync ((req, res) => {
    const tasks = taskService.getAllTasks();
    if (!tasks) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No tasks found');
    }
    return res.status(httpStatus.OK).json(tasks);
})

// Get a task by ID
const getTaskById = catchAsync ((req, res) => {
    const {taskId} = req.params;
    const task = taskService.getTaskById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No task found');
    }
    return res.status(httpStatus.OK).json(task);
})

// Create a new task
const createTask = catchAsync ((req, res) => {
    const taskData = req.body;
    const newTask = taskService.createTask(taskData);
    if (!newTask) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create task');
    }
    return res.status(httpStatus.CREATED).json(newTask);
})

// Update a task by ID
const updateTask = catchAsync ((req, res) => {
    const {taskId} = req.params;
    const taskData = req.body;
    const updatedTask = taskService.updateTask(taskId, taskData);
    if (!updatedTask) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No task found');
    }
    return res.status(httpStatus.OK).json(updatedTask);
})

// Delete a task by ID
const deleteTask = catchAsync ((req, res) => {
    const {taskId} = req.params;
    const deletedTask = taskService.deleteTask(taskId);
    if (!deletedTask) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No task found');
    }
    return res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};