import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import UserProvider from './context/UserContext'
import ProtectRoute from './ProtectRoute'

import Login from './pages/Login'
import Home from './pages/Home'
import Aluno from './pages/Aluno'
import Admin from './pages/Admin'
import Welcome from './components/Welcome'
import Turmas from './components/adm//turmas/Turmas'
import Alunos from './components/adm/alunos/Alunos'
import Professores from './components/adm/professores/Professores'
import Disciplinas from './components/adm/disciplinas/Disciplinas'
import Professor from './pages/Professor'
import TurmasProfessor from './components/professor/turmas/TurmasProfessor'
import Atividades from './components/aluno/atividades/Atividades'
import Boletim from './components/aluno/boletim/Boletim'
import ChatIA from './components/aluno/ChatIA'

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
            <Route path='boletim' element={<Boletim />} />
            <Route path='ia' element={<ChatIA />} />
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
            <Route path='turmas/*' element={<Turmas />}></Route>
            <Route path='alunos/*' element={<Alunos />}></Route>
            <Route path='professores/*' element={<Professores />}></Route>
            <Route path='disciplinas/*' element={<Disciplinas />}></Route>
          </Route>
          <Route
            path='/professor'
            element={
              <ProtectRoute>
                <Professor />
              </ProtectRoute>
            }
          >
            <Route index element={<Welcome />} />
            <Route path='turmas/*' element={<TurmasProfessor />}></Route>
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}
