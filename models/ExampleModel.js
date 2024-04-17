// models/example.js
const mongoose = require('mongoose');

// Define a schema for MongoDB
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
  ts: String,
  machine_status: Number,
  vibration: Number
});

// Define and export the model
const ExampleModel = mongoose.model('Example', exampleSchema);
module.exports = ExampleModel;
