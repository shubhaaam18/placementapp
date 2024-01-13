// Importing necessary modules
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Importing user routes
const studentRoutes = require('./studentRoute'); // Importing student routes
const homeController = require('../controllers/homeController'); // Importing home controller
const companyRoutes = require('./companyRoute'); // Importing company routes
const passport = require('passport');


// Route to render the home page (requires user authentication)
router.get('/', passport.checkAuthentication, homeController.homePage);

// ---------- Use routes from other files ----------

// Use user routes for requests starting with '/users'
router.use('/users', userRoutes);

// Use student routes for requests starting with '/students'
router.use('/students', studentRoutes);

// Use company routes for requests starting with '/company'
router.use('/company', companyRoutes);

// Exporting the router
module.exports = router;
