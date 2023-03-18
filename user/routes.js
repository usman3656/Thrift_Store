const express = require("express");
const userController = require('./controllers/user');
const productController=require('./controllers/product')
const auth = require('../auth/authorization')

const router = express.Router();

//user routes
router.post("/register-login", userController.registerloginUser);
router.get("/get-user",auth.authenticateToken, userController.getUser);
router.put("/update_user", auth.authenticateToken, userController.updateUser);
router.delete("/delete_user",auth.authenticateToken, userController.deleteUser);
router.post("/refresh-token", auth.resetAccessToken);
//product routes
router.post("/add-product",productController.addProduct);
router.patch("/update-product",productController.updateProduct);
router.delete("/delete-product",productController.deleteProduct);
router.get("/get-products",productController.getProducts);
router.get("/get-productbycateg",productController.getByCateg);


module.exports = router