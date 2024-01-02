import React, {useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

// can export it
export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({children}) {
  // create a state
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  // appending contact
  function createContact(id, name) {
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
