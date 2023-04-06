const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderDate: { type: Date, required: true },
  orderStatus: { type: String, required: true, enum: ["Pending", "Shipped", "Delivered"] },
  deliveryDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  Comments: { type: String },
  paymentType: { type: String, required: true, enum: ["Cash", "Credit Card"] },
  buyerID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  shipmentID: { type: mongoose.Types.ObjectId, required: true, ref: "Shipment" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
