// Importing necessary modules
const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userControllers'); // Importing user controller


// Route to render the signup page
router.get('/signup', userController.signup);

// Route to render the signin page
router.get('/signin', userController.signin);

// Route to sign out (requires user authentication)
router.get('/signout', passport.checkAuthentication, userController.signout);

// Route to download CSV file (requires user authentication)
router.get('/download-csv', passport.checkAuthentication, userController.downloadCsv);

// ------------------------- Post Request -----------------------

// Route to handle user creation
router.post('/create', userController.createUser);

// Route to create a user session (authentication)
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/signin' }), userController.createSession);

// Exporting the router
module.exports = router;
