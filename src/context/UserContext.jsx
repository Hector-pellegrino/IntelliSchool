import { createContext, useState } from 'react'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([
    { isLoggedIn: false, email: 'fabropelegrinih@gmail.com', senha: '1234', tipoUsuario: 'aluno' },
    {
      isLoggedIn: false,
      email: 'hectorpellegrino777@gmail.com',
      senha: '1234',
      tipoUsuario: 'admin',
    },
  ])
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user')
    return savedUser
      ? JSON.parse(savedUser)
      : null
  })
  return <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers }}>{children}</UserContext.Provider>
}
