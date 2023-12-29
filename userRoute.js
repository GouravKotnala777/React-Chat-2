const express = require("express");
const router = express.Router();
const { register, login, myProfile, allUsers, findSingleUser } = require("../controllers/userController");
const { isUserAuthenticated } = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(isUserAuthenticated, myProfile);
router.route("/user").post(isUserAuthenticated, findSingleUser);
router.route("/allUsers").post(isUserAuthenticated, allUsers);

module.exports = router;