var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');
var randomstring = require("randomstring");

var journeySchema = new Schema({
	uuid: {
		type: String,
		default: uuid.v4()
	},
  travel_token: {
		type: String,
		default: randomstring.generate()
	},
  passport_id: String,
  traveler_name: String,
  title: String,
  date: Date,
  body: String,
  description_filename: String,
  header_image_filename: String,
  users_who_like: Array,
  tags: Array,
  deleted_at: String,
  created_at: {
		type: Date,
		default: Date.now
	},
  updated_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Journey', journeySchema, 'journeys');
