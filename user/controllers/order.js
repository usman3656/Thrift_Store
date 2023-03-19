require('dotenv').config();
const Cart = require('../../models/Cart');
const Order = require("../../models/Order");
const OrderDetail = require('../../models/OrderDetail');
const Shipment = require('../../models/Shipment');
const Shipper= require('../../models/Shipper');

const createOrder=async (req,res)=>{
    try {
    const {userID,comments,paymentType,buyerID,destAddress}=req.body;
    const cart=await Cart.findOne({userID:userID}) //returns cart of user

    if(!cart)
    {
        res.send("Error!");
    } else {

        const shipper=await Shipper.findOne({shipperStatus:'available'});
        //creates shipment 
        const shipment=await Shipment.create([{
            //shipperID,destAddress   
            shipperID:shipper._id,
            destAddress
        }]);

        //creates order with total amount from order detail and other info from request
        const order=await Order.create([{orderDate:new Date(),
            orderStatus:'Pending',
            deliverydate:{$dateAdd:{startDate: new Date(),unit: "day",amount: 3}},
            totalAmount:0,
            comments,            
            paymentType,
            buyerID,
            shipmentID:shipment._id
        }]);

        //creates order detail with product ids and quantity from cart
        const orderDetail=await OrderDetail.create([{
            ProductId:cart.product ,
            quantity:cart.quantity,
            orderID:order._id
        }]);        
    }

    } catch (error) {
        console.log(error);
    }
};

const updateOrderStatus=async (req,res)=>{

};

const getAllOrders= async (req,res)=>{

};

module.exports = {
    createOrder,
    updateOrderStatus
};