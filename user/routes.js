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
router.post("/add-product", productController.addProduct); //authentication needs to be added [removed for testing purposes]
router.patch("/update-product", auth.authenticateToken, productController.updateProduct);
router.delete("/delete-product", auth.authenticateToken, productController.deleteProduct);
router.get("/get-products", productController.getProducts);
router.get("/get-products/:id",productController.getProductById);
router.get("/get-productbycateg/:productCategory", productController.getByCateg);
router.get("/get-productbyseller/:sellerID",productController.getBySellerID);
//order routes
router.post("/create-order", auth.authenticateToken, orderController.createOrder);
router.put("/update-order", auth.authenticateToken, orderController.updateOrderStatus);
router.get("/getall-order", auth.authenticateToken, orderController.getAllOrders);
//shipper routes

module.exports = router;
