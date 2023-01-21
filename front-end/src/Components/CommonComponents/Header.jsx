import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup, 
  MenuDivider, Link, Button} from '@chakra-ui/react';
import { useConfig } from '../../context/DataProvider';
import '../../styles/header.scss';

const Header = () => {
  const { userInfo } = useConfig();
  console.log("header",userInfo);
  return(
    <div className='header-container'>
      {userInfo ? (
      <>
        <Tabs>
          <TabList>
          <Tab>
            <Link href="/#/home">Eventica</Link>
          </Tab>
          <Tab>B
          <Link href="/#/dashBoard">DashBoard</Link>
          </Tab>
          </TabList>
        </Tabs>
        <Menu>
        <MenuButton colorScheme='pink'>
          <img  className="header-image" src={userInfo.pic}></img>
        </MenuButton>
        <MenuList>
          <MenuGroup title='Profile'>
            <MenuItem>
              <Link href="/#/home">My Account - {userInfo.name}</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/#/Chat">Chat</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/#/logOut">LogOut</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/#/event">Add Event</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/#/Volunteer">Volunteer</Link>
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          {/* <MenuGroup title='Help'>
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup> */}
        </MenuList>
        </Menu>
      </> ): 
      <div className='logout-container'>
        <Link href="/#/home">Eventica!!</Link>
        <Button onClick={()=>window.location.href="/#/login"}>Sign In</Button>
      </div>
      }
    </div>
  );
}

export default Header;