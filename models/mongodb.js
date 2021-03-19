require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.DB_LOCAL_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('autoIndex', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
