const express = require("express");
const router = express.Router();
const {loginUser, createUser, getAllUser, getSearchUser} = require("./service/userService");
const {setSession , getSession} = require("./service/sessionService");

router.get("/signin", async (req,res,next) => {
  try { 
    console.log(req.query);
    const response = await loginUser(req.query.email,req.query.password);
    req = {
      session: {
        id: response._id,
      }
    }
    return res.send(response.data).status(200);
  } catch(error) {
    res.status(404);
  }
});

router.post("/create", async (req,res,next) => {
  try { 
    const response = await createUser(req.body);
    req = {
      session: {
        id: response._id,
      }
    }
    res.send(req.session).status(200);
  } catch(error) {
    res.status(404);
  }
});


router.get("/session" ,async(req,res,next) => {
  try {
    const user_id = req.query.uid;
    const response = await getSession("data_"+user_id);
    res.send(response).status(200);
  } catch(error) {
    console.log(error);
    res.status(404);
  }
});

router.post("/session" ,async(req,res,next) => {
  try {
    await setSession(req.body.key,req.body.value)
    res.status(200);
  } catch(error) {
    res.status(404);
  }
});

router.get("/searchUser", async(req,res,next) => {
  try {
    const response = await getSearchUser(req.headers.authorization, req.query.search);
    res.send(response.data).status(200);
  }catch(error) {
    res.status(404);
  }
});

module.exports = router;