require('dotenv').config();
const Product = require("../../models/Product");

async function getProdData(req,res){
    Product.aggregate([
        {
          $group: {
            _id: '$productStatus',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            value: '$count'
          }
        }
      ])
        .exec((err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            res.json(result);
          }
        });
}

module.exports = {
    getProdData
    
};