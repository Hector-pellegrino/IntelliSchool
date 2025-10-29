import './Professor.css'
import { Outlet } from 'react-router-dom'
import SideBarProfessor from '../components/professor/SideBarProfessor'

export default function Professor() {
  return (
    <div className='app'>
      <SideBarProfessor />
      <section className='content'>
        {' '}
        <Outlet />{' '}
      </section>
    </div>
  )
}
