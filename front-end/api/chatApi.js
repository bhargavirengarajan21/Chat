const express = require("express");
const router = express.Router();
const {postUserChatResponse, createGroup, userChatResponse, sendMessage, getMessage, removeUser} = require("./service/chatService");

router.post( '/userChat', async(req,res,next) => {
  try{
    const response = await postUserChatResponse(req.headers.authorization,req.body.userId);
    res.send(response.data).status(200);
  }catch(error) {
    res.status(404);
  }
});

router.post( '/group', async(req,res,next) => {
  try{
    const {name, users } = req.body;
    console.log("name",name,users);
    const response = await createGroup(req.headers.authorization, name, users);
    res.send(response.data).status(200);
  }catch(error) {
    res.status(404);
  }
});

router.get( '/', async(req,res,next) => {
  try{
    const { userId } = req.query;
    console.log("w",req.query);
    const response = await userChatResponse(req.headers.authorization, userId);
    res.send(response.data);
  }catch(error) {
    res.status(404);
  }
});

router.post("/message", async(req,res,next) => {
  try {
   console.log("post");
   const response  =  await sendMessage(req.headers.authorization, req.body);
   res.send(response.data);
  }catch(error) {
    console.log(error);
    res.status(404);
  }
});

router.get("/message", async(req,res,next) => {
  try {
    console.log("get");
    const response  =  await getMessage(req.headers.authorization, req.query);
    res.send(response.data);
   }catch(error) {
    console.log(error);
     res.status(404);
   }
});

router.put("/removeGroup", async(req,res,next) => {
  try {
    console.log("get");
    const response  =  await removeUser(req.headers.authorization, req.body);
    res.send(response.data);
   }catch(error) {
     res.status(404);
   }
});


module.exports = router;