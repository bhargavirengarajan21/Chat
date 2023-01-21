import React, { useEffect } from 'react';
import {Container, Box, Text, Tabs ,TabList, TabPanels, TabPanel, Tab} from '@chakra-ui/react';
import LoginComponent from '../CommonComponents/Login';
import SignInComponent from '../CommonComponents/SignIn';
import { useConfig } from '../../context/DataProvider';
import '../../styles/login.scss';

const Login = () => {
  const { userInfo } = useConfig();

  if(userInfo?._id)
    window.location.href = '/#/home';
  return(
    <div className='login_container'>
      <Container maxW="xl" centerContent>
        <Box display={"flex"}
        justifyContent="center"
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
        <Text>Login to Eventica!!</Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                  <LoginComponent />
                </TabPanel>
                <TabPanel>
                  <SignInComponent />
                </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default Login;