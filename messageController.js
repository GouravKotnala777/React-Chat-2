const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

exports.createMessage = async(req, res, next) => {
    if (!req.user) {
        return res.json({success:false, message:"login first"});
    }
    const {content} = req.body;

    if (!content) {
        return res.json({success:false, message:"wrong input"});
    }
    
    if (!req.params.chatId) {
        return res.json({success:false, message:"no chatId params"});
    }

    try {
        const createMessage = await Message.create({
            sender:req.user.id,
            content,
            chat:req.params.chatId
        });
        const selectedChat = await Chat.findById(req.params.chatId);

        if (!selectedChat) {
            return res.json({success:false, message:"chat not found"});
        }

        selectedChat.latestMessage = createMessage._id;
        await selectedChat.save({validateBeforeSave:false});

        res.json({success:true, message:createMessage});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }

};

exports.findMyChatMessage = async(req, res, next) => {
    if (!req.body.chatId) {
        return res.json({success:false, message:"params not found2"});
    }
    if (!req.params.chatId) {
        return res.json({success:false, message:"params not found3"});
    }
    const messages = await Message.find({chat:req.params.chatId}).populate("chat");
    // console.log(messages);

    if (!messages) {
        return res.json({success:false, message:"messages not found"});
    }

    res.json({success:true, message:messages});
}

exports.findSingleChat = async(req, res, next) => {
    if (!req.params.chatId) {
        return res.json({success:false, message:"params not found1"});
    }
    const messages = await Message.find({chat:req.params.chatId});

    if (!messages) {
        return res.json({success:false, message:"messages not found"});
    }

    res.json({success:true, message:messages});
    // try {
    //     const findChat = await Chat.findById(req.params.chatId);

    //     if (!findChat) {
    //         return res.json({success:false, message:"chat not found"});
    //     }
        
    //     res.json({success:true, message:findChat});
    // } catch (error) {
    //     console.log(error);
    //     res.json({success:false, message:error});
    // }
};