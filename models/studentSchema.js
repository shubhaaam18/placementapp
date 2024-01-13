// Importing mongoose library
const mongoose = require('mongoose');

// Creating a mongoose schema for the Student model
const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true, // Name is a required field
		},
		email: {
			type: String,
			unique: true, // Ensuring uniqueness of the email
			required: true, // Email is a required field
		},
		college: {
			type: String,
			required: true, // College is a required field
		},
		placement: {
			type: String,
			required: true,
			enum: ['Placed', 'Not Placed'], // Enumerating possible placement values
		},
		contactNumber: {
			type: Number,
			required: true, // Contact number is a required field
		},
		batch: {
			type: String,
			required: true, // Batch is a required field
		},
		dsa: {
			type: Number,
			required: true, // DSA score is a required field
		},
		webd: {
			type: Number,
			required: true, // Web Development score is a required field
		},
		react: {
			type: Number,
			required: true, // React score is a required field
		},
		interviews: [
			{
				company: {
					type: String,
				},
				date: {
					type: String,
				},
				result: {
					type: String,
					enum: ['On Hold', 'Selected', 'Pending', 'Not Selected', 'Did not Attempt'], // Enumerating possible interview result values
				},
			},
		],
	},
	{ timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' timestamps to documents
);

// Creating a mongoose model named 'Student' based on the studentSchema
const Student = mongoose.model('Student', studentSchema);

// Exporting the Student model
module.exports = Student;
