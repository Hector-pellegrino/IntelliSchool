// src/ProtectedRoute.js
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext)

  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}
