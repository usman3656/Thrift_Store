const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String, required: true },
  address: { type: String },
  country: { type: String },
  city: { type: String },
  role: { type: String, required: true, enum: ["User","Admin"],default:'User'},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
