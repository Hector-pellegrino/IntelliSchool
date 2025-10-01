import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext, useEffect } from 'react'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (!currentUser) return

    if (currentUser.tipoUsuario === 'aluno') {
      navigate('/aluno')
    } else if (currentUser.tipoUsuario === 'professor') {
      navigate('/professor')
    } else if (currentUser.tipoUsuario === 'admin') {
      navigate('/admin')
    }
  }, [currentUser, navigate])
  return <div className='app'>Carregando...</div>
}
