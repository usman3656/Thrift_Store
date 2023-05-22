const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderDate: { type: Date, required: true,default:Date.now},
  orderStatus: { type: String, required: true, enum: ["Pending", "Shipped", "Delivered"],deafault:"Pending" },
  deliveryDate: { type: Date, required: true },
  Address:{
    address:{ type:String, required:true },
    city:{ type:String, required:true },
    country:{ type:String, required:true },
    phone:{ type:Number, required:true }
  },
  orderItems:[{
    productID:{type:mongoose.Schema.ObjectId,ref:"Product",required:true},
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productQuantity:{type:Number,required:true},    
  }],
  itemsPrice:{type:Number,required:true},
  deliveryPrice:{type:Number,required:true,default:200},
  totalAmount: { type: Number, required: true },
  Comments: { type: String },  
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  shipperID:{type:mongoose.Types.ObjectId,required:true,ref:"Shipper"},
  paymentType: { type: String, required: true, enum: ["Cash", "Credit Card"] },
  paymentStatus:{type:String,required:true,enum:["Pending","Paid"],default:"Pending"},
  
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
