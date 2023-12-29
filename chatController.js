const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.accessChat = async(req, res, next) => {
    const {userId} = req.body;
    if (!userId) {
        return res.json({success:false, message:"userId param not sent with request"});
    }

    let isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users", "-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path:"latestMessage.sender",
        select:"name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0])
    }
    else{
        const chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id, userId]
        };
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id:createdChat.id}).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

exports.fetchChats = async(req, res, next) => {
    try {
        await Chat.find({users:{$elemMatch:{$eq:req.user.id}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async(results) => {
            results = await User.populate(results, {
                path:"latestMessage.sender",
                select:"name pic email"
            });
            res.status(200).send(results);
        });

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
        
    }
};


exports.createGroupChat = async(req, res, next) => {
    if (!req.body.users || !req.body.chatName) {
        return res.status(400).send({message:"all fields are required"});
    }




    // Tutorial mai req.body.users string ke
    // formate me liya tha fir use parse kiya tha


    // let users = JSON.parse(req.body.users);

    if (req.body.users.length < 2) {
        return res.send("More than 2 users are required for create group");
    }

    req.body.users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName:req.body.chatName,
            users:req.body.users,
            isGroupChat:true,
            groupAdmin:req.user
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
                                    .populate("users", "-password")
                                    .populate("groupAdmin", "-password");
        res.json(fullGroupChat);
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.renameGroup = async(req, res) => {
    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {chatName}, {new:true})
                                .populate("users", "-password")
                                .populate("groupAdmin", "-password");

    if (!updatedChat) {
        throw new Error("Chat not found")
    }
    else{
        res.json(updatedChat);
    }
};




exports.addToGroup = async(req, res, next) => {
    const {userId, chatId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, {$push:{users:userId}}, {new:true})
                        .populate("users", "-password")
                        .populate("groupAdmin", "-password");
                        
    if (!added) {
        throw new Error("Chat not found")
    }
    else{
        res.json(added);
    }
};
exports.removeFromGroup = async(req, res, next) => {
    const {userId, chatId} = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId, {$pull:{users:userId}}, {new:true})
                        .populate("users", "-password")
                        .populate("groupAdmin", "-password");
                        
    if (!removed) {
        throw new Error("Chat not found")
    }
    else{
        res.json(removed);
    }
};


exports.addChatMembers = async(req, res, next) => {
};

exports.removeChatMembers = async(req, res, next) => {
};      // For Admin

exports.removeMeFromChat = async(req, res, next) => {
}

exports.findSingleMyChatMember = async(req, res, next) => {
    
};