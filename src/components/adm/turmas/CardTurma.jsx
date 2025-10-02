import { FaEdit } from 'react-icons/fa'
import './CardTurma.css'
import { useNavigate } from 'react-router-dom'

export default function CardTurma({ id, nome, materias, alunos, professores, search }) {
  const navigate = useNavigate()
  function setarTurma() {
    search('')
    sessionStorage.setItem(
      'turmaSelecionada',
      JSON.stringify({ id, nome, materias, alunos, professores })
    )

    navigate(`/admin/turmas/${id}`)
  }
  return (
    <article onClick={setarTurma} className='cardTurma'>
      <h2>{nome}</h2>
      <FaEdit />
    </article>
  )
}
