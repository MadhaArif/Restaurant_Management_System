const express=require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantControllers');

const router=express.Router()

//ROUTES
router.post('/create',authMiddleware,createRestaurantController)

//GET ALL RESTAURANT || POST
router.get('/getAll',getAllRestaurantController);

//GET RESTAURANT BY ID || GET 
router.get('/get/id:',getRestaurantByIdController);

//DELETE RESTAURANT || DELETE 
router.delete('/delete',authMiddleware,deleteRestaurantController);

module.exports=router