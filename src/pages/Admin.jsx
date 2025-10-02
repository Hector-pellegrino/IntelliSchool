import './Admin.css'
import { Outlet } from 'react-router-dom'
import SideBarAdmin from '../components/adm/SideBarAdmin'

export default function Admin() {
  return (
    <div className='app'>
      <SideBarAdmin />
      <section className='content'>
        {' '}
        <Outlet />{' '}
      </section>
    </div>
  )
}
