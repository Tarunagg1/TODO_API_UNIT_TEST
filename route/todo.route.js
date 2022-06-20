const express = require('express');
const { createTodo, getSingletodo, updateTodo, deleteTodoById, getAllTodo } = require('../controllers/todo.controller');
const { validateToken } = require('../middleware/validateToken');
const route = express.Router();


route.get('/', validateToken, getAllTodo);
route.get('/:id', validateToken, getSingletodo);
route.post('/', validateToken, createTodo);
route.put('/:id', validateToken, updateTodo);
route.delete('/:id', validateToken, deleteTodoById);

// route.get('/private',validateToken,privateController);



module.exports = route;
