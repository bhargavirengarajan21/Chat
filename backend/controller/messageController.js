const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const allMessages = asyncHandler( async (req, res) => {
  try{
    const messages = await Message.find({ chat: req.params.chatId}).populate("sender", "name pic email").populate("chat");
    res.send(messages);
  }catch(error) {
    console.log(error);
    res.status(400);
    throw new Error(error.messages);
  }
});

const sendMessages = asyncHandler( async(req, res) => {
  console.log("eneer");
  const {content, chatId} = req.body;
  if(!content || !chatId) {
   console.log("Invalid data passed into request");
   return res.sendStatus(400);
  } 

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  }

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email"
    });
    console.log(message);
    await Chat.findByIdAndUpdate(req.body.chatId,  {latestMessage: message});
    res.send(message);
  } catch(error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {allMessages, sendMessages};