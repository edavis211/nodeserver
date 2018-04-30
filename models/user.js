const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
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

// On save hook, encrypt password
userSchema.pre('save', function(next) {
  //get access to the user model
  const user = this;

  //generate a salt and then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    //hash password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      //overwrite the password with the hash
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;
