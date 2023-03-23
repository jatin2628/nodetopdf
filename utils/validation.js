const {check,body}=require('express-validator');
const model=require('../models');
const User=model.User

const validRegister=[
body('first_name').not().isEmpty().withMessage('Firstname is required'),
body('password','Password length must be atleast 6 character').isLength({min:6}),
body("email").isEmail().withMessage("email is not valid")]

const validLogin = [
    body('password','Password length must be atleast 6 character').isLength({min:6}),
    body("email").isEmail().withMessage("email is not valid")
]

    

module.exports={validRegister,validLogin};