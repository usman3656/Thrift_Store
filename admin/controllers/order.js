const Order = require("../../models/Order");

async function updateOrderStatus(req, res) {
    try {
        const {orderID,orderStatus}=req.body;
        const orderupdate = await Order.findOneAndUpdate({_id:orderID},{orderStatus:orderStatus},{ new: true }      
      );      
        res.send(orderupdate);      
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async function getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      if (!orders) {
        res.send("no order found");
      } else {
        res.send({
          message: "successfully fetched data",
          data: { orders },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  module.exports = {
    updateOrderStatus,
    getAllOrders,
  };
