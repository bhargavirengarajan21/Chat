const mongoose = require("mongoose");

const EventModel = mongoose.Schema({
  eventName: {type: String , trim: true, require: true},
  volunteer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  creator: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"},
  startTime: {type: Date, require: true},
  eventDescription : {type: String, trim: true},
  endTime: {type: Date},
  status: {type: String , require: true},
  Location: {type: String, require: true}
});

const  Event = mongoose.model("Event", EventModel);
module.exports = Event;