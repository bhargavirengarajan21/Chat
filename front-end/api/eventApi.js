const express = require("express");
const router = express.Router();
const { getCreatedEvents, getVolunteerEvents, getAllEvents } = require('./service/eventService');

router.get('/created/events', async(req,res,next) => {
  try { 
    console.log(req.headers.authorization);
    const response = await getCreatedEvents(req.headers.authorization, req.query.userId);
    res.send(response.data).status(200);
  } catch(error) {
    res.status(404);
  }
});
router.get('/volunteer/events', async(req,res,next) => {
  try { 
    console.log(req.headers.authorization);
    const response = await getVolunteerEvents(req.headers.authorization, req.query.userId);
    res.send(response.data).status(200);
  } catch(error) {
    res.status(404);
  }
});
router.get('/events', async(req,res,next) => {
  try { 
    console.log(req.headers.authorization);
    const response = await getAllEvents(req.headers.authorization, req.query.userId);
    res.send(response.data).status(200);
  } catch(error) {
    res.status(404);
  }
});

module.exports = router;