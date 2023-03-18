const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    firstName: {type: String,required: true},
    lastName: {type: String},
    Phone: {type: String,required:true},
    Address: {type: String},
    Country: {type: String},
    City: {type: String},
    role: {type: String, required: true, enum: ['Seller', 'Buyer'] },
  });

const User = mongoose.model("User", userSchema);
  
module.exports = User;