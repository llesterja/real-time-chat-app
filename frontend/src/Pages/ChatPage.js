import React, {useEffect} from 'react';
import io from 'socket.io-client';

const ChatPage = () => {
  useEffect(()=>{
    const newSocket = io('http://localhost:8080')
  })
  return (
    <div>lol</div>
  );
};

export default ChatPage