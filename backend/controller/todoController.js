
const TodoModel = require('../model/Todo');

// Controller function to fetch all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller function to add a new task
exports.addTask = async (req, res) => {
    try {
        const { task, deadline } = req.body;
        const newTask = await TodoModel.create({ task, deadline });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update an existing task
exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { task, deadline } = req.body;
        const updatedTask = await TodoModel.findByIdAndUpdate(taskId, { task, deadline }, { new: true });
        await updatedTask.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        console.log('Task ID:', taskId); // Add this line for debugging
        // Find the task by ID and delete it
        const deletedTask = await TodoModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to complete a task
exports.completeTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        
        // Find the task by ID and update its status to completed
        const updatedTask = await TodoModel.findByIdAndUpdate(taskId, { completed: true }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task completed successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


