import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

    // Check if conversations is undefined before mapping
    if (!conversations) {
      return null; // or render some loading indicator or default content
    }

  return (
    <ListGroup variant="flush">
    {conversations.map((conversation, index) => (
      <ListGroup.Item 
          key = {index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => r.name).join(',')}
      </ListGroup.Item>
    ))}
  </ListGroup>
  )
}
