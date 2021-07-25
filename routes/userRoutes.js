const express = require('express');
const router = express.Router();

const validationMiddleware = require('../middleware/validationMiddleware');
const uploadFile = require('../middleware/storageMiddleware');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const usersController = require('../controllers/userController');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar formulario de registro
router.post('/register', uploadFile.single('avatar'), validationMiddleware, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar formulario de login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;