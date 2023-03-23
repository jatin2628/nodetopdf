const express = require('express');
const userController = require('../controller/user');
const authvalid=require('../utils/validation');
const authvalidresult=require("../utils/validationresult");


const router = express.Router();

router.post('/register',authvalid.validRegister,authvalidresult,userController.register);

router.get('/verify/:token',userController.verifyEmail);

router.post('/login',authvalid.validLogin,authvalidresult,userController.login);

module.exports = router;