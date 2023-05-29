const todoRoutes = require('express').Router();
const { todo } = require('../controllers');

// Display all activity data
todoRoutes.get('/todo-items', todo.getAllTodo);

// Display one activity data
todoRoutes.get('/todo-items/:id', todo.findOneData)

// Create an activity data
todoRoutes.post('/todo-items', todo.createToDo);

// Update activity data
todoRoutes.patch('/todo-items/:id', todo.updateTodo);

// Delete activity data
todoRoutes.delete('/todo-items/:id', todo.deleteTodo);


module.exports = todoRoutes;