const restaurantModel = require("../models/restaurantModel");

const createRestaurantController=async(req,res)=>{
try{
    const{
        title,
        imageUrl,
        food,
        time,
        pickup,
        delivery,
        isopen,
        logout,
        rating,
        ratingCount,
        code,
        coords,
    }=req.body;
    //validation
    if(!title || !coords){
        return res.status (500).send({
            success:false,
            message:'please provide title and address',
        });
    }
    const newRestaurant=new restaurantModel({
        title,
        imageUrl,
        food,
        time,
        pickup,
        delivery,
        isopen,
        logout,
        rating,
        ratingCount,
        code,
        coords,
    })
     await newRestaurant.save()

     res.status(201).send({
        success:true,
        message:'New Restaurant Created Successfully',
     })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In Create Restaurant API',
        error
    })
}
};

const getAllRestaurantController=async(req,res)=>{
      try{
           const restaurants =await restaurantModel.find({})
           if(!restaurants){
            return res.status(404).send({
                success:false,
                message:'No Restaurant Available',
                error
            })
           }
           res.status(200).send({
            success:true,
           totalCount:restaurants.length,
            restaurants
        })
      }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Get All Restaurant API',
            error
        })
      }
};

//GET RESTAURANT BY ID 
const getRestaurantByIdController=async(req,res)=>{
      try{
      const restaurantId=req.params.id;
      if(!restaurantId){
        return res.status(404).send({
            success:false,
            message:'Please Provide Restaurant Id',
        })
      }
      //find restaurant
      const restaurant=await restaurantModel.findById(restaurantId);
      if(!restaurant){
        return res.status(404).send({
            success:false,
            message:'No Restaurant found',
        })
      }
      }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Get Restaurant By Id API',
            error
        })
      }
};

//DELETE RESTAURANT
const deleteRestaurantController=async(req,res)=>{
      try{
        const restaurantId=req.params.id;
        if(!restaurantId){
          return res.status(404).send({
              success:false,
              message:'Please Provide Restaurant Id',
          })
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success:true,
            message:'Restaurant Deleted Successfully',
        })
        if(!restaurantId){
          return res.status(404).send({
              success:false,
              message:'No Restaurant found',
          })
        }
      }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete Restaurant API',
            error
        })
      }
};

module.exports={
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController,
};