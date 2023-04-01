const express = require("express");
const userController = require('./controllers/user');
const productController=require('./controllers/product');
const orderController=require('./controllers/order');
const shipperController=require('./controllers/shipper');
const auth = require('../auth/authorization')

const router = express.Router();

//user routes
router.post("/register-login", userController.registerloginUser);
router.post("/login",userController.login);
router.get("/get-user",auth.authenticateToken, userController.getUser);
router.put("/update_user", userController.updateUser);
router.delete("/delete_user", userController.deleteUser);
router.post("/refresh-token", auth.resetAccessToken);
//product routes
router.post("/add-product",productController.addProduct);
router.patch("/update-product",productController.updateProduct);
router.delete("/delete-product",productController.deleteProduct);
router.get("/get-products",productController.getProducts);
router.get("/get-productbycateg",productController.getByCateg);
//order routes
router.post("/create-order",orderController.createOrder);
//shipper routes
router.post("/addShipper",shipperController.addShipper);




module.exports = router