import Login from './Login'
import React, {useState} from 'react'
// import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  const [id, setId] = useState();

  const dashboard = (
    <SocketProvider id = {id}>
      <ContactsProvider id = {id}>
        <ConversationsProvider id={id}>
          <Dashboard id={id}/>
        </ConversationsProvider>        
      </ContactsProvider>
    </SocketProvider>

  )

  return (
      id ? dashboard : <Login onIdSubmit={setId}/> 
  );
}

export default App;
