// Importing necessary modules
const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Importing student controller


// Route to render the create student page (requires user authentication)
router.get('/create', passport.checkAuthentication, studentController.createStudentPage);

// Route to handle deletion of a student (requires user authentication)
router.get('/delete/:id', passport.checkAuthentication, studentController.deleteStudent);

// ---------- Post requests ----------

// Route to handle the creation of a new student (requires user authentication)
router.post('/create-student', passport.checkAuthentication, studentController.createStudent);

// Exporting the router
module.exports = router;
