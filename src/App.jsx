import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import Welcome from './components/Welcome'
import UserProvider from './context/UserContext'
import ProtectRoute from './ProtectRoute'
import Atividades from './components/aluno/Atividades'
import Aluno from './pages/Aluno'
import Admin from './pages/Admin'
import Turmas from './components/adm/Turmas'
import EditTurma from './components/adm/EditTurma'

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
          <Route
            path='/aluno'
            element={
              <ProtectRoute>
                <Aluno child={<Welcome />} />
              </ProtectRoute>
            }
          >
            <Route index element={<Welcome />} />
            <Route path='atividades' element={<Atividades />} />
          </Route>
          <Route
            path='/admin'
            element={
              <ProtectRoute>
                <Admin />
              </ProtectRoute>
            }
          >
            <Route index element={<Welcome />} />
            <Route path='turmas' element={<Turmas />}></Route>
            <Route path='/admin/turmas/:nome' element={<EditTurma/>} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}
