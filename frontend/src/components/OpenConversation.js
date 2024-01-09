import React, { useState, useCallback , useRef, useEffect} from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useConversations } from '../contexts/ConversationsProvider';


export default function OpenConversation() {
    const { sendMessage, selectedConversation } = useConversations()
    const [text, setText] = useState('')

    const setRef = useCallback(node => {
        if (node) {
          node.scrollIntoView({ smooth: true })
        }
      }, [])

    function handleSubmit(e) {
        e.preventDefault()
        /**No selected conversation */
        /** How to check if a conversation is selected */
   
        if (!selectedConversation || !selectedConversation.recipients) {
            console.error('Selected conversation or recipients is undefined');
            return;
          }

        sendMessage(
          selectedConversation.recipients.map(r => r.id),
          text
        )
        setText('')
      }

  
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    
                    {/**Selected Conversation is null? */}

                    {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.messageBody}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <Button type="submit">Send</Button>
                        {/* <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append> */}
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
