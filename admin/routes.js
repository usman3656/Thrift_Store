const express = require("express");
const userController = require("./controllers/user");
const productController = require("./controllers/product");
const orderController = require("./controllers/order");
const shipperController = require("../admin/controllers/shipper");
const auth = require("../auth/authorization");

const router = express.Router();

router.get("/get-user", userController.getUser);
router.get("/getAllUsers", userController.getAllUsers);
router.delete("/delete_user", userController.deleteUser);
// shipper routes
router.post("/addShipper", shipperController.addShipper); //authorization required
router.get("/getShippers",shipperController.getShippers);
router.patch("/update-shipper-status",shipperController.updateStatus);
// order routes
router.get("/get-orders",orderController.getAllOrders);
router.patch("/update-order-status",orderController.updateOrderStatus);
//stats
router.get("/statistics",userController.getData);
router.get("/sales",orderController.getSalesData);
router.get("/productStats",productController.getProdData);

module.exports = router;
