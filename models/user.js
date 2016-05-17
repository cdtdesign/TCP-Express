var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username				: String,
	name				: String,
	provider_id : {type: String},
	photo			 : String,
  password : String,
	createdAt	 : {type: Date, default: Date.now}
});

userSchema.methods.validPassword = function (password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

var User = mongoose.model('User', userSchema, 'users');
