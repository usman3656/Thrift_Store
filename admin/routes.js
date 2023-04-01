const express = require("express");
const userController = require('./controllers/user');
const productController=require('./controllers/product');
const orderController=require('./controllers/order');
const shipperController=require('../admin/controllers/shipper');
const auth = require('../auth/authorization')

const router = express.Router();

router.get("/get-user",auth.authenticateToken, userController.getUser);

module.exports = router