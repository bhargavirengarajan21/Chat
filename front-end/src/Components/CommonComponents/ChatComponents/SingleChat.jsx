import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import animationData from '../../../data/typing.json';
import { FormControl } from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Box, Text} from "@chakra-ui/layout";
import {IconButton , Spinner, toast, useToast} from "@chakra-ui/react";
import {getSender, getSenderFull } from "../../../helper/chatHelper";
import UpdateGroupModal from "./UpdateGroupChatModal";
import {ArrowBackIcon} from "@chakra-ui/icons";
import ScrollableChat from "./ScrollableChat";
import ProfileModal  from "../ProfileModal";
import { useConfig } from "../../../context/DataProvider";
import Lottie from "react-lottie";

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
 const [message, setMessage] = useState([]);
 const [loading, setLoading] = useState(false);
 const [newMessage , setNewMessage] = useState("");
 const [socketConnected, setSocketConnected] = useState(false);
 const [typing, setTyping] = useState(false);
 const [isTyping, setIsTyping] = useState(false);

 const toast = useToast();

 const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  renderSetting: {
    preserveAspectRatio: "xMidYMid slice",
  },
 }

 const {selectedChat, setSelectedChat, userInfo, notification, setNotification } = useConfig();
 console.log(selectedChat);
 const fetchMessages = async() => {
  if(!selectedChat) return;
  try {
    const config = {
      headers: {
        authorization : userInfo.token
      },
      params: {
        userId: selectedChat._id
      }
    };

    setLoading(true);

    const { data } =  await axios.get(`/chat/message/`, config);
    setMessage(data);
    setLoading(false);

    socket.emit("Join chat", selectedChat._id);
  } catch(error) {
    toast({
      title: "Error Occured!",
      description: "Failed to load the messages"+error,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    })
  }
 }

 const sendMessage = async(event) => {
  if(event.key === "Enter" && newMessage) {
    socket.emit("stop typing", selectedChat._id);

    try{
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `${userInfo.token}`
        }, 
      };
      setNewMessage("");
      const {data} = await axios.post(
        "/chat/message", {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      socket.emit("new Message", data);
      setMessage([...message, data]);
    } catch(error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the message"+error,
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom",
      })
    }
  }
 };

  useEffect(() => {
    socket = io(`http://localhost:5000`, {
      withCredentials: true,
      transports: ['websocket'],
    });
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  },[selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
        if(!notification.includes(newMessage)) {
          setNotification([newMessage, ...notification]);
          setFetchAgain(!fetchAgain);
        } else {
          setMessage([...message, newMessage]);
        }
      } 
    })
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if(!socketConnected) return;

    if(!typing) {

    } 

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if(timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <> {
      selectedChat ? 
      <>
        <Text 
          fontSize={{ base: "28px", md: "30px"}}
          pb={3}
          px={2}
          w="100%"
          fontFamily="cursive"
          display="flex"
          justifyContent={{base: "space-between"}}
          alignItems="center"
        >
          <IconButton
            display={{ base: "flex", md: "none"}}
            icon={<ArrowBackIcon />}
            onClick={() => setSelectedChat("")}
          />
          {
            message && ( !selectedChat.isGroupChat ? (
              <>
                {getSender(userInfo, selectedChat.users)}
                <ProfileModal 
                  user={getSenderFull(userInfo, selectedChat.users)}
                />
              </>
            ): (
              <>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroupModal 
                fetchMessages={fetchMessages}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
              </>
            ))
          }
        </Text>
        <Box
         display="flex"
         flexDir="column"
         justifyContent="flex-end"
         p={3}
         bg="#E8E8E8"
         w="100%"
         h="100%"
         borderRadius="lg"
         overflowY="hidden"
        >
          {
            loading ? (
            <Spinner 
              size="xl"
              w={20}
              h={20}
              alignSelf="center"
              margin="auto"
            />) : (<div>
              <ScrollableChat messages={message} />
            </div>)
          }

          <FormControl 
           onKeyDown={sendMessage}
           id="first-name"
           isRequired
           mt={3}
          >
            { isTyping ? (
              <div>
                <Lottie options={defaultOptions}
                 width={70}
                 style={{ marginBottom: 15, marginLeft: 0}}
                 />
              </div>
            ): (null)}
            <Input 
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={typingHandler}
            />
          </FormControl>
        </Box>
      </> : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="cursive">
             Click on a user to start chatting
          </Text>
        </Box>
      )
    }
    </>
  )
}

export default SingleChat;