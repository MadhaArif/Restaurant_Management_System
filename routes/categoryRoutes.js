const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this path is correct
const { createCatController } = require('../controllers/categoryController'); // Ensure this path is correct

const router = express.Router();

// ROUTES
// Create category route
router.post('/create', authMiddleware, createCatController);

module.exports = router;
