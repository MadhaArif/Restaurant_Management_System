const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address , answare} = req.body;
        //validation
        if (!username || !email || !password || !address || !phone || !answare) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        //check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Email already registered. Please login.'
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //create new user
        const user = await userModel.create({ 
            username, 
            email, 
            password: hashedPassword, // save the hashed password
            phone, 
            address ,
            answare,
        });

        return res.status(201).send({
            success: true,
            message: 'Successfully registered',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        });
    }
};

//LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password'
            });
        }
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        //password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid password'
            });
        }
        //token generation
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // fix: added the comma
        });

        user.password = undefined; // remove password from the user object
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        });
    }
};

module.exports = { registerController, loginController };
