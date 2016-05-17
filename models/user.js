var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username				: String,
	name				: String,
	provider_id : {type: String},
	photo			 : String,
  password : String,
  first_name : String,
  last_name : String,
  traveler_name : String,
  email : String,
	createdAt	 : {type: Date, default: Date.now}
});

userSchema.methods.validPassword = function (password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

var User = mongoose.model('User', userSchema, 'travelers');
