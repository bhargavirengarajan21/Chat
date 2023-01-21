import React, { useState } from 'react';
import {Box} from "@chakra-ui/layout";
import ChatBox from "../CommonComponents/ChatComponents/ChatBox";
import MyChats from "../CommonComponents/ChatComponents/MyChats";
import SideDrawer from "../CommonComponents/ChatComponents/SideDrawer";
import {useConfig} from '../../context/DataProvider';

const ChatPage = () => {
  const { userInfo }  =  useConfig();
  const [fetchAgain, setFetchAgain] = useState(false);

  if(!userInfo)
    window.location.href="/#/login";
  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        { <MyChats fetchAgain={fetchAgain} />}
        {(
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} 
      </Box>
    </div>
  );
}
export default ChatPage;