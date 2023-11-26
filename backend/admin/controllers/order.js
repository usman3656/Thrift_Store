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

  async function getSalesData(req,res){
    try {
      const salesData = await Order.aggregate([
        {
          $project: {
            month: { $month: '$orderDate' },
            sales: { $multiply: [1, { $size: '$orderItems' }] }
          }
        },
        {
          $group: {
            _id: '$month',
            sales: { $sum: '$sales' }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      const monthlySalesData = Array.from({ length: 12 }, (_, i) => {
        const monthNumber = i + 1;
        const monthName = new Date(0, monthNumber - 1).toLocaleString('default', { month: 'short' });
        const sales = salesData.find(item => item._id === monthNumber)?.sales || 0;
  
        return { name: monthName, Sales: sales };
      });
  
      res.json(monthlySalesData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  module.exports = {
    updateOrderStatus,
    getAllOrders,
    getSalesData
  };
