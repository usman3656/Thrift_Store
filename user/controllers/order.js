require('dotenv').config();
const { default: mongoose } = require('mongoose');
const Cart = require('../../models/Cart');
const Order = require("../../models/Order");
const OrderDetail = require('../../models/OrderDetail');
const Shipment = require('../../models/Shipment');
const Shipper= require('../../models/Shipper');

async function createOrder (req,res){
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

async function updateOrderStatus (req,res){

    try {
        console.log(req.body);

        await Order.findByIdAndUpdate({orderID : req.body.orderID},{orderStatus: req.body.orderStatus});
        
        const orderupdate = await User.find({orderID :req.body.orderID});

        if(!orderupdate) {
            res.send("no order found");
        } else {
            res.send(orderupdate)
        }
    }

       catch (error) {
        res.status(400).send(error);
      }



};

async function getAllOrders (req,res){
    try{
        
       
      const x = await Order.find({});
         
         if (!x) {
           res.send("no order found");
         } else {
           res.send({
             message: "successfully fetched data",
             data: { x },
           });
         }
       } catch (error) {
         console.log(error);
       }
    }




module.exports = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
};