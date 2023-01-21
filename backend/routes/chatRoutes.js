const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const chatController = require("../controller/chatController");

const router = express.Router();

router.post("/",[protect,chatController.accessChat]);
router.get("/",[protect,chatController.fetchChat]);
router.patch("/rename",[protect,chatController.renameGroup]);
router.post("/group",[protect,chatController.createGroupChat]);
router.put("/removeGroup",[protect,chatController.removeFromGroup]);
router.post("/groupAdd",[protect,chatController.addToGroup]);

module.exports = router;