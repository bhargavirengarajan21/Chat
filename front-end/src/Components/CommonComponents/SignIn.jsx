import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useToast, Tooltip } from "@chakra-ui/react";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picLoading, setPicLoading] = useState();

  const checkPassword = (input) => { 
    console.log(input === password, confirmPassword);
    setConfirmPassword(input === password);
  }
  const submitHandler = async () => {
    setPicLoading(true);
    if(!name || !email || !password ) {
      toast({
        title: "Please Fill all the Fields",
        status: "Warning",
        duaration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    try {
      const config = {
        header: {
          "content-type": "application/json",
        },
      };

      const {data} = await axios.post(
        "/user/create", 
        {
          name,email,password,pic
        }, 
        config
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }catch(e) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  } 

  const getBase64 = (file) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
    });
  };

  const convertImage = async(pic) => {
    console.log(pic);
    setPicLoading(true);
    if(pic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    } else {
      try {
        const fileInfo = await getBase64(pic);
        console.log(fileInfo);
        setPic(fileInfo);
        setPicLoading(false);
      } catch(e) {
        console.log(e.message);
        setPicLoading(false);
      }
    }
  }

  return(
    <VStack spacing="5px">
      <FormControl id="firstName" isRequired>
         <FormLabel>First Name</FormLabel>
         <Input 
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
        type="email"
        placeholder="Enter Email Address"
        onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
        type= "password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        isRequired
        />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Tooltip display={confirmPassword ? "none":"block"} label="Error Password Matching">
          <InputGroup size="md">
            <Input
            type={show ? "text" : "password"}
            placeholder = "Confirm Password"
            errorBorderColor="Red"
            isInvalid = {confirmPassword != undefined && !confirmPassword}
            onBlur={(e) => checkPassword(e.target.value)}
            isRequired
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Tooltip>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
         type="file"
         p="1.5"
         accept="image/*"
         onChange={(e) => convertImage(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={picLoading}
      >Sign Up</Button>
    </VStack>
  );
}

export default SignIn;