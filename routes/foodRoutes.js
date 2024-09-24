const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this path is correct
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// ROUTES
//CREATE FOOD
router.post('/create',authMiddleware,createFoodController);

//GET ALL FOOD
router.get('/getAll',getAllFoodsController);

//get simple food
router.get('/get/:id',getSingleFoodController);

//get food by rest
router.get('/getBy Restaurant/:id',getFoodByRestaurantController);

//update food
router.put('/update/:id',authMiddleware,updateFoodController);

//Delete  food
router.put('/delete/:id',authMiddleware,deleteFoodController);

//PLACE ORDER 
router.post('/placeholder',authMiddleware,placeOrderController);

//order status
router.post('/orderStatus/:id',adminMiddleware,orderStatusController);

module.exports = router;
