const EventModel = require('../model/eventModal');
const eventStatus = require("../data/Status");
const expressAsyncHandler = require("express-async-handler");

const addEvent = expressAsyncHandler(async( req,res,next) => {
  const { eventName, creator, startTime, eventDescription, endTime = '' } = req.body;
  const event = await EventModel.create({
    eventName,
    creator,
    startTime,
    eventDescription,
    endTime,
    status: eventStatus.ADDED,
  });
  return res.send(event).status(200);
});

const UpdateEvent = expressAsyncHandler(async( req,res,next) => {
  const { event_id, eventName, creator, startTime, eventDescription, endTime = '' } = req.body;
  const keyword = {
    _id: event_id
  }

  const update = {
    eventName,
    creator,
    startTime,
    eventDescription,
    endTime
  }
  try {
    const event = await EventModel.updateOne(keyword, update);
    return res.status(200).send(event);
  } catch(error) {
    return res.status(404).statusMessage("Details not updated");
  }
  
});

const EnrollEvent = expressAsyncHandler(async( req,res,next) => {
  const { event_id, user_id } = req.body;
  const keyword = {
    _id: event_id
  }

  const update = {
    $push: { 
      "volunteer": user_id
    }
  }
  try {
    const event = await EventModel.updateOne(keyword, update);
    res.status(200).send(event);
  } catch(error) {
    res.status(404).statusMessage("Details not updated");
  }
});

const DeleteCreatedEvent = expressAsyncHandler(async( req,res,next) => {
  const { event_id } = req.body;
  const keyword = {
    _id: event_id
  }
  try {
    const event = await EventModel.deleteOne({keyword});
    res.status(200).send(event);
  } catch(error) {
    res.status(404).statusMessage("Details not updated");
  }
});


const DeleteVolunteeredEvent = expressAsyncHandler(async( req,res,next) => {
  const { event_id, user_id } = req.body;
  console.log(event_id,user_id);
  const keyword = {
    _id: event_id
  }

  const update = {
    $pull: {
     "volunteer": user_id
    }
  }

  try {
    const event = await EventModel.updateOne({keyword,update});
    console.log(event);
    res.status(200).send(event);
  }catch(error) {
    res.status(404).statusMessage("Details not removed");
  }
});

const AllOtherEvents = expressAsyncHandler( async(req,res,next) => {
  const { user_id } = req.query;
  try {
    if(!user_id) {
      return;
    }
    const keyword = {
      creator: { $ne: user_id}
    }
    const event = await EventModel.find(keyword);
    res.status(200).send(event);
  } catch(error) {
    res.status(404).statusMessage("Details not removed");
  }
});

const AllCreatedEvents = expressAsyncHandler( async(req,res,next) => {
  const { user_id } = req.query;
  try {
    if(!user_id) {
      return;
    }
    const keyword = {
      creator: { $eq: user_id}
    }
    const event = await EventModel.find(keyword);
    res.status(200).send(event);
  } catch(error) {
    res.status(404).statusMessage("Details not removed");
  }
});

const AllVolunteeredEvents = expressAsyncHandler( async(req,res,next) => {
  const { user_id } = req.query;
  console.log(user_id);
  try {
     if(!user_id) {
      return;
     }
     const keyword = {
      volunteer: {
        $in: [user_id]
      }
     }
     console.log(keyword);
    const event = await EventModel.find(keyword);
    console.log(event);
    res.status(200).send(event);
  } catch(error) {
    res.status(404).statusMessage("Details not removed");
  }
});

module.exports = {
  DeleteVolunteeredEvent,
  DeleteCreatedEvent,
  EnrollEvent,
  addEvent,
  UpdateEvent,
  AllCreatedEvents,
  AllVolunteeredEvents,
  AllOtherEvents
}