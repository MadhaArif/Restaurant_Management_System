const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE FOOD
const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });

        await newFood.save();
        res.status(201).send({
            success: true,
            message: 'Food Item Created Successfully',
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create Food API',
            error,
        });
    }
};

//get all foods
const getAllFoodsController=async(req,res)=>{
       try{
         const foods=await foodModel.find({})
         if(!foods){
            return res.status(404).send({
                success: false,
                message: 'No food item was found',
            })
         }
        res.status(200).send({
            success: true,
            totalFoods:foods.length,
            foods,
        });
       }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Foods API',
            error,
        });
       }
};

//get simple food 
const getSingleFoodController=async(req,res)=>{
      try{
          const foodId=req.params.id
          if(!foodId){
            return res.status(404).send({
                success: false,
                message: 'Please provide id',
            })
          }
          const food =await foodModel.findById(foodId)
          if(!food){
            return res.status(404).send({
                success: false,
                message: 'No food found with his id',
            })
          }
          res.status(200).send({
            success: true,
            food,
        });
      }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get Single Food API',
            error
        });
      }
};

//get food by restaurant 
const getFoodByRestaurantController=async(req,res)=>{
    try{
        const restaurantId=req.params.id
        if(!restaurantId){
          return res.status(404).send({
              success: false,
              message: 'Please provide id',
          })
        }
        const food =await foodModel.find({restaurant:restaurantId})
        if(!food){
          return res.status(404).send({
              success: false,
              message: 'No food found with his id',
          })
        }
        res.status(200).send({
          success: true,
          message:'food based on restaurant',
          food,
      });
    }catch(error){
      console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Get Single Food API',
          error
      });
    }
};

//update food item
const updateFoodController=async(req,res)=>{
     try{
        const foodId=req.params.id;
         if(!foodId){
            return res.status(404).send({
                success: false,
                message: 'No food id was found',
      });
         }
         const food=await foodModel.findById(foodId)
         if(!food){
            return res.status(404).send({
                success: false,
                message: 'No food found',
            });
         }
         const {title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,}=req.body
            const updateFood=await foodModel.findByIdAndUpdate(foodId,{
                title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            }, {new:true})
            res.status(200).send({
                success: true,
                message: 'Food item was updated',
                error
            });
     }catch(error){
        console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Update Food API',
          error
      });
     }
};

//delete food
const deleteFoodController=async(req,res)=>{
      try{
      const foodId=req.params.id;
      if(!foodId){
        return res.status(404).send({
            success: false,
            message: 'provide food id',
        });
      }
      const food=await foodModel.findById(foodId)
      if(!food){
        return res.status(404).send({
            success: false,
            message: 'No food found with id',
        });
      }
      await foodModel.findByIdAndDelete(foodId)
      res.status(200).send({
        success: true,
        message: 'Food item deleted',
        });
      }catch(error){
        console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Delete Food API',
          error
      });
     }
};

//PLACE ORDER 
const placeOrderController=async(req,res)=>{
      try{
         const {cart,payment}=req.body
         if(!cart ){
            return  res.status(500).send({
                success: false,
                message: 'Please find cart and payment method',
            });
         }
         let total=0;
         //cal
         cart.map(i=>{
            total+=i.price 
         })
         const newOrder=new orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
         });
            
         await newOrder.save();

         res.status(201).send({
            success: true,
            message: 'Order placed successfully',
            newOrder,
        });
      }catch(error){
        console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Place Order API',
          error
      });
      }
};

//change order status
const orderStatusController=async(req,res)=>{
   try{
    const orderId=req.params.id
    if(!orderId){
        return res.status(404).send({
            success: false,
            message: 'please provide valid order id',
            error
        });
    }
    const {status}=req.body
     const order=await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
     res.status(200).send({
        success: true,
        message: 'Order staus updated',
    });

   }catch(error){
    console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in Place Order API',
          error
      });
   }
}

module.exports = { 
    createFoodController ,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
};
