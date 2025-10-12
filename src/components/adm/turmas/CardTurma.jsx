import { FaEdit } from 'react-icons/fa'
import './CardTurma.css'
import { useNavigate } from 'react-router-dom'

// , alunos, professores, search
export default function CardTurma({ id, ano, serie, search }) {
  const navigate = useNavigate()
  function setarTurma() {
    navigate(`/admin/turmas/${id}`)
  }
  return (
    <div className='conteiner-cardTurma'>
      <div onClick={setarTurma} className='cardTurma'>
        <h2>{serie}</h2>
        <FaEdit />
      </div>
    </div>
  )
}
