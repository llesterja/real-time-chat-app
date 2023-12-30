import React, {useState,useEffect} from 'react';
import axios from 'axios';


const TestPage = () => {
  const [chatMessages,setChatMessages] = useState(null);
  const getMessages = async() =>{
    try{
      const response =await axios.get(`http://localhost:8080/messages`);
      console.log(response.data)
      setChatMessages(response.data);
    } catch (error){
      console.log(error)
    }
  };
  useEffect(()=>  {
    getMessages();
    console.log("var chatMessages:",chatMessages);
  },[]);
  return (
    <div>{chatMessages?"test message 1: " + chatMessages[0].messageBody:"Loading"}</div>
  );
};

export default TestPage