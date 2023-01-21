import React, {createContext, useState , useContext, useEffect } from 'react';
import  axios from 'axios';
import { getCookie } from '../helper/loginHelper';


const fetchData = async() => {
  try {
    const uid = getCookie('uid');
    if(uid) {
      const data = await axios.get('/user/session',{params: {uid}});
      return data;
    }
  } catch {
    console.log("error fetching data");
  }
}

const deleteData = async(data) => {
  try {
    console.log("data", data);
    await axios.post("/user/session", {key: `data_${data._id}`, value: ""});
  } catch(error) {
    console.log("error delete data",error);
  }
}


const DataContext = createContext({});

const DataProvider = ({location,children}) => {
  const [userInfo ,setUserInfo] = useState({});
  const [ selectedChat, setSelectedChat ] = useState();
  const [ eventInfo, setEventInfo ] = useState();
  const [ notification, setNotification ] = useState();
  const [ chats, setChats ] = useState();

  useEffect(() => {
    fetchData().then(response => {
      setUserInfo(response?.data?.userInfo);
    }).catch((error) => {
      console.log(error);
    });
 },[location]);
  console.log(userInfo);
  return (
    <DataContext.Provider value={{
      userInfo,
      setUserData: (data) => {
        try{ 
          console.log(data);
          if(data)
            setUserInfo({userInfo: { ... data} });
          else {
            deleteData(userInfo);
            setUserInfo({userInfo: undefined});
          }
        }catch(error) {
          console.log(error);
        }
      
      },
      eventInfo,
      selectedChat,
      setEventInfo,
      notification,
      setNotification,
      chats,
      setChats,
      setSelectedChat
    }}>
     {children}
    </DataContext.Provider>
  )
}

export const useConfig = () => useContext(DataContext);

export default DataProvider;