import React, {useContext, useState, useEffect, useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import axios from 'axios';

const ConversationsContext = React.createContext()

// can export it
export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({id, children}) {
  // create a state
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket();
  
  // appending contact
  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, {recipients, messages:[]} ]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, messageBody, sender }) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, messageBody }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations])

  const getConversations = async () => {
    try{
      const response = await Promise.all([
        axios.get(`http://localhost:8080/messages/userId/v2/${id}`),
        axios.get(`http://localhost:8080/chatrooms/v2/${id}`)        
      ])
      const messages=response[0].data;
      const chatrooms =response[1].data;
      console.log("chatrooms",chatrooms)
      let conversationList = [{
        chatroomName:[],
        recipients:[],
        messages:[]
      }];

      chatrooms.map((chatroom,index)=>{
        if (index >= conversationList.length){
          conversationList[index] = {
            chatroomName:[],
            recipients:[],
            messages:[]
          }
        }
        if (chatroom.chatroom.isGroup){
          conversationList[index].chatroomName = {id:chatroom.chatroom.id,name:chatroom.chatroom.chatroomName};
        } else {
          const extractedId = chatroom.chatroom.users.filter(user => user.id !== chatroom.userId);
          const contact = contacts.find(contact => {
            return contact.id === extractedId[0].id
          })
          conversationList[index].chatroomName = {id:chatroom.chatroom.id,name:contact.name};
        }

        chatroom.chatroom.users.map((user)=>{
          return conversationList[index].recipients.push(user.id)
        });
        let room = messages.find(message => message.chatroom.id === chatroom.chatroom.id);
        conversationList[index].messages = room.chatroom.messages.map((message)=>{
          return {"sender":message.userId,"messageBody":message.messageBody}
        });
      })
      setConversations(conversationList);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getConversations();
    if (socket == null) return;

    socket.on('receive-message', addMessageToConversation);

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, messageBody) {
    socket.emit('send-message', { recipients, messageBody })

    addMessageToConversation({ recipients, messageBody, sender: id })
  }


  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })


    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name =  (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return {...message, senderName: name, fromMe}
    })

    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected}
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }


  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )  
}

// outside the component
function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}