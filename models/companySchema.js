// Importing mongoose library
const mongoose = require('mongoose');

// Creating a mongoose schema for the Company model
const companySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true, // Ensuring uniqueness of the company name
		},
		students: [
			{
				student: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Student', // Referencing the 'Student' model
				},
				date: {
					type: Date,
					required: true, // Date of the interview is required
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

// Creating a mongoose model named 'Company' based on the companySchema
const Company = mongoose.model('Company', companySchema);

// Exporting the Company model
module.exports = Company;
