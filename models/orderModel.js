const mongoose = require('mongoose');
const Restaurant = require('./restaurantModel'); // Import the Restaurant model

const orderSchema = new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Foods'
  }],
  payment:{},
  buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Foods'
  },
  status:{
    type:String,
    enum:['preparing','prepare','on the way','delivere'],
    default:'preparing',
  },
  
    },{timestamps:true}
);

module.exports = mongoose.model('Order', orderSchema);
