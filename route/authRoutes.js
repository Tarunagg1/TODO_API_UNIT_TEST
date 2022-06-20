const express = require('express');
const { registerController, loginController } = require('../controllers/auth.controller');
const route = express.Router();


route.post('/register',registerController);
route.post('/login',loginController);

// route.get('/private',validateToken,privateController);



module.exports = route;
