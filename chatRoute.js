const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const { accessChat, createChat, deleteChat, updateChatName, findMyChats, findChat, findSingleChat, addChatMembers, removeChatMembers, findSingleMyChatMember, removeMeFromChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatController");
const router = express.Router();

router.route("/chat").post(isUserAuthenticated, accessChat);  // userId
router.route("/chat").get(isUserAuthenticated, fetchChats);
router.route("/group").post(isUserAuthenticated, createGroupChat);
router.route("/rename").put(isUserAuthenticated, renameGroup);
router.route("/groupadd").put(isUserAuthenticated, addToGroup);
router.route("/groupremove").put(isUserAuthenticated, removeFromGroup);
// router.route("/chat/members/add").put(isUserAuthenticated, addChatMembers);
// router.route("/chat/members/delete").delete(isUserAuthenticated, removeChatMembers);
// router.route("/chat/me/left").delete(isUserAuthenticated, removeMeFromChat);
// router.route("/mymember").post(isUserAuthenticated, findSingleMyChatMember);




// router.route("/chat").post(isUserAuthenticated, createChat);
// router.route("/chats").get(isUserAuthenticated, findMyChats);
// router.route("/chat/:chatId").delete(isUserAuthenticated, deleteChat);
// router.route("/chat/chatName/update").put(isUserAuthenticated, updateChatName);
// router.route("/chat/members/add").put(isUserAuthenticated, addChatMembers);
// router.route("/chat/members/delete").delete(isUserAuthenticated, removeChatMembers);
// router.route("/chat/me/left").delete(isUserAuthenticated, removeMeFromChat);
// router.route("/mymember").post(isUserAuthenticated, findSingleMyChatMember);


module.exports = router;