// external import
const express = require('express');

// internal importe
const {
    signup,
    login,
    updateUser,
    deleteUser,
    getOneUser,
    getAllUser,
} = require('../controllers/userController');

const router = express.Router();

// signup route
router.post('/user/signup', signup);

// login route
router.post('/user/login', login);

// find user by userId and update
router.put('/user/:id', updateUser);

// find user by userId and delete
router.delete('/users/:id', deleteUser);

// find a user by userId
router.get('/user/:id', getOneUser);

// find all user

router.get('/users', getAllUser);

module.exports = router;
