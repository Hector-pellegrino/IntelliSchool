// src/ProtectedRoute.js
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

export default function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext)

  if(currentUser === null) {
    return <Navigate to='/' replace/>
  }
  if (!currentUser.isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}
