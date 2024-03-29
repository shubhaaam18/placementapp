// mongoose.set('strictQuery',true);
// const dotenv = require('.env');

const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGODB_URI;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to Database :: Mongodb');
});

module.exports = mongoose;
