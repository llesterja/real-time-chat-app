import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext()

// can export it
export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({children}) {
  // create a state
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  
  // appending contact
  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, {recipients, messages:[]} ]
    })
  }



  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    return { ...conversation, recipients}
  })

  const value = {
    conversations: formattedConversations,
    createConversation
  }



  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
