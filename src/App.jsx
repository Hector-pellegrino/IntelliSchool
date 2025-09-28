import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import UserProvider from './context/UserContext'
import ProtectRoute from './ProtectRoute'

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route
            path='/home'
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  )
}
