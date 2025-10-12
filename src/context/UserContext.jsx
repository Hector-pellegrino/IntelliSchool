import { createContext, useState } from 'react'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user')
    return savedUser
      ? JSON.parse(savedUser)
      : null
  })
  const [currentMessage, setCurrentMessage] = useState(() => {
    const savedMessage = sessionStorage.getItem('message')
    return savedMessage
      ? JSON.parse(savedMessage)
      : null
  })
  return <UserContext.Provider value={{ currentUser, setCurrentUser, currentMessage, setCurrentMessage}}>{children}</UserContext.Provider>
}
