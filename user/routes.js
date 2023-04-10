const express = require("express");
const userController = require("./controllers/user");
const productController = require("./controllers/product");
const orderController = require("./controllers/order");
const shipperController = require("../admin/controllers/shipper");
const auth = require("../auth/authorization");

const router = express.Router();

//user routes
router.post("/register-login", userController.registerloginUser);
router.post("/login", userController.login);
router.post("/forgot", userController.forgotPassword);
router.post("/forgot/verify", userController.verifyPassword);

router.get("/get-profile", auth.authenticateToken, userController.getProfile);
router.put("/update_user", userController.updateUser);
router.post("/refresh-token", auth.resetAccessToken);
//product routes
router.post("/add-product", auth.authenticateToken, productController.addProduct);
router.patch("/update-product", auth.authenticateToken, productController.updateProduct);
router.delete("/delete-product", auth.authenticateToken, productController.deleteProduct);
router.get("/get-products", auth.authenticateToken, productController.getProducts);
router.get("/get-productbycateg", auth.authenticateToken, productController.getByCateg);
//order routes
router.post("/create-order", auth.authenticateToken, orderController.createOrder);
router.put("/update-order", auth.authenticateToken, orderController.updateOrderStatus);
router.get("/getall-order", auth.authenticateToken, orderController.getAllOrders);
//shipper routes

module.exports = router;
