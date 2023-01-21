const express = require("express");
const connectDb = require("./config/connectDb");
const { config } = require('./config/local');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const messageRoutes = require('./routes/messageRoutes');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

connectDb();
app.get('/', (req,res,next) => {
   res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/event",eventRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(config.port, console.log("Server Started on 5000"));

const io = require("socket.io")(server, {
   pingTimeout: 6000,
   cors: {
      origin: '*',
      credential: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["content-type", "Authorization"],
   },
});

io.on("connection", (socket) => {
   console.log("connected to socket.io");
   socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
   });

   socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room:" + room);
   })

   socket.on("typing", (room) => socket.in(room).emit("typing"));
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

   socket.on("new message", (newMessage) => {
      var chat = newMessage.chat;
      if(!chat.users) return console.log("chat.users not defined");
      chat.users.forEach((user) => {
         if(user._id === newMessage.sender._id) return;
         socket.in(user._id).emit("message recieved", newMessage);
      })
   });

   socket.off("setup", () => {
      console.log("User Disconnected");
      socket.leave(userData._id);
   });
});

