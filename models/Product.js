const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{type: String,required: true},
    productDescription:{type: String,required: true},
    productPrice:{type: Number,required: true},
    productImage:{type: [String]},
    productCategory:{type: String,required: true,enum: ['Clothes', 'Shoes', 'Accessories','Electronics']},
    availableQuantity:{type: Number,required: true},
    sellerID: {type: mongoose.Types.ObjectId,required:true,ref:"User"}
  });
  

const Product = mongoose.model("Product", productSchema);

module.exports = Product;