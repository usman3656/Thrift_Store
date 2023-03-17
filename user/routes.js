const express = require("express");
const userController = require('./controller');
const auth = require('../auth/authorization')

const router = express.Router();

router.post("/register-login", userController.registerloginUser);
router.get("/get-user",auth.authenticateToken, userController.getUser);
router.put("/update_user", auth.authenticateToken, userController.updateUser);
router.delete("/delete_user",auth.authenticateToken, userController.deleteUser);
router.post("/refresh-token", auth.resetAccessToken);


module.exports = router