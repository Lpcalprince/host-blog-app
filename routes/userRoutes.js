const express = require('express');
const { getAllUsers, registerCtrl, loginCtrl } = require('../controllers/userCtrl');

//Router Object
const router = express.Router();

//User Routes
//Get All User || GET
router.get('/all-users', getAllUsers);

//Register User || POST
router.post('/register', registerCtrl);

//Login User || POST
router.post('/login', loginCtrl);

module.exports = router