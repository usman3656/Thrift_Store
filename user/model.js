const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: {type: String,required: true,unique: true,},
  password: {type: String,required: true,},
  firstName: {type: String,required: true,},
  lastName: {type: String,required: true},
  Phone: {type: String,required: true,},
  Address: {type: String,required: true,},
  Country: {type: String,required: true},
  City: {type: String,required: true},
  role: {type: String, required: true, enum: ['Seller', 'Buyer']},
});

const productSchema = new Schema({
  productName:{type: String,required: true,},
  productDescription:{type: String,required: true,},
  productPrice:{type: Number,required: true},
  productImage:{type: [String],required: true,},
  productCategory:{type: String,required: true,enum: ['Clothes', 'Shoes', 'Accessories']},
  availableQuantity:{type: Number,required: true,}
});

const orderSchema = new Schema({
  orderDate: {type: Date,required: true,},
  orderStatus: {type: String,required: true,enum: ['Pending', 'Shipped', 'Delivered']},
  deliveryDate: {type: Date,required: true,},
  totalAmount: {type: Number,required: true,},
  Comments:{type: String,required: false,},
  paymentType:{type: String,required: true,enum: ['Cash', 'Credit Card']},
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product',Quantity: {type: String, required: true}}]
});

const shipmentSchema = new Schema({
  shipperName: {type: String, required: true},
  shipperPhone: {type: String, required: true},
  sourceAddress: {type: String, required: true},
  destAddress: {type: String, required: true},
  shipmentDate:{type: String,required: true},
  Amount: {type:String,required :true}
})

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Shipment = mongoose.model("Shipment", shipmentSchema); 



module.exports = User,Product,Order,Shipment;