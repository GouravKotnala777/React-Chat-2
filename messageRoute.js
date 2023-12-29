const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const { createMessage, findMyChatMessage } = require("../controllers/messageController");
const router = express.Router();

router.route("/chat/message/:chatId").post(isUserAuthenticated, createMessage);
router.route("/chat/:chatId").post(isUserAuthenticated, findMyChatMessage);

module.exports = router;