const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    shipperName: {type: String, required: true},
    shipperPhone: {type: String, required: true},
    sourceAddress: {type: String, required: true},
    destAddress: {type: String, required: true},
    shipmentDate:{type: String,required: true},
    Amount: {type:String,required :true}
  });


const Shipment = mongoose.model("Shipment", shipmentSchema); 

module.exports = Shipment;