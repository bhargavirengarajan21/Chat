const express = require("express");

const {
  registerUser,
  allUsers,
  findUser,
} = require("../controller/userControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", [protect, allUsers]);
router.post("/",registerUser);
router.get("/login", [findUser]);

module.exports = router;