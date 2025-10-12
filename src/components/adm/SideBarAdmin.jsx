import '../SideBar/SideBar.css'
import { TiGroup } from 'react-icons/ti'
import { GrUserManager } from 'react-icons/gr'
import { FaBook, FaUser } from 'react-icons/fa'
import LiSideBar from '../SideBar/LiSideBar'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Sidebar() {
  const { currentUser } = useContext(UserContext)
  const links = [
    {
      id: 1,
      url: '/admin/turmas',
      text: 'Turmas',
      icon: <FaBook />,
    },
    {
      id: 2,
      url: '/admin/alunos',
      text: 'Alunos',
      icon: <TiGroup />,
    },
    {
      id: 3,
      url: '/admin',
      text: 'Professores',
      icon: <GrUserManager />,
    },
  ]
  return (
    <div className='sidebar'>
      {/* Perfil */}
      <div className='profile'>
        <FaUser fontSize={'60px'} />
        <h3>{currentUser.nome}</h3>
        <p>Admin</p>
      </div>

      {/* Menu */}
      <ul className='menu'>
        {links.map(({ id, url, text, icon }) => (
          <LiSideBar key={id} url={url} text={text} icon={icon} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
