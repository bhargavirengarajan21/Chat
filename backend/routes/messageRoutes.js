const express =  require("express");
const {
  allMessages,
  sendMessages,
} = require("../controller/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router =  express.Router()

router.post("/",[protect, sendMessages]);
router.get("/:chatId", [protect, allMessages]);

module.exports = router;