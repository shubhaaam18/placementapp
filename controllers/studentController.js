// Importing required models
const Company = require('../models/companySchema');
const Student = require('../models/studentSchema');

// Render create student page
module.exports.createStudentPage = async function (req, res) {
	// Render the 'add_student' view for creating a new student
	return res.render('add_student');
};

// Create student
module.exports.createStudent = async function (req, res) {
	const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
	try {
		// Check if the student with the provided email already exists
		const student = await Student.findOne({ email });

		if (student) {
			console.log('Email already exists');
			return res.redirect('back');
		}

		// Create a new student and save it to the database
		const newStudent = await Student.create({
			name,
			email,
			college,
			batch,
			placement,
			contactNumber,
			dsa,
			webd,
			react,
		});
		await newStudent.save();

		// Redirect to the home page after successful student creation
		return res.redirect('/');
	} catch (error) {
		console.log(`Error in creating student: ${error}`);
		// Redirect to the previous page in case of an error
		return res.redirect('back');
	}
};

// Delete student
module.exports.deleteStudent = async function (req, res) {
	const { id } = req.params;
	try {
		// Find the student using the provided ID in params
		const student = await Student.findById(id);

		// Find the companies for which interviews are scheduled
		// and delete the student from the company interviews list
		if (student && student.interviews.length > 0) {
			for (let item of student.interviews) {
				const company = await Company.findOne({ name: item.company });
				if (company) {
					for (let i = 0; i < company.students.length; i++) {
						if (company.students[i].student.toString() === id) {
							company.students.splice(i, 1);
							company.save();
							break;
						}
					}
				}
			}
		}

		// Delete the student from the database
		await Student.findByIdAndDelete(id);
		res.redirect('back');
	} catch (error) {
		console.log('Error in deleting student');
		// Redirect to the previous page in case of an error
		return res.redirect('back');
	}
};
