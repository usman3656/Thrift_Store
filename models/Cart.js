const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products:{
        type: mongoose.Types.ObjectId,
        ref:"Product" // not sure is we write type as array or mongoose.Types.ObjectID
    },
    userID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    }

  });

const Cart = mongoose.model("Cart", cartSchema);
  
module.exports = Cart;