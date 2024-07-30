
const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

router.post('/addtask', todoController.addTask);
router.get('/rendertasks', todoController.getAllTodos);
router.put('/updatetask/:taskId', todoController.updateTask);
router.delete('/deletetask/:taskId', todoController.deleteTask);
router.put('/completetask/:taskId', todoController.completeTask);


module.exports = router;
