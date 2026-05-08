const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['TODO', 'DONE'],
        default: 'TODO'
    },
    linkedFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;