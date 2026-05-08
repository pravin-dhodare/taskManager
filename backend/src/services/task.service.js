const Task = require('../models/task.model');

// Get all tasks
const getAllTasks =  async () => {
    return await Task.find();
}

// Get a task by ID
const getTaskById = async (id) => {
    return await Task.findById(id);
}

// Create a new task
const createTask = async (taskData) => {
    const newTask = await Task.create(taskData);
    return newTask;
}

// Update a task by ID
const updateTask = async (id, taskData) => {
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
    return updatedTask;
}

// Delete a task by ID
const deleteTask = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
