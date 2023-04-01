require('dotenv').config();
const User = require("../../models/User");
const Cart= require("../../models/Cart");
const jwt = require('jsonwebtoken');


async function getUser (req,res) {

    try{
      console.log("get function")
      const { username, firstName, lastName } = req.query;
      console.log(req.params) 
      console.log("get function")

      let user;
      if (username) {
        user = await User.findOne({ username });
      } else if (lastName) {
        user = await User.findOne({ lastName });
      } else if (firstName) {
        console.log(firstName);
        user = await User.findOne({ firstName });
      } 

      if (!user) {
        res.send("Invalid details");
      } else {
        res.send({
          message: "successfully fetched data",
          data: { user },
        });
      }
    } catch (error) {
      console.log(error);
    }
}

module.exports = {
    getUser,
}
