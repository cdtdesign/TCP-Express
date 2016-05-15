var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var journeySchema = new Schema({
	uuid: String,
  travel_token: String,
  traveler_id: String,
  traveler_name: String,
  title: String,
  date: Date,
  body: String,
  description_filename: String,
  header_image_filename: String,
  users_who_like: Array,
  tags: Array,
  deleted_at: String,
  created_at: String,
  updated_at: String
});

module.exports = mongoose.model('Journey', journeySchema, 'journeys');
