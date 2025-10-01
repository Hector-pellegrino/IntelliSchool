import './Welcome.css'

import { FaSchool } from 'react-icons/fa'
export default function Welcome() {
  return (
    <div className='welcome-card'>
      <FaSchool className='welcome-icon' />
      <h1>Bem-vindo ao Sistema Acadêmico</h1>
      <p>Gerencie matérias, alunos, relatórios e desempenho em um só lugar.</p>
    </div>
  )
}
