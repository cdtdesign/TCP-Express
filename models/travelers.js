var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var travelerSchema = new Schema({
  passport_id: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  traveler_name: String,
  traveler_gender: String,
  parent_gender: String,
  traveler_birthday: Date,
  parent_birthday: Date,
  photo: '/images/profile-images/'String,
  street: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number,
  journeys_liked: Array,
  suspended: Boolean,
  deleted_at: String,
  created_at: String,
  updated_at: String
});


var Traveler = mongoose.model('Traveler', travelerSchema, 'travelers');
// module.exports = mongoose.model('Traveler', travelerSchema, 'travelers');
