var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  passport_id: String,
  username: String,
	name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String
  },
	provider_id: String,
	photo: String,
  has_local_photo: Boolean,
  password: String,
  pin_code: Number,
  first_name: String,
  last_name: String,
  parent_birthday: Date,
  liked_journeys: [String],
  travelers: [{
    passport_id: String,
    name: String,
    gender: String,
    birthday: Date,
    photo: String,
    currently_reading: [{
      title: String,
      author: String
    }]
  }],
  email: String,
	createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.validPassword = function (password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

var User = mongoose.model('User', userSchema, 'travelers');

module.exports = User;
