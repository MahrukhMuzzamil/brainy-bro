const mongoose = require('mongoose');

// Define the schema for Todo
const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    deadline: {
        type: Date 
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Create and export the Todo model
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
