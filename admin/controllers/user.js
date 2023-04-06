require("dotenv").config();
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const jwt = require("jsonwebtoken");

async function getUser(req, res) {
  try {
    console.log("get function");
    const { username, firstName, lastName } = req.query;
    console.log(req.params);
    console.log("get function");

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
    //res.send({message:"User Not found!"});
    console.log(error);
  }
}
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.send({ message: "Success!", users });
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.deleteOne({ username: req.body.username });
    res.send(user);
    cookies.set("testtoken", { maxAge: 0 });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getUser,
  getAllUsers,
  deleteUser,
};
