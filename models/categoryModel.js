const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'category title is required'],
    },
    imageUrl:{
         type:String,
         default:'https://c8.alamy.com/comp/PCYG1J/pizzeria-fast-food-logo-or-label-happy-chef-holding-pizza-and-scapula-in-hands-vector-illustration-PCYG1J.jpg',
    },
 },
 {timestamps:true});

module.exports=mongoose.model('Category',categorySchema);