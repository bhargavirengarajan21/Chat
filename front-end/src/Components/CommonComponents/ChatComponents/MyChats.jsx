import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from '@chakra-ui/react';
import { getSender } from "../../../helper/chatHelper";
import ChatLoading from './ChatLoading';
import GroupChatModal from "../ChatComponents/GroupChatModal";
import { Button } from '@chakra-ui/react';
import {useConfig} from "../../../context/DataProvider";
import { AddIcon } from '@chakra-ui/icons';

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, userInfo, chats, setChats } = useConfig();
  console.log("chats",chats);
  const toast = useToast();

  const fetchChats = async() => {
    try {
      if(Object.keys(userInfo).length > 0) {
        const config = {
          headers: {
            authorization : userInfo.token,
          },
          params: {
            userId: userInfo._id
          }
        };
        const { data } = await axios.get("/chat", config);
        console.log("chars",data);
        setChats(data);
      }
    }catch(error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load chat"+error,
        status: "error",
        duration: 5000,
        isClosable: true,

      });
    }
  }

  useEffect(() => {
    setLoggedUser(userInfo);
    fetchChats();
  },[userInfo]);

  return (
    <div>
      <Box
        display={{base: selectedChat ? "none": "flex" , md: "flex"}}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%"}}
        borderRadius="lg"
        borderWidth="1px"
      >
          <Box
            pb={3}
            px={3}
            fontSize={{base: "28px", md: "30px"}}
            fontFamily="cursive"
            display="flex"
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            My Chats
            <GroupChatModal>
              <Button
                display="flex"
                fontSize={{base: "17px", md: "10px", lg: "17px"}}
                rightIcon={<AddIcon />}
              >
                New Group Chat
              </Button>
            </GroupChatModal>
          </Box>
          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {
              chats ? 
              <Stack overflowY="scroll">
                {
                  chats.map((chat) => (
                    <Box
                      onClick={()=>setSelectedChat(chat)}
                      cursor="pointer"
                      bg={selectedChat === chat ? "#38B2AC": '#E8E8E8'}
                      color={selectedChat === chat ? "white": "black"}
                      px={3}
                      py={2}
                      borderRadius="lg"
                      key={chat._id}
                    >
                      <Text>
                        {!chat.isGroup ? getSender(loggedUser, chat.users) : chat.chatName } 
                      </Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          <b>{chat.latestMessage.content.length > 50 ? chat.latestMessage.content.substring(0,51) + "..." : chat.latestMessage.content}</b>
                        </Text>
                      )}
                    </Box>
                  ))
                }
              </Stack>:
              (<ChatLoading />)
            }
          </Box>
      </Box>
    </div>
  );
}

export default MyChats;