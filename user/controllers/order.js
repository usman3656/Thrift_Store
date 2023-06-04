require("dotenv").config();
const Order = require("../../models/Order");
const Shipper = require("../../models/Shipper");

async function createOrder(req, res) {
  try {
    const {
      Address,
      orderItems,
      itemsPrice,
      totalAmount,
      Comments,
      user,
      paymentType,
    } = req.body;

    const availableShipper = await Shipper.findOne({ shipperStatus: 'available' });

    if (!availableShipper) {
      return res.status(400).json({ message: 'No available shippers found' });
    }

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

    const savedOrder = await newOrder.save();

    availableShipper.shipperStatus = 'booked';
    await availableShipper.save();

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });

  } catch (error) {
    console.log(error);
  }
}

async function getOrderByStatus(req, res) {
  try {
    const { status, id } = req.params;
    const order = await Order.find({ orderStatus: status, user: id });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createOrder,
  getOrderByStatus
};
