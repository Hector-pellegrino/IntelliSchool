import SideBarAluno from '../components/aluno/SideBarAluno'
import { Outlet, Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import './Aluno.css'

import Welcome from '../components/Welcome'

export default function Home({ child }) {
  const { user } = useContext(UserContext)
  return (
    <div className='app'>
      <SideBarAluno />
      <section className='content'> <Outlet/> </section>
    </div>
  )
}
