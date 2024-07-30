
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RenderTasks.css'; // Import your CSS file for styling

function RenderTasks() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        // Fetch todos from the backend when component mounts
        axios.get('http://localhost:8080/todos/rendertasks')
            .then(response => {
                console.log('Response from GET request:', response.data);
                setTodos(response.data);
            })
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const handleAdd = () => {
        axios.post('http://localhost:8080/todos/addtask', { task, deadline })
            .then(response => {
                console.log('Task added successfully:', response.data);
                // Wait for the POST request to complete before fetching the updated list
                setTask('');
                setDeadline('');
                axios.get('http://localhost:8080/todos/rendertasks')
                    .then(response => setTodos(response.data))
                    .catch(error => console.error('Error fetching todos:', error));
            })
            .catch(error => console.error('Error adding task:', error));
    };

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:8080/todos/deletetask/${taskId}`)
            .then(response => {
                console.log('Task deleted successfully:', response.data);
                // Wait for the DELETE request to complete before fetching the updated list
                axios.get('http://localhost:8080/todos/rendertasks')
                    .then(response => setTodos(response.data))
                    .catch(error => console.error('Error fetching todos:', error));
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleUpdate = (taskId) => {


        // Prompt to input the updated task
    const updatedTask = prompt("Enter the updated task:");
    if (updatedTask === null) {
        // If the user cancels, exit the function
        return;
    }

    // Prompt to input the updated deadline
    const updatedDeadline = prompt("Enter the updated deadline (YYYY-MM-DD):");
    if (updatedDeadline === null) {
        // If the user cancels, exit the function
        return;
    }

        // const updatedTask = task; // Updated task
        // const updatedDeadline = deadline; // Updated deadline
    
        axios.put(`http://localhost:8080/todos/updatetask/${taskId}`, { task: updatedTask, deadline: updatedDeadline })
            .then(response => {
                console.log('Task updated successfully:', response.data);
                // Wait for the PUT request to complete before fetching the updated list
                axios.get('http://localhost:8080/todos/rendertasks')
                    .then(response => setTodos(response.data))
                    .catch(error => console.error('Error fetching todos:', error));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const handleComplete = (taskId) => {
        // Send a PUT request to mark the task as completed
        axios.put(`http://localhost:8080/todos/completetask/${taskId}`)
            .then(response => {
                console.log('Task completed successfully:', response.data);
                // Update the list of tasks after marking as completed
                axios.get('http://localhost:8080/todos/rendertasks')
                    .then(response => setTodos(response.data))
                    .catch(error => console.error('Error fetching todos:', error));
            })
            .catch(error => console.error('Error completing task:', error));
    };
    
    return (
        <div className="container">
            <h2 className="todo-heading">To Do List</h2>
            <div className="add-task">
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    className="input-field"
                />
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleAdd} className="add-button">Add Task</button>
            </div>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Task</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index} className={`${todo.completed ? 'completed-task' : new Date(todo.deadline) < new Date() ? 'deadline-crossed' : ''}`}>
                            <td>{index + 1}</td>
                            <td>{todo.task}</td>
                            <td>{todo.deadline ? new Date(todo.deadline).toLocaleDateString() : 'No deadline'}</td>
                            <td>
                                <span className="action-icon delete" onClick={() => handleDelete(todo._id)} title="Delete Task">🗑️</span>
                                <span className="action-icon update" onClick={() => handleUpdate(todo._id)} title="Update Task">✏️</span>
                                <span className="action-icon complete" onClick={() => handleComplete(todo._id)} title="Complete Task">✅</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RenderTasks;

