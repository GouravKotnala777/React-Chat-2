const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isUserAuthenticated = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        const verifyToken = await jwt.verify(token, "thisismysecret");
        req.user = await User.findById(verifyToken.id);
    } catch (error) {
        console.log(error);
        console.log("login first!!!");
        return res.json({success:false, message:"login first"});
    }
    next();
};