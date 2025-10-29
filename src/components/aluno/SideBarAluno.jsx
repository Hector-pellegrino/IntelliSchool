import './SideBarAluno.css'
import { FaBook, FaChartBar, FaUserGraduate, FaFileAlt, FaUser, FaTasks } from 'react-icons/fa'
import LiSideBar from '../SideBar/LiSideBar'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const links = [
    {
      id: 1,
      url: '/aluno/atividades',
      text: 'Atividades',
      icon: <FaTasks />,
    },
    {
      id: 2,
      url: '/aluno/boletim',
      text: 'Boletim',
      icon: <FaFileAlt />,
    },
    {
      id: 3,
      url: '/aluno',
      text: 'Inteligencia Artificial',
      icon: <FaBook />,
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
        <p>Universidade XPTO</p>
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
