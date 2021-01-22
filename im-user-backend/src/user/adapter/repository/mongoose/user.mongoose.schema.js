// user.mongoose.schema.js

// mongo.user.js

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const userSchema = new mongoose.Schema({
  id: String,
  loginname: String,
  name: String,
  surname: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

userSchema.plugin(mongooseHidden); // to hidden _id and __v in query results

module.exports = {
  User,
};
