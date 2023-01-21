const expressAsyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");

const accessChat = expressAsyncHandler( async(req,res,next) => {
  console.log(req.body);
  const {userId} = req.body;
  console.log("user",userId);

  if(!userId) {
    res.status(404);
   throw new Error("UserId not found");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: {$elemMatch: {$eq: req.user._id}}
      },
      {
        users: {$elemMatch: {$eq: userId}}
      }
    ]
  }).populate("users","-password").populate("latestMessage");

  isChat == await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: "name pic email"
  });

  if(isChat.lenngth > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  };

  try{
    const createdChat = await Chat.create(chatData);
    console.log(createdChat);
    const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

});

const fetchChat = expressAsyncHandler( async(req,res,next) => {
  const userId = req.query.userId;
  console.log(userId, req.query);
  try{
    let response = await Chat.find({users: {$elemMatch: {$eq: userId}}})
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1})
    response = await User.populate(response, {
      path: "latestMessage.sender",
      select: "name pic email"
    });
    res.send(response);
  }catch(error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = expressAsyncHandler(async(req,res,next) => {
  var users = JSON.parse(req.body.users);
  console.log(users, req.user);
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({
      _id: groupChat._id
    }).populate("users", "-password")
    .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch(error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = expressAsyncHandler( async() => {
  const {chatId, chatName} = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  ).populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const removeFromGroup = expressAsyncHandler( async(req,res,next) => {
  const {chatId , userId} = req.body;
  console.log(chatId);
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  ).populate("users", "-password").populate("groupAdmin", "-password");
  console.log(removed);
  if(!removed) {
    res.status(404);
    throw new Error("chat not found");
  } else{
    res.json(removed);
  }
});

const addToGroup = expressAsyncHandler( async(req,res,next) => {
  const {chatId, userId} = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {users: userId}
    },
    {
      new: true,
    }
  ).populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  addToGroup,
  removeFromGroup,
  renameGroup,
  createGroupChat,
  fetchChat,
  accessChat
}