const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipperSchema = new Schema({
    shipperName: {
        type: String, 
        required: true
    },
    shipperPhone: {
        type: String, 
        required: true
    },
    shipperStatus:{
        type: String,
        required: true,
        enum: ['booked', 'available']
    }
  });


const Shipper = mongoose.model("Shipper", shipperSchema); 

module.exports = Shipper;