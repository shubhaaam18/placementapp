// Importing mongoose library
const mongoose = require('mongoose');
// Importing bcrypt library for password hashing
const bcrypt = require('bcrypt');

// Creating a mongoose schema for the User model
const userSchema = new mongoose.Schema(
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
		passwordHash: {
			type: String,
			required: true, // Hashed password is a required field
		},
	},
	{ timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' timestamps to documents
);

// Creating a virtual property to set hashed password
userSchema.virtual('password').set(function (value) {
	// Using bcrypt to hash the password with a salt factor of 12
	this.passwordHash = bcrypt.hashSync(value, 12);
});

// Function to compare hashed password
userSchema.methods.isPasswordCorrect = function (password) {
	// Using bcrypt to compare the entered password with the stored hashed password
	return bcrypt.compareSync(password, this.passwordHash);
};

// Creating a mongoose model named 'User' based on the userSchema
const User = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = User;
