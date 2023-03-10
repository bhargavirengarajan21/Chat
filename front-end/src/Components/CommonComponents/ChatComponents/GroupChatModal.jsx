import React, {useState} from "react";
import UserBadgeItem from "../UserBadgeItem";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box
} from "@chakra-ui/react";
import UserListItem from "../UserListItem";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { useConfig } from "../../../context/DataProvider";

const GroupChatModal = ({children}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult ] = useState([]);
  const [loading, setLoading ] = useState(false);
  const toast = useToast();
  
  const {userInfo, chats, setChats } = useConfig();
  const handleGroup = (userToAdd) => {
    if(selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async(query) => {
    setSearch(query);
    if(!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: userInfo.token,
        }
      }

      const {data} = await axios.get(`/user/searchUser?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    }catch(error) {
      toast({
        title:"Error Occured !",
        description: "Failed to Load the search Results"+error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async() => {
    if(!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: userInfo.token
        }
      }

      const {data} =  await axios.post(`/chat/group`, {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    } catch(error) {
      toast({
        title: "Failed to create the Chat!",
        description: "Unable to submit"+error,
        status: error,
        duration: 50000,
        isClosable: true,
        position: "bottom"
      });
    }
  }

  return (
    <>
      <span onClick={(onOpen)}>{children}</span>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="cursive"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            display="flex" 
            flexDir="column"
            alignItems="center"
          >
            <FormControl>
              <Input 
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input 
                placeholder="Add users eg: John Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box>
              {selectedUsers.map((u) => (
                <UserBadgeItem 
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {
              loading ? (< ChatLoading />) : (
              searchResult?.slice(0,4).map((user) => (
                  <UserListItem 
                    key={userInfo._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;