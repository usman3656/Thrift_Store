require('dotenv').config();
const Cart = require('../../models/Cart');
const Order = require("../../models/Order");
const OrderDetail = require('../../models/OrderDetail');
const Shipment = require('../../models/Shipment');

const createOrder=async(req,res)=>{
    try {
    const {userID,comments,paymentType,buyerID}=req.body;
    const cart=await Cart.findOne({userID:userID}) //returns cart of user

    if(!cart)
    {
        res.send("Error!");
    } else {

        //creates order detail with product ids from cart
        const orderDetail=await OrderDetail.create([{
            ProductId:cart.products // idk how to add products separately with quantity
        }]);

        //creates shipment 
        const shipment=await Shipment.create([{
            //shipperName,shipperPhone,sourceAddress,destAddress,shipmentDate,Amount            
        }]);

        //creates order with total amount from order detail and other info from request
        const order=await Order.create([{orderDate:new Date(),
            orderStatus:'Pending',
            deliverydate:{$dateAdd:{startDate: new Date(),unit: "day",amount: 3}},
            totalAmount:0,
            comments,            
            paymentType,
            orderdetailID:orderDetail._id,
            buyerID,
            shipmentID:shipment._id
        }])
    }

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createOrder
};