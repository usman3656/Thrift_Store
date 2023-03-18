const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    ProductId: {type: mongoose.Types.ObjectId,required: true,ref:"Product"},
    quantity: {type: Number,required: true}
  });

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema); 
  
module.exports = OrderDetail;