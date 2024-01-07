import React, {useContext,useEffect,useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios';

const ContactsContext = React.createContext()

// can export it
export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({id, children}) {
  // create a state
  const [contacts, setContacts] = useState([]);
  const getFriends = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/users/friends/${id}`)
      console.log(response.data)
      const friends=response.data;
      console.log("friends",friends) 
      let contactList = [];
      contactList = friends.map((friend)=>{
        return  {id:friend.friendId,name:friend.friendName}
      })
      console.log("contactlist",contactList)
      setContacts(contactList)
      console.log("contacts",contacts)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getFriends();
  },[])

  // appending contact
  async function createContact (friendId, name) {
    try{
      const response = await axios.post(`http://localhost:8080/users/friends`,{
        friendId:friendId,
        friendName:name,
        userId: id
      })
      console.log(response.data)
    }catch(err){
      console.log(err);
    }
    setContacts(prevContacts => {
      return [...prevContacts, {id, name} ]
    })
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  )
}
