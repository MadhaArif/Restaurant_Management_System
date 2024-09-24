const mongoose = require('mongoose');
const Restaurant = require('./restaurantModel'); // Import the Restaurant model

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: String,
    foodTags: [String],
    category: String,
    code: String,
    isAvailable: {
        type: Boolean,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Ensure this matches the Restaurant model name
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
},{timestamps:true}
);

const foodModel = mongoose.model('Food', foodSchema);
module.exports = foodModel;
