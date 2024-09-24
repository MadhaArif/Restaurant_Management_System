const express=require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router()

//ROUTES
router.get('/getUser',authMiddleware,getUserController)

//update Profile
router.put('/updateUser',authMiddleware,updateUserController)

//RESET PASSWORD
router.post('/resetPassword',authMiddleware,resetPasswordController)

router.post('/updatePassword',authMiddleware,updatePasswordController)

//delete user
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)


module.exports=router