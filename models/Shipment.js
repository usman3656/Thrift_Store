const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    shipperID:{
      type:mongoose.Types.ObjectId,
      required: true
    },
    destAddress: {
      type: String, 
      required: true
    }
  });


const Shipment = mongoose.model("Shipment", shipmentSchema); 

module.exports = Shipment;