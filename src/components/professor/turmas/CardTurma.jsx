import { FaEdit } from 'react-icons/fa'
import './CardTurma.css'
import { useNavigate } from 'react-router-dom'

export default function CardTurma({ handleTurma, id, serie }) {
  const navigate = useNavigate()
  function navigateTurma() {
    handleTurma(serie)
    navigate(`/professor/turmas/turma/${id}`)
  }
  return (
    <div className='conteiner-cardTurma'>
      <div onClick={navigateTurma} className='cardTurma'>
        <h2>{serie}</h2>
        <FaEdit />
      </div>
    </div>
  )
}
