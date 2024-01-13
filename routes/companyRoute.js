// Importing necessary modules
const express = require('express');
const passport = require('passport');
const companyController = require('../controllers/companyController'); // Importing the company controller
const router = express.Router();


// Route to render the company home page (requires user authentication)
router.get('/home', passport.checkAuthentication, companyController.companyPage);

// Route to render the interview allocation page (requires user authentication)
router.get('/allocate', passport.checkAuthentication, companyController.allocateInterview);


// Route to handle scheduling interviews (requires user authentication)
router.post('/schedule-interview', passport.checkAuthentication, companyController.scheduleInterview);

// Route to handle updating the status of interviews (requires user authentication)
router.post('/update-status/:id', passport.checkAuthentication, companyController.updateStatus);

// Exporting the router
module.exports = router;
