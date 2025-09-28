import { createContext, useState } from 'react'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ isLoggedIn: false, email: 'fabropelegrinih@gmail.com', senha:'1234' })
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
