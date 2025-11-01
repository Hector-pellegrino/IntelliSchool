import '../SideBar/SideBar.css'
import { FaBook, FaUser } from 'react-icons/fa'
import { FaRobot } from 'react-icons/fa6'
import LiSideBar from '../SideBar/LiSideBar'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)
  const links = [
    {
      id: 1,
      url: '/professor/turmas',
      text: 'Turmas',
      icon: <FaBook />,
    },
    {
      id: 2,
      url: '/professor/ia',
      text: 'Inteligencia Artificial',
      icon: <FaRobot />,
    },
  ]

  function logout() {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('message')
    navigate('/')
  }
  return (
    <div className='sidebar'>
      {/* Perfil */}
      <div className='profile'>
        <FaUser fontSize={'60px'} />
        <h3>{currentUser.nome}</h3>
        <p>Professor</p>
        <button className='logout' onClick={logout}>
          Sair
        </button>
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
