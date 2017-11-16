var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var travelerSchema = new Schema({
  passport_id: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  parent_gender: String,
  parent_birthday: Date,
  photo: String,
  travelers: [{
    id: String,
    name: String,
    birthday: Date,
    gender: String,
    photo: String,
  }],
  street: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number,
  journeys_liked: Array,
  currently_reading: {
    title: String,
    author: String,
    began_reading: Date,
    minutes: Number
  }
  suspended: Boolean,
  deleted_at: String,
  created_at: String,
  updated_at: String
});

var Traveler = mongoose.model('Traveler', travelerSchema, 'travelers');
// module.exports = mongoose.model('Traveler', travelerSchema, 'travelers');
