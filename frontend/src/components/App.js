import Login from './Login'
import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
//import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id}/>
      </ConversationsProvider>
        
    </ContactsProvider>
  )

  return (
      id ? dashboard : <Login onIdSubmit={setId}/> 
  );
}

export default App;
