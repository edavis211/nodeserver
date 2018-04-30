const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const orgSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  websites: [String],
  description: String,
  relationship: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  title: String,
  org: { type: Schema.Types.ObjectId, ref: 'Org' }
});

//Create the model class
const ModelClass = mongoose.model('org', orgSchema);

//Export the model
module.exports = ModelClass;
