const express = require("express");
const userController = require("./controllers/user");
const productController = require("./controllers/product");
const orderController = require("./controllers/order");
const shipperController = require("../admin/controllers/shipper");
const auth = require("../auth/authorization");
const upload=require("../middleware/multer");

const router = express.Router();

//user routes
router.post("/register-login", userController.registerloginUser);
router.post("/login", userController.login);
router.post("/forgot", userController.forgotPassword);
router.post("/forgot/verify", userController.verifyPassword);
router.get("/getProfile/:id",userController.getByID);
router.get("/get-profile", auth.authenticateToken, userController.getProfile);
router.put("/update_user", userController.updateUser);
router.patch("/update-user-profile",userController.updateUserProfile)
router.post("/refresh-token", auth.resetAccessToken);
//product routes
router.post("/add-product",upload.array("image"), productController.addProduct); //authentication needs to be added [removed for testing purposes]
router.patch("/update-product", productController.updateProduct);
router.delete("/delete-product", productController.deleteProduct);
router.get("/get-products", productController.getProducts);
router.get("/get-products/:id",productController.getProductById);
router.get("/get-productbycateg/:productCategory", productController.getByCateg);
router.get("/get-productbyseller/:sellerID",productController.getBySellerID);
router.get("/search",productController.searchProduct);
//order routes
router.post("/create-order", orderController.createOrder); //authorization required
router.get("/get-order-status/:status/:id",orderController.getOrderByStatus);

module.exports = router;
