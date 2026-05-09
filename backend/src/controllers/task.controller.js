const httpStatusPkg = require('http-status');
const httpStatus = httpStatusPkg.status || httpStatusPkg.default || httpStatusPkg;
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services/task.service');
const ApiError = require('../utils/ApiErrors');

// Get all tasks
const getAllTasks = catchAsync (async (req, res) => {
    const tasks = await taskService.getAllTasks();
    if (!tasks || tasks.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No tasks found');
    }
    return res.status(httpStatus.OK).json(tasks);
})

// Get a task by ID
const getTaskById = catchAsync (async (req, res) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No task found');
    }
    return res.status(httpStatus.OK).json(task);
})

// Create a new task
const createTask = catchAsync (async (req, res) => {
    const taskData = req.body;
    const newTask = await taskService.createTask(taskData);
    if (!newTask) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create task');
    }
    return res.status(httpStatus.CREATED).json(newTask);
})

// Update a task by ID
const updateTask = catchAsync (async (req, res) => {
    const { id } = req.params;
    const taskData = req.body;
    const updatedTask = await taskService.updateTask(id, taskData);
    if (!updatedTask) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No task found');
    }
    return res.status(httpStatus.OK).json(updatedTask);
})

// Delete a task by ID
const deleteTask = catchAsync (async (req, res) => {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);
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