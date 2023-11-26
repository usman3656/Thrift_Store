const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{type: String,required: true},
    productDescription:{type: String,required: true},
    productPrice:{type: Number,required: true},
    productImage:[{type: String,required:true}],
    productCategory:{type: String,required: true,enum: ['Clothing', 'Motors', 'Accessories','Electronics']},
    availableQuantity:{type: Number,required: true,default:1},
    sellerID: {type: mongoose.Types.ObjectId,required:true,ref:"User"},
    productStatus: {type:String,reuired:true,enum:['Sold','Listed']},
    createdAt:{type:Date, default:Date.now},
    numOfReviews:{type:Number,default:0},
    reviews:[
      { user:{type: mongoose.Schema.ObjectId, ref: "User", required: true},
        name:{type:String,required:true},
        rating:{type:Number,required:true},
        comment:{type:String, required:true}
    }]
  });
  

const Product = mongoose.model("Product", productSchema);

module.exports = Product;