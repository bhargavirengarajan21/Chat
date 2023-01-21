import React from 'react';
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import { Box, Text } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "./ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import UserListItem from "../UserListItem";
import { useConfig } from '../../../context/DataProvider';


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    userInfo,
    notification,
    setNotification,
    chats,
    setChats,
  } = useConfig();

  const toast = useToast();
  console.log(userInfo);
  const {isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async() => {
    if(!search) {
      toast:({
        title: "Please Enter something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: userInfo.token,
        }
      };

      const {data} = await axios.get(`/user/searchUser?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch(error) {
      toast({
        tilte: "Error Occured !",
        description: "Failed to load Search"+error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: userInfo.token,
        }
      }

      const {data}  = await axios.post('/chat/userChat', {userId}, config);
      console.log(data);
      if(chats && !chats.find((c) => c._id === data._id)) 
        setChats([data, ...chats]);
      console.log(data);
      setSelectedChat(data);
      setLoading(false);
      onClose();
    } catch(error) {
      toast({
        tilte: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  };

  return(
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i></i>
            <Text>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="cursive">Talk A Tive</Text>
      </Box>
      <div>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody>
                <Box display="flex" pb={2}>
                  <Input 
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>
                { loading ? (< ChatLoading/>) : ( searchResult?.map((user) => 
                  <UserListItem 
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
                {loadingChat && <Spinner ml="auto" display="flex" />}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
      </div>
    </div>
  )
}

export default SideDrawer;