// Importing required models
const Student = require('../models/studentSchema');
const Company = require('../models/companySchema');

// Render company page
module.exports.companyPage = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});
    // Render the 'company' view with the fetched students
    return res.render('company', { students });
  } catch (error) {
    console.log(`Error in rendering page: ${error}`);
    // Redirect to the previous page in case of an error
    return res.redirect('back');
  }
};

// Allocate interview
module.exports.allocateInterview = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});

    let array = [];

    // Create an array of unique batches
    for (let student of students) {
      array.push(student.batch);
    }
    array = [...new Set(array)];

    // Render the 'allocateInterview' view with the fetched students and unique batches
    return res.render('allocateInterview', { students, array });
  } catch (error) {
    console.log(`Error in allocating interview: ${error}`);
    // Redirect to the previous page in case of an error
    return res.redirect('back');
  }
};

// Schedule interview
module.exports.scheduleInterview = async function (req, res) {
  const { id, company, date } = req.body;
  try {
    // Check if the company already exists in the database
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: id,
      date,
      result: 'Pending',
    };

    // If the company doesn't exist, create a new one and add the interview details
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      // If the company exists, check if the student id already exists for scheduling
      for (let student of existingCompany.students) {
        if (student.student._id.toString() === id) {
          console.log('Interview with this student already scheduled');
          return res.redirect('back');
        }
      }
      existingCompany.students.push(obj);
      existingCompany.save();
    }

    // Add the interview details to the student's document
    const student = await Student.findById(id);

    if (student) {
      const interview = {
        company,
        date,
        result: 'Pending',
      };
      student.interviews.push(interview);
      student.markModified('interviews'); // Mark the array as modified
      await student.save();
    }
    console.log('Interview Scheduled Successfully');
    return res.redirect('/company/home');
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};

// Update status of interview
module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    // Find the student by ID
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      // Update the interview status in the student's document
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          student.markModified('interviews'); // Mark the array as modified
          await student.save(); // Save the modified document
          break;
        }
      }
    }

    // Find the company by name
    const company = await Company.findOne({ name: companyName });

    if (company) {
      // Update the interview status in the company's document
      for (let std of company.students) {
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.markModified('students'); // Mark the array as modified
          await company.save(); // Save the modified document
        }
      }
    }
    console.log('Interview Status Changed Successfully');
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
};
