const express = require("express");
const userController = require("./controllers/user");
const productController = require("./controllers/product");
const orderController = require("./controllers/order");
const shipperController = require("../admin/controllers/shipper");
const auth = require("../auth/authorization");

const router = express.Router();

router.get("/get-user", auth.authenticateToken, userController.getUser);
router.get("/getAllUsers", auth.authenticateToken, userController.getAllUsers);
router.delete("/delete_user", auth.authenticateToken, userController.deleteUser);
// shipper routes
router.post("/addShipper", shipperController.addShipper); //authorization required
//product routes

module.exports = router;
