const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

// Get user by ID
const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.body.id);
        //validation 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        user.password = undefined;
        //response
        res.status(200).send({
            success: true,
            message: 'User fetched successfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get User API',
            error
        });
    }
};

// Update user details
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.body.id);
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }
        //update user details
        const { username, address, phone } = req.body;
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        //save updated user
        await user.save();
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update User API',
            error
        });
    }
};

// Update Password Controller
const updatePasswordController = async (req, res) => {
    try {
        const { id, newPassword } = req.body;

        //find user by ID
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }

        //hash the new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        //update the password
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Password API',
            error
        });
    }
};

//RESET PASSWORD (unchanged)
const resetPasswordController = async (req, res) => {
    // Function code remains unchanged
};

//DELETE PROFILE ACCOUNT 
const deleteProfileController=async(req,res)=>{
    try{
      await userModel.findByIdAndDelete(req.params.id);
     return res.status(200).send({
        success: true,
        message: 'Your Account Has Been Deleted',
        error
    });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Profile API',
            error
        });
    }
};

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController 
};
