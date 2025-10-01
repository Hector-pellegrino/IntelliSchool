import './SideBarAluno.css'
import { FaBook, FaChartBar, FaUserGraduate, FaFileAlt, FaUser, FaTasks } from 'react-icons/fa'
import LiSideBar from '../SideBar/LiSideBar'

function Sidebar() {
  const links = [
    {
      id: 1,
      url: '/',
      text: 'Relatórios',
      icon: <FaFileAlt />,
    },
    {
      id: 2,
      url: '/',
      text: 'Matérias',
      icon: <FaBook />,
    },
    {
      id: 3,
      url: '/aluno/atividades',
      text: 'Atividades',
      icon: <FaTasks />,
    },
    {
      id: 4,
      url: '/',
      text: 'Desempenho',
      icon: <FaChartBar />,
    },
  ]
  return (
    <div className='sidebar'>
      {/* Perfil */}
      <div className='profile'>
        <FaUser fontSize={'60px'} />
        <h3>João da Silva</h3>
        <p>Universidade XPTO</p>
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
