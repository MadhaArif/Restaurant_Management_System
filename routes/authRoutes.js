const express=require('express');
const { registerController, loginController } = require('../controllers/authControllers');

const router=express.Router()

//ROUTES
//REGISTER || POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/Login',loginController);

module.exports=router