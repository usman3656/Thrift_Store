require('dotenv').config();
const { default: mongoose } = require('mongoose');
const Cart = require('../../models/Cart');
const Order = require("../../models/Order");
const OrderDetail = require('../../models/OrderDetail');
const Shipment = require('../../models/Shipment');
const Shipper= require('../../models/Shipper');

const createOrder=async (req,res)=>{
    try {
    const {userID,comments,paymentType,destAddress}=req.body;
    const cart=await Cart.findOne({userID:userID}) //returns cart of user

    if(!cart)
    {
        res.send("Error!");
    } else {

        const shipper=await Shipper.findOne({shipperStatus:'available'});
        //console.log(shipper._id);
        //creates shipment 
        //const id=mongoose.Types.ObjectId();
        const shipment=await Shipment.create([{
            //shipperID,destAddress 
            //_id:id,
            shipperID:shipper._id,
            destAddress
        }]);
        //const id=shipment._id;
        console.log(id);
        const purchaseDate=new Date();
        purchaseDate.setDate(purchaseDate.getDate()+3);
        //creates order with total amount from order detail and other info from request
        const order=await Order.create([{orderDate:new Date(),
            orderStatus:'Pending',
            deliveryDate:purchaseDate,
            totalAmount:0,
            comments,            
            paymentType,
            buyerID:userID,
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