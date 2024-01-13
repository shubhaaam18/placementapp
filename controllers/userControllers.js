// Importing required models and modules
const User = require('../models/userSchema');
const Student = require('../models/studentSchema');
const fs = require('fs');
const fastcsv = require('fast-csv');

// Render sign up page
module.exports.signup = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('back');
	}
	res.render('signup');
};

// Render sign in page
module.exports.signin = function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('back');
	}
	res.render('signin');
};

// Create session
module.exports.createSession = function (req, res) {
	console.log('Session created successfully');
	return res.redirect('/');
};

// Sign out
module.exports.signout = function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
	});
	return res.redirect('/users/signin');
};

// Create user
module.exports.createUser = async function (req, res) {
	const { name, email, password, confirmPassword } = req.body;
	try {
		// Check if passwords match
		if (password !== confirmPassword) {
			console.log(`Passwords don't match`);
			return res.redirect('back');
		}

		// Check if user with the provided email already exists
		const user = await User.findOne({ email });

		if (user) {
			console.log(`Email already exists`);
			return res.redirect('back');
		}

		// Create a new user and save it to the database
		const newUser = await User.create({
			name,
			email,
			password,
		});

		await newUser.save();

		if (!newUser) {
			console.log(`Error in creating user`);
			return res.redirect('back');
		}

		return res.redirect('/users/signin');
	} catch (error) {
		console.log(`Error in creating user: ${error}`);
		res.redirect('back');
	}
};

// Download report in CSV format
module.exports.downloadCsv = async function (req, res) {
	try {
		// Fetch all students from the database
		const students = await Student.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

		for (let student of students) {
			data =
				no +
				',' +
				student.name +
				',' +
				student.email +
				',' +
				student.college +
				',' +
				student.placement +
				',' +
				student.contactNumber +
				',' +
				student.batch +
				',' +
				student.dsa +
				',' +
				student.webd +
				',' +
				student.react;

			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
				}
			}
			no++;
			csv += '\n' + data;
		}

		// Generate CSV file and download it
		const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
			if (error) {
				console.log(error);
				return res.redirect('back');
			}
			console.log('Report generated successfully');
			return res.download('report/data.csv');
		});
	} catch (error) {
		console.log(`Error in downloading file: ${error}`);
		return res.redirect('back');
	}
};
