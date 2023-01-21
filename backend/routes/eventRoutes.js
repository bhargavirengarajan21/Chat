const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  DeleteVolunteeredEvent,
  DeleteCreatedEvent,
  EnrollEvent,
  addEvent,
  UpdateEvent,
  AllCreatedEvents,
  AllVolunteeredEvents,
  AllOtherEvents
} = require("../controller/eventController");

const router = express.Router();

router.post("/",[protect,addEvent]);
router.patch("/",[protect,UpdateEvent]); 
router.get("/otherEvent",[protect,AllOtherEvents]);  // what happens when duplicate event ?
router.get("/created",[protect,AllCreatedEvents]);
router.get("/volunteer",[protect,AllVolunteeredEvents]);
router.post("/enroll",[protect, EnrollEvent]);
router.delete("/delete_created", [protect, DeleteCreatedEvent]);
router.delete("/delete_volunteer", [protect, DeleteVolunteeredEvent]);

module.exports = router;