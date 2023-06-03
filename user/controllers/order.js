require("dotenv").config();
const { default: mongoose } = require("mongoose");
const Order = require("../../models/Order");
const Shipper = require("../../models/Shipper");

async function createOrder(req, res) {
  try {

    // Get the data from req.body
    const {
      Address,
      orderItems,
      itemsPrice,
      totalAmount,
      Comments,
      user,
      paymentType,
    } = req.body;

    // Find an available shipper
    const availableShipper = await Shipper.findOne({ shipperStatus: 'available' });

    if (!availableShipper) {
      return res.status(400).json({ message: 'No available shippers found' });
    }

    // Create a new order
    const newOrder = new Order({
      orderDate: Date.now(),
      orderStatus: 'Pending',
      deliveryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      Address,
      orderItems,
      itemsPrice,
      deliveryPrice: 300,
      totalAmount,
      Comments,
      user,
      shipperID: availableShipper._id,
      paymentType,
      paymentStatus: 'Pending',
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Update the shipper's status to 'booked'
    availableShipper.shipperStatus = 'booked';
    await availableShipper.save();

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });

  } catch (error) {
    console.log(error);
  }
}

async function updateOrderStatus(req, res) {
  try {
    console.log(req.body);

    await Order.findByIdAndUpdate(
      { orderID: req.body.orderID },
      { orderStatus: req.body.orderStatus }
    );

    const orderupdate = await User.find({ orderID: req.body.orderID });

    if (!orderupdate) {
      res.send("no order found");
    } else {
      res.send(orderupdate);
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getAllOrders(req, res) {
  try {
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
  updateOrderStatus,
  getAllOrders,
};
