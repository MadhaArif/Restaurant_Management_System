const categoryModel = require("../models/categoryModel");

//create cat
const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).send({
                success: false,
                message: 'Please provide category title and image',
            });
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: 'Category Created',
            newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Create Cat API',
        });
    }
};

module.exports = {
    createCatController,
};
